class Link {

    #startState
    #endState
    
    #selected = false
    #mode = 'line'

    #linedom
    #linehitbox
    #curvedom
    #curvehitbox

    #cPoint1 = undefined
    #cPoint2 = undefined



    constructor(state1, state2) {
        this.#startState = {
            object : state1,
            x : state1.getPos().x,
            y : state1.getPos().y
        }
        this.#endState = {
            object : state2,
            x : state2.getPos().x,
            y : state2.getPos().y
        }

        //------------------------------------------------------------------------------//
        // Create line dom and hitbox
        linkSvg.insertAdjacentHTML("beforeend", `
            <line x1="${this.#startState.x}" y1="${this.#startState.y}" x2="${this.#endState.x}" y2="${this.#endState.y}" marker-end="url(#line-arrow)" class="link"/>
        `)
        this.#linedom = linkSvg.lastElementChild

        linkSvg.insertAdjacentHTML("beforeend", `
            <line x1="${this.#startState.x}" y1="${this.#startState.y}" x2="${this.#endState.x}" y2="${this.#endState.y}" class="hitbox"/>
        `)
        this.#linehitbox = linkSvg.lastElementChild



        //------------------------------------------------------------------------------//
        // Calculate perpendicular normal vector for initial curve
        let vector = [ this.#startState.x - this.#endState.x, this.#startState.y - this.#endState.y ]
        let vecLen = Math.sqrt( Math.abs(vector[0]*vector[0]) + Math.abs(vector[1]*vector[1]) )
        let perpNormVector = [ vector[1] / vecLen, - vector[0] / vecLen ]
        
        // Create control points
        this.#cPoint1 = {
            x : this.#startState.x - (this.#startState.x - this.#endState.x) / 3 + vecLen/4*perpNormVector[0],
            y : this.#startState.y - (this.#startState.y - this.#endState.y) / 3 + vecLen/4*perpNormVector[1],
        }
        cPointsDiv.insertAdjacentHTML("beforeEnd", `
            <div class="cpoint cpoint1" style="left: ${this.#cPoint1.x}px; top: ${this.#cPoint1.y}px"></div>
        `)
        this.#cPoint1.dom = cPointsDiv.lastElementChild
        this.#cPoint1.dom.style.display = 'none'
        
        this.#cPoint2 = {
            x : this.#startState.x - (this.#startState.x - this.#endState.x) / 3 * 2 - vecLen/4*perpNormVector[0],
            y : this.#startState.y - (this.#startState.y - this.#endState.y) / 3 * 2 - vecLen/4*perpNormVector[1],
        }
        cPointsDiv.insertAdjacentHTML("beforeEnd", `
        <div class="cpoint cpoint2" style="left: ${this.#cPoint2.x}px; top: ${this.#cPoint2.y}px"></div>
        `)
        this.#cPoint2.dom = cPointsDiv.lastElementChild
        this.#cPoint2.dom.style.display = 'none'
        


        //------------------------------------------------------------------------------//
        // Create curve dom and hitbox
        linkSvg.insertAdjacentHTML("beforeend", `
        <path d="M ${this.#startState.x} ${this.#startState.y} 
                C ${this.#cPoint1.x} ${this.#cPoint1.y}
                ${this.#cPoint2.x} ${this.#cPoint2.y}
                ${this.#endState.x} ${this.#endState.y}" marker-end="url(#curve-arrow)" class="link"></path>
        `)
        this.#curvedom = linkSvg.lastElementChild
        this.#curvedom.style.display = 'none'

        linkSvg.insertAdjacentHTML("beforeend", `
        <path d="M ${this.#startState.x} ${this.#startState.y} 
                C ${this.#cPoint1.x} ${this.#cPoint1.y}
                ${this.#cPoint2.x} ${this.#cPoint2.y}
                ${this.#endState.x} ${this.#endState.y}"class="hitbox"></path>
        `)
        this.#curvehitbox = linkSvg.lastElementChild
        this.#curvehitbox.style.display = 'none'



        //------------------------------------------------------------------------------//
        // Add link to states
        this.#startState.object.pushLink('start', this)
        this.#endState.object.pushLink('end', this)
    }


    // DOM and hitbox getters
    getDOM() {
        return this.#mode == 'line' ? this.#linedom : this.#curvedom
    }

    getHitbox() {
        return this.#mode == 'line' ? this.#linehitbox : this.#curvehitbox
    }


    // State getter
    getStartState() {
        return this.#startState.object
    }

    getEndState() {
        return this.#endState.object
    }


    // Change position
    updatePos() {

        this.#startState.x = this.#startState.object.getPos().x
        this.#startState.y = this.#startState.object.getPos().y
        this.#endState.x = this.#endState.object.getPos().x
        this.#endState.y = this.#endState.object.getPos().y

        // In line mode
        if(this.#mode == 'line') {

            // Update line position
            this.#linedom.setAttribute("x1", this.#startState.x)
            this.#linedom.setAttribute("y1", this.#startState.y)
            this.#linedom.setAttribute("x2", this.#endState.x)
            this.#linedom.setAttribute("y2", this.#endState.y)
    
            // Update line hitbox position
            this.#linehitbox.setAttribute("x1", this.#startState.x)
            this.#linehitbox.setAttribute("y1", this.#startState.y)
            this.#linehitbox.setAttribute("x2", this.#endState.x)
            this.#linehitbox.setAttribute("y2", this.#endState.y)

        // In curve mode
        } else {

            // Update control points position
            this.#cPoint1.dom.style.left = this.#cPoint1.x + "px"
            this.#cPoint1.dom.style.top = this.#cPoint1.y + "px"
            this.#cPoint2.dom.style.left = this.#cPoint2.x + "px"
            this.#cPoint2.dom.style.top = this.#cPoint2.y + "px"

            // Calculate assisting vectors
            let startVector = [ this.#cPoint1.x - this.#startState.x, this.#cPoint1.y - this.#startState.y ]
            let vecLen = Math.sqrt( startVector[0]*startVector[0] + startVector[1]*startVector[1] )
            startVector = [ startVector[0] / vecLen, startVector[1] / vecLen ]

            let endVector = [ this.#cPoint2.x - this.#endState.x, this.#cPoint2.y - this.#endState.y ]
            vecLen = Math.sqrt( endVector[0]*endVector[0] + endVector[1]*endVector[1] )
            endVector = [ endVector[0] / vecLen, endVector[1] / vecLen ]


            // Set path
            let patharg =  `M ${this.#startState.x + startVector[0] * 32 } ${this.#startState.y + startVector[1] * 32} 
                            C ${this.#cPoint1.x} ${this.#cPoint1.y}
                              ${this.#cPoint2.x} ${this.#cPoint2.y}
                              ${this.#endState.x + endVector[0] * 32 } ${this.#endState.y + endVector[1] * 32}`

            this.#curvedom.setAttribute('d', patharg)
            this.#curvehitbox.setAttribute('d', patharg)

        }
    }


    getCpoint1() {
        return this.#cPoint1
    }

    setCpoint1Pos(x, y) {
        this.#cPoint1.x = x
        this.#cPoint1.y = y

        this.updatePos()
    }

    getCpoint2() {
        return this.#cPoint2
    }

    setCpoint2Pos(x, y) {
        this.#cPoint2.x = x
        this.#cPoint2.y = y

        this.updatePos()
    }


    // Seleceted field getter, setter
    getSelected() {
        return this.#selected
    }

    setSelected(b) {

        // Changes 'selected' field value if the value is different to param
        if(b && !this.#selected) {
            this.#selected = true
            this.#linehitbox.classList.add('selected')
            this.#curvehitbox.classList.add('selected')
            if(this.#mode == 'curve') {
                this.#cPoint1.dom.style.display = 'block'
                this.#cPoint2.dom.style.display = 'block'
            }
        } else if(!b && this.#selected) {
            this.#selected = false
            this.#linehitbox.classList.remove("selected")
            this.#curvehitbox.classList.remove("selected")
            this.#cPoint1.dom.style.display = 'none'
            this.#cPoint2.dom.style.display = 'none'
        }

    }


    // Mode getter, setter
    getMode() {
        return this.#mode
    }

    changeMode() {
        if(this.#mode == 'line') {
            this.#mode = 'curve'

            this.updatePos()

            if(this.#selected) {
                this.#cPoint1.dom.style.display = 'block'
                this.#cPoint2.dom.style.display = 'block'
            }

            this.#linedom.style.display = 'none'
            this.#linehitbox.style.display = 'none'
            this.#curvedom.style.display = 'block'
            this.#curvehitbox.style.display = 'block'

        } else {
            this.#mode = 'line'

            this.updatePos()

            this.#cPoint1.dom.style.display = 'none'
            this.#cPoint2.dom.style.display = 'none'

            this.#linedom.style.display = 'block'
            this.#linehitbox.style.display = 'block'
            this.#curvedom.style.display = 'none'
            this.#curvehitbox.style.display = 'none'
        }
    }
}