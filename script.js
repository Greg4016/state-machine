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
let linkState1 = undefined
let linkState2 = undefined

document.body.addEventListener("click", ev => {

    // New state creation
    if(activeTool == "state") {
        states.push(new State(ev.x, ev.y, nextState))
        nextState++
    // Element moving    
    } else if(activeTool == "move") {
        let targetIsState = ev.target.classList.value.includes("state")

        states.forEach(s => {
            s.setSelected(false)
            if(targetIsState && s.dom == ev.target) {
                s.setSelected(true)
                selectedState = s
            }
        })

    } else if(activeTool == "link") {
        let targetIsState = ev.target.classList.value.includes("state")

        if(targetIsState) {
            if(!linkState1) linkState1 = states.find(s => s.dom == ev.target) 
            else if(!linkState2) {
                linkState2 = states.find(s => s.dom == ev.target)
                if(!links.find(l => l.startState == linkState1 && l.endState == linkState2)) {
                    links.push(new Link(linkState1, linkState2))
                }
                linkState1 = undefined
                linkState2 = undefined
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

        if(targetIsSelected) {
            offset = {"x" : selectedState.getPos().x - ev.x,
                      "y" : selectedState.getPos().y - ev.y}
        }
    }
})

// Drag mid
document.body.addEventListener("mousemove", ev => {
    if(activeTool == "move") {
        if(offset) {
            selectedState.setPos(ev.x + offset.x, ev.y + offset.y)
        }
    }
})

// Drag end
document.body.addEventListener("mouseup", ev => {
    offset = undefined
})