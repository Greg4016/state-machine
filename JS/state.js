class State {

    #pos = {"x" : 0, "y" : 0}
    name
    dom

    #selected = false

    linkStarts = []
    linkEnds = []

    constructor(x, y, name) {
        // Set position and name
        this.#pos = {"x" : x, "y" : y}
        this.name = name

        // Create and store DOM element
        statesDiv.insertAdjacentHTML("beforeEnd", `
            <div class="state" style="left: ${this.#pos.x}px; top: ${this.#pos.y}px"><span>S<sub>${this.name}</sub></span></div>
        `)
        this.dom = statesDiv.lastElementChild

    }

    // 'selected' field getter, setter
    getSelected() {
        return this.#selected
    }

    setSelected(b) {

        // Changes 'selected' field value if the value is different to param
        if(b && !this.selected) {
            this.selected = true
            this.dom.classList.add("selected")
        } else if(!b && this.selected) {
            this.selected = false
            this.dom.classList.remove("selected")
        }

    }

    // 'pos' field getter, setter
    getPos() {
        return this.#pos
    }

    setPos(x, y) {
        // Set variable and DOM property
        this.#pos = {"x" : x, "y" : y}
        this.dom.style.left = this.#pos.x + "px"
        this.dom.style.top = this.#pos.y + "px"

        // Call position update on connected links
        this.linkStarts.forEach(l => l.updatePos())
        this.linkEnds.forEach(l => l.updatePos())
    }


}