let inspectorPanel = document.querySelector("#inspect-panel")
let inspectedNameDOM = document.querySelector("#inspected-name span")
let inspectedType = undefined
let inspectedName = undefined

function hideInspector() {
    inspectorPanel.style.display = 'none'
    inspectedType = undefined
}

function setInspector(elem) {
    if(elem instanceof State) {
        inspectorPanel.style.display = 'block'
        inspectedType = 'state'
        inspectedName = `State - ${elem.name}`
        inspectedNameDOM.innerHTML = inspectedName  

    }else if(elem instanceof Link) {
        inspectorPanel.style.display = 'block'
        inspectedType = 'link'
        inspectedName = `Link - ${elem.startState.name}->${elem.endState.name}`
        inspectedNameDOM.innerHTML = inspectedName 
    }
}