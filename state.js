class State {

    #x = 0
    #y = 0
    dom
    name
    #selected = false
    linkStarts = []
    linkEnds = []

    constructor(x, y, name) {
        this.#x = x
        this.#y = y
        this.name = name

        
        statesDiv.insertAdjacentHTML("beforeEnd", `
            <div class="state" style="left: ${this.#x}px; top: ${this.#y}px"><span>S<sub>${this.name}</sub></span></div>
        `)
        this.dom = statesDiv.lastElementChild

    }

    getSelected() {
        return this.#selected
    }

    setSelected(b) {

        if(b && !this.selected) {
            this.selected = true
            this.dom.classList.add("selected")
        } else if(!b && this.selected) {
            this.selected = false
            this.dom.classList.remove("selected")
        }

    }

    getPos() {
        return {"x" : this.#x, "y" : this.#y}
    }

    setPos(x, y) {
        this.#x = x
        this.#y = y
        this.dom.style.left = this.#x + "px"
        this.dom.style.top = this.#y + "px"

        this.linkStarts.forEach(l => l.updatePos())
        this.linkEnds.forEach(l => l.updatePos())
    }


}