class Link {

    startState
    endState
    
    controlPoint1 = undefined
    controlPoint2 = undefined

    dom
    hitbox

    #selected = false

    constructor(state1, state2) {
        this.startState = state1
        this.endState = state2

        // Create visible line element
        linkSvg.insertAdjacentHTML("beforeend", `
            <line x1="${this.startState.getPos().x}" y1="${this.startState.getPos().y}" x2="${this.endState.getPos().x}" y2="${this.endState.getPos().y}" marker-end="url(#arrow)" class="link"/>
        `)
        this.dom = linkSvg.lastElementChild

        // Create hitbox element
        linkSvg.insertAdjacentHTML("beforeend", `
            <line x1="${this.startState.getPos().x}" y1="${this.startState.getPos().y}" x2="${this.endState.getPos().x}" y2="${this.endState.getPos().y}" class="hitbox"/>
        `)
        this.hitbox = linkSvg.lastElementChild
    }

    updatePos() {
        // Set visible line position
        this.dom.setAttribute("x1", this.startState.getPos().x)
        this.dom.setAttribute("y1", this.startState.getPos().y)
        this.dom.setAttribute("x2", this.endState.getPos().x)
        this.dom.setAttribute("y2", this.endState.getPos().y)

        // Set hitbox position
        this.hitbox.setAttribute("x1", this.startState.getPos().x)
        this.hitbox.setAttribute("y1", this.startState.getPos().y)
        this.hitbox.setAttribute("x2", this.endState.getPos().x)
        this.hitbox.setAttribute("y2", this.endState.getPos().y)
    }

    setSelected(b) {

        // Changes 'selected' field value if the value is different to param
        if(b && !this.selected) {
            this.selected = true
            this.hitbox.classList.add("selected")
        } else if(!b && this.selected) {
            this.selected = false
            this.hitbox.classList.remove("selected")
        }

    }
}