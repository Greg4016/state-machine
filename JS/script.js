let states = []
let links = []
let nextState = 0
let selectedState = undefined
let selectedLink = undefined



//------------------------------------------------------------------------------//
// Tool selection
document.querySelectorAll(".tool").forEach(tool => {
    tool.addEventListener("click", ev => {
        ev.stopPropagation()

        //Unset CSS active from previous tool, set to new active tool
        document.querySelector(".tool.active").classList.remove("active")
        ev.target.classList.add("active")

        // Set active tool var, set body tool CSS
        activeTool = tool.id
        document.body.classList = "tool-" + activeTool

        // Deselect states
        states.forEach(s => {
            s.setSelected(false)
        })
        selectedState = undefined

        // Deselect links
        links.forEach(l => {
            l.setSelected(false)
        })
    })
});



//------------------------------------------------------------------------------//
// Click event handling
let linkStart = undefined
let linkEnd = undefined

document.body.addEventListener("click", ev => {

    // State tool - create new state
    if(activeTool == "state") {
        states.push(new State(ev.x, ev.y, `S<sub>${nextState}</sub>`))
        nextState++

    // Move tool - select and move elements
    } else if(activeTool == "move") {
        InspectorPanel.hideInspector()

        let targetIsState = ev.target.classList.value.includes("state")
        let targetIsLink = ev.target.classList.value.includes("hitbox")
        let targetIsCpoint = ev.target.classList.value.includes("cpoint")

        // Select and deselect states
        states.forEach(s => {
            s.setSelected(false)

            if(targetIsState && s.dom == ev.target) {
                s.setSelected(true)
                selectedState = s

                InspectorPanel.inspectState(s)
            }
        })

        // Select and deselect links
        links.forEach(l => {
            l.setSelected(false)

            if(targetIsLink && l.getHitbox() == ev.target) {
                l.setSelected(true)
                selectedLink = l

                InspectorPanel.inspectLink(l)
            } else if(targetIsCpoint) {
                selectedLink.setSelected(true)

                InspectorPanel.inspectLink(selectedLink)
            }
        })

    // Link tool - create new link
    } else if(activeTool == "link") {
        let targetIsState = ev.target.classList.value.includes("state")

        if(targetIsState) {
            // Select link start state
            if(!linkStart) {
                linkStart = states.find(s => s.dom == ev.target)
                linkStart.dom.classList.add("highlight")
            }
            else if(!linkEnd) {
                // Select link end state
                linkEnd = states.find(s => s.dom == ev.target)

                // Check for matching existing link
                if(!links.find(l => l.getStartState() == linkStart && l.getEndState() == linkEnd)) {
                    // Create link
                    links.push(new Link(linkStart, linkEnd))
                }
                // Deselect states
                linkStart.dom.classList.remove("highlight")
                linkStart = undefined
                linkEnd = undefined
            }
        }
    }
})



//------------------------------------------------------------------------------//
// Drag handling
let offset = undefined

// Drag start
document.body.addEventListener("mousedown", ev => {
    ev.preventDefault()
    if(activeTool =="move") {
        let targetIsSelected = ev.target.classList.value.includes("state") && ev.target.classList.value.includes("selected")
        let targetIsCpoint1  = ev.target.classList.value.includes("cpoint1")
        let targetIsCpoint2  = ev.target.classList.value.includes("cpoint2")

        // Store cursor offset from selected element mid point
        if(targetIsSelected) {
            offset = {elem : "state",
                      x : selectedState.getPos().x - ev.x,
                      y : selectedState.getPos().y - ev.y}
        } else if(targetIsCpoint1) {
            offset = {elem : "cpoint1",
                x : selectedLink.getCpoint1().x - ev.x,
                y : selectedLink.getCpoint1().y - ev.y}
        } else if(targetIsCpoint2) {
            offset = {elem : "cpoint2",
                x : selectedLink.getCpoint2().x - ev.x,
                y : selectedLink.getCpoint2().y - ev.y}
        }
    }
})

// Drag mid
document.body.addEventListener("mousemove", ev => {
    if(activeTool == "move") {

        // If offset has been set, move state
        if(offset) {
            switch(offset.elem) {
                case 'state':
                    selectedState.setPos(ev.x + offset.x, ev.y + offset.y)
                    break
                case 'cpoint1':
                    selectedLink.setCpoint1Pos(ev.x + offset.x, ev.y + offset.y)
                    break
                case 'cpoint2':
                    selectedLink.setCpoint2Pos(ev.x + offset.x, ev.y + offset.y)
                    break
            }
        }
    }
})

// Drag end
document.body.addEventListener("mouseup", ev => {
    // Unset offset
    offset = undefined
})



//------------------------------------------------------------------------------//
// Setup save and load


// Save
function saveToJSON() {
    let data = {
        states : [],
        links : []
    }

    // Save states
    states.forEach(s => {
        data.states.push({
            x : s.getPos().x,
            y : s.getPos().y,
            name : s.name
        })
    })

    // Save links
    links.forEach(l => {
        data.links.push({
            startInd : states.indexOf(l.getStartState()),
            endInd : states.indexOf(l.getEndState()),
            mode : l.getMode()
        })
    })

    return data
}


// Load
function loadFromJSON(data) {
    // Set variables to default
    states = []
    links = []
    nextState = 0
    selectedState = undefined
    selectedLink = undefined

    // Remove existing links and states
    let svgchildren = [...linkSvg.children]
    svgchildren.forEach((el, i) => { if(i > 0) el.remove() })

    statesDiv.innerHTML = ''


    // Load states
    data.states.forEach(s => {
        states.push(new State(s.x, s.y, s.name))
        nextState++
    })

    // Load links
    data.links.forEach(l => {
        links.push(new Link( states[l.startInd], states[l.endInd] ))
        if(l.mode == 'curve') links[links.length-1].changeMode()
    })
}



//------------------------------------------------------------------------------//
// Test setup
testBuild1 = {
    states : [
        {
            x : 200,
            y : 200,
            name : 'S<sub>0</sub>'
        },
        {
            x : 300,
            y : 400,
            name : 'S<sub>1</sub>'
        },
        {
            x : 400,
            y : 300,
            name : 'S<sub>2</sub>'
        }
    ],
    links : [
        {
            startInd : 0,
            endInd : 1,
            mode : 'curve'
        },
        {
            startInd : 1,
            endInd : 2
        }
    ]
}

testBuild2 = {
    states : [
        {
            x : 600,
            y : 400,
            name : 'S<sub>0</sub>'
        },
        {
            x : 300,
            y : 400,
            name : 'S<sub>1</sub>'
        },
        {
            x : 400,
            y : 300,
            name : 'S<sub>2</sub>'
        }
    ],
    links : [
        {
            startInd : 0,
            endInd : 1,
            mode : 'curve'
        },
        {
            startInd : 1,
            endInd : 2
        }
    ]
}

testBuild3 = {
    "states": [
        {
            "x": 600,
            "y": 400,
            "name": "S<sub>0</sub>"
        },
        {
            "x": 300,
            "y": 400,
            "name": "S<sub>1</sub>"
        },
        {
            "x": 443,
            "y": 563,
            "name": "S<sub>2</sub>"
        }
    ],
    "links": [
        {
            "startInd": 0,
            "endInd": 1,
            "mode": "curve"
        },
        {
            "startInd": 1,
            "endInd": 2,
            "mode": "curve"
        }
    ]
}


loadFromJSON(testBuild3)