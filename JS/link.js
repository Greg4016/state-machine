class Link {

    startState
    endState
    
    controlPoint1 = undefined
    controlPoint2 = undefined

    dom

    constructor(state1, state2) {
        this.startState = state1
        this.endState = state2

        linkSvg.insertAdjacentHTML("beforeend", `
            <line x1="${this.startState.getPos().x}" y1="${this.startState.getPos().y}" x2="${this.endState.getPos().x}" y2="${this.endState.getPos().y}" stroke="black"/>
        `)
        this.dom = linkSvg.lastElementChild

    }

    updatePos() {
        this.dom.setAttribute("x1", this.startState.getPos().x)
        this.dom.setAttribute("y1", this.startState.getPos().y)
        this.dom.setAttribute("x2", this.endState.getPos().x)
        this.dom.setAttribute("y2", this.endState.getPos().y)
    }
}