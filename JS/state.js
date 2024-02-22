class State {

    #pos = {"x" : 0, "y" : 0}
    name
    dom

    #selected = false

    #links = {
        starts : [],
        ends : []
    }

    constructor(x, y, name) {
        // Set position and name
        this.#pos = {"x" : x, "y" : y}
        this.name = `S<sub>${name}</sub>`

        // Create and store DOM element
        statesDiv.insertAdjacentHTML("beforeEnd", `
            <div class="state" style="left: ${this.#pos.x}px; top: ${this.#pos.y}px"><span>${this.name}</span></div>
        `)
        this.dom = statesDiv.lastElementChild

    }

    // Selected field getter, setter
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


    // Position getter, setter
    getPos() {
        return this.#pos
    }

    setPos(x, y) {
        // Set variable and DOM property
        this.#pos = {"x" : x, "y" : y}
        this.dom.style.left = this.#pos.x + "px"
        this.dom.style.top = this.#pos.y + "px"

        // Call position update on connected links
        this.#links.starts.forEach(l => l.updatePos())
        this.#links.ends.forEach(l => l.updatePos())
    }


    // Connected links getter, setter
    getLinks() {
        return this.#links
    }

    pushLink(where, link) {
        if(where == 'start') this.#links.starts.push(link)
        else if(where == 'end') this.#links.ends.push(link)
    }
}