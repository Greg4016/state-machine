let states = []
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

        states.forEach(s => {
            s.setSelected(false)
        })
        selectedState = undefined
    })
});


document.body.addEventListener("click", ev => {

    if(activeTool == "state") {
        states.push(new State(ev.x, ev.y, nextState))
        nextState++
    } else if(activeTool == "move") {
        let targetIsState = ev.target.classList.value.includes("state")

        states.forEach(s => {
            s.setSelected(false)
            if(targetIsState && s.dom == ev.target) s.setSelected(true)
        })

    }
})

let offset = {"x" : 0, "y" : 0}

document.body.addEventListener("mousedown", ev => {
    ev.preventDefault()
    if(activeTool =="move") {
        let targetIsSelected = ev.target.classList.value.includes("state") && ev.target.classList.value.includes("selected")

        if(targetIsSelected) {
            selectedState = states.find(s => s.dom == ev.target)
            offset.x = selectedState.getPos().x - ev.x
            offset.y = selectedState.getPos().y - ev.y
        }
    }
})

document.body.addEventListener("mousemove", ev => {
    if(activeTool == "move") {
        if(selectedState) {
            selectedState.setPos(ev.x + offset.x, ev.y + offset.y)
        }
    }
})

document.body.addEventListener("mouseup", ev => {
    selectedState = undefined
})