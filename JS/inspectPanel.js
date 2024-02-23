class InspectorPanel {

    static panel = document.querySelector("#inspect-panel")
    static nameDOM = document.querySelector("#inspected-name span")
    static linkModeDOM = document.querySelector("#inspected-data #link-mode")
    static lineModeDOM = this.linkModeDOM.children[0]
    static pathModeDOM = this.linkModeDOM.children[1]
    static inspectedState
    static inspectedLink

    static {
        this.panel.addEventListener('click', (e) => {e.stopPropagation()})

        this.lineModeDOM.addEventListener('click', () => {
            // Switch base pos to line and animation to topath
            this.linkModeDOM.classList.remove('line')
            this.linkModeDOM.classList.remove('anim-topath')
            this.linkModeDOM.classList.add('path')
            this.linkModeDOM.classList.add('anim-toline')

            this.inspectedLink.changeMode()

            // Set selected to path button
            this.pathModeDOM.classList.remove('selected')
            this.lineModeDOM.classList.add('selected')
        })

        this.pathModeDOM.addEventListener('click', () => {
            // Switch base pos to path and animation to toline
            this.linkModeDOM.classList.remove('path')
            this.linkModeDOM.classList.remove('anim-toline')
            this.linkModeDOM.classList.add('line')
            this.linkModeDOM.classList.add('anim-topath')

            // Change link mode
            this.inspectedLink.changeMode()

            // Set selected to line button
            this.lineModeDOM.classList.remove('selected')
            this.pathModeDOM.classList.add('selected')
        })
    }



    static hideInspector() {
        // Hide inspect panel
        this.panel.style.display = 'none'
        // Unset inspected elem
        this.inspectedState = undefined
        this.inspectedLink = undefined

        // Remove link mode related classes
        this.lineModeDOM.classList.remove('selected')
        this.pathModeDOM.classList.remove('selected')

        this.linkModeDOM.classList.remove('line')
        this.linkModeDOM.classList.remove('anim-topath')
        this.linkModeDOM.classList.remove('path')
        this.linkModeDOM.classList.remove('anim-toline')

        // Hide link mode selector
        this.linkModeDOM.style.display = 'none'
    }



    static inspectState(elem) {
        this.panel.style.display = 'block'
        this.inspectedElem = elem
        this.nameDOM.innerHTML = `State - ${elem.name}`  
    }


    static inspectLink(elem) {
        // Set selected link and name
        this.inspectedLink = elem
        this.nameDOM.innerHTML = `Link - ${elem.startState.name}->${elem.endState.name}`

        // Select link mode
        if(this.inspectedLink.getMode() == 'line') {
            this.lineModeDOM.classList.add('selected')
            this.linkModeDOM.classList.add('line')
        } else {
            this.pathModeDOM.classList.add('selected')
            this.linkModeDOM.classList.add('path')
        }

        this.linkModeDOM.style.display = 'flex'
        
        this.panel.style.display = 'block'
    }
}