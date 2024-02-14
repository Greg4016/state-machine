/*let paths = [
    {
        el : null,
        hitbox : null,
        coords :  [
            {
                el : null,
                hold : false,
                x : 400,
                y : 500
            },
            {
                el : null,
                hold : false,
                x : 500,
                y : 500
            },
            {
                el : null,
                hold : false,
                x : 700,
                y : 200
            },
            {
                el : null,
                hold : false,
                x : 900,
                y : 500
            },
            {
                el : null,
                hold : false,
                x : 900,
                y : 700
            },
            {
                el : null,
                hold : false,
                x : 1100,
                y : 700
            },
            {
                el : null,
                hold : false,
                x : 1400,
                y : 500
            }
        ]
    }
]



function renderPath(p) {
    let d = `M ${p.coords[0].x} ${p.coords[0].y}`
    for(let i = 1; i < p.coords.length; i += 3) {
        d += `C ${p.coords[i].x} ${p.coords[i].y}, ${p.coords[i+1].x} ${p.coords[i+1].y}, ${p.coords[i+2].x} ${p.coords[i+2].y}`
    }
    p.el.setAttribute('d', d)
    p.hitbox.setAttribute('d', d)

}

function renderDot() {

}

function createPath(p, ind) {
    p.el = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    p.el.id = 'path' + ind
    svg.append(p.el)

    p.hitbox = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    p.hitbox.id = 'pathbox' + ind
    p.hitbox.classList.add("hitbox")
    svg.append(p.hitbox)

    p.hitbox.addEventListener("click", e => {
        e.stopPropagation()
        p.coords.forEach(c => {
            c.el.setAttribute("visibility", "visible")
        })
    })


    renderPath(p)


    p.coords.forEach(c => {
        c.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        c.el.setAttribute('cx', c.x)
        c.el.setAttribute('cy', c.y)
        c.el.setAttribute("visibility", "hidden")
        c.el.classList.add("cpoint")
        svg.append(c.el)

        c.el.addEventListener("mousedown", e => {
            if(e.button == 0) c.hold = true;
        })

        c.el.addEventListener("mousemove", e => {
            if(c.hold) {
                c.el.setAttribute('cx', e.x)
                c.el.setAttribute('cy', e.y)
                c.x = e.x
                c.y = e.y
                renderPath(p)
            }
        })

        c.el.addEventListener("mouseup", e => {
            c.hold = false;
        })

        c.el.addEventListener("click", e => {
            e.stopPropagation()
        })
    });
}


createPath(paths[0], 0)

window.addEventListener("click", e => {
    paths[0].coords.forEach(c => {
        c.el.setAttribute("visibility", "hidden")
    })
})*/