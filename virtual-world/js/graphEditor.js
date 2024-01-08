class GraphEditor {
    constructor(graph) {
        this.graph = graph
        this.selection = null
        this.hover = null
        this.pointIntent = null
        this.edgeIntent = null

        this.#addEventListeners()
    }
    
    #addEventListeners() {
        document.addEventListener('mousedown', (e) => {
            if(e.button === 0) {
                if(this.hover) {
                    if(this.selection) {
                        this.graph.addEdge(this.hover, this.selection)
                    }
                    this.edgeIntent = null
                    this.selection = this.hover
                } else {
                    const p1 = this.selection
                    const p2 = this.#addPoint(e.x, e.y)
                    if(p1) {
                        this.graph.addEdge(p1, p2)
                    }
                }
            }
            if(e.button === 2) {
                if(this.hover) {
                    this.graph.removePoint(this.hover)
                    if(this.selection == this.hover) {
                        this.selection = null
                    }
                    this.hover = null
                } else {
                    this.selection = null
                    this.edgeIntent = null
                }
            }
        })

        document.addEventListener('mousemove', (e) => {
            this.hover = this.graph.getNearestPoint(new Point(e.x, e.y), 8)

            if(!this.hover) {
                this.pointIntent = new Point(e.x, e.y)
            } else {
                this.pointIntent = null
            }

            if(this.selection) {
                this.edgeIntent = new Edge(this.hover ? this.hover : this.pointIntent, this.selection)
            } else {
                this.edgeIntent = null
            }
        })

        document.addEventListener("contextmenu", (e) => e.preventDefault())
    }

    #addPoint(x, y) {
        const newPoint = this.graph.addPoint(x, y)
        this.selection = newPoint
        this.hover = newPoint
        this.pointIntent = null
        this.edgeIntent = null
        return newPoint
    }

    draw(ctx) {
        this.graph.draw(ctx)

        if(this.edgeIntent) this.edgeIntent.draw(ctx, { dash: [3, 3] })

        if(this.pointIntent) this.pointIntent.draw(ctx, { size: 12, color: "rgba(0,0,0,0.5)" })
        if(this.hover) this.hover.draw(ctx, { hover: true })
        if(this.selection) this.selection.draw(ctx, { selected: true })
    }
}