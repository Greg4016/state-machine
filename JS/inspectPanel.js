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
            this.linkModeDOM.classList.remove('line')
            this.linkModeDOM.classList.remove('anim-topath')
            this.linkModeDOM.classList.add('path')
            this.linkModeDOM.classList.add('anim-toline')

            this.inspectedLink.changeMode()

            this.pathModeDOM.classList.remove('selected')
            this.lineModeDOM.classList.add('selected')
        })

        this.pathModeDOM.addEventListener('click', () => {
            this.linkModeDOM.classList.remove('path')
            this.linkModeDOM.classList.remove('anim-toline')
            this.linkModeDOM.classList.add('line')
            this.linkModeDOM.classList.add('anim-topath')

            this.inspectedLink.changeMode()

            this.lineModeDOM.classList.remove('selected')
            this.pathModeDOM.classList.add('selected')
        })
    }

    static hideInspector() {
        this.panel.style.display = 'none'
        this.inspectedState = undefined
        this.inspectedLink = undefined

        this.lineModeDOM.classList.remove('selected')
        this.pathModeDOM.classList.remove('selected')
    }

    static inspectState(elem) {
        this.panel.style.display = 'block'
        this.inspectedElem = elem
        this.nameDOM.innerHTML = `State - ${elem.name}`  
    }

    static inspectLink(elem) {
        this.inspectedLink = elem
        
        this.nameDOM.innerHTML = `Link - ${elem.startState.name}->${elem.endState.name}`

        this.inspectedLink.getMode() == 'line' ?
            this.lineModeDOM.classList.add('selected') :
            this.pathModeDOM.classList.add('selected')
        
        this.panel.style.display = 'block'
    }
}