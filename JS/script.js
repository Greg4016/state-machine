let states = []
let links = []
let nextState = 0
let selectedState = undefined

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
    })
});



// Click event handling
let linkStart = undefined
let linkEnd = undefined

document.body.addEventListener("click", ev => {

    // State
    if(activeTool == "state") {
        states.push(new State(ev.x, ev.y, nextState))
        nextState++
    // Move   
    } else if(activeTool == "move") {
        let targetIsState = ev.target.classList.value.includes("state")

        states.forEach(s => {
            s.setSelected(false)
            if(targetIsState && s.dom == ev.target) {
                s.setSelected(true)
                selectedState = s
            }
        })
    // Link
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
                if(!links.find(l => l.startState == linkStart && l.endState == linkEnd)) {
                    // Create link
                    links.push(new Link(linkStart, linkEnd))

                    // Add link to states
                    linkStart.linkStarts.push(links[links.length-1])
                    linkEnd.linkEnds.push(links[links.length-1])
                }
                // Deselect states
                linkStart.dom.classList.remove("highlight")
                linkStart = undefined
                linkEnd = undefined
            }
        }
    }
})



// Drag handling
let offset = undefined

// Drag start
document.body.addEventListener("mousedown", ev => {
    ev.preventDefault()
    if(activeTool =="move") {
        let targetIsSelected = ev.target.classList.value.includes("state") && ev.target.classList.value.includes("selected")

        // Store cursor offset from selected state mid point
        if(targetIsSelected) {
            offset = {"x" : selectedState.getPos().x - ev.x,
                      "y" : selectedState.getPos().y - ev.y}
        }
    }
})

// Drag mid
document.body.addEventListener("mousemove", ev => {
    if(activeTool == "move") {

        // If offset has been set, move state
        if(offset) {
            selectedState.setPos(ev.x + offset.x, ev.y + offset.y)
        }
    }
})

// Drag end
document.body.addEventListener("mouseup", ev => {
    // Unset offset
    offset = undefined
})