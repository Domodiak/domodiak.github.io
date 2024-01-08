class GraphEditor {
    constructor(graph) {
        this.graph = graph
        this.selection = null
        this.hover = null
        this.pointIntent = null
        this.edgeIntent = null

        this.drag = null

        this.#addEventListeners()
    }
    
    #onMouseDown(e) {
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
        if(e.button === 1 && this.hover) {
            this.drag = this.hover
        }
        if(e.button === 2) {
            if(this.hover) {
                this.#removePoint(this.hover)
            } else {
                this.#deselect()
            }
        }
    }

    #onMouseMove(e) {
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

        if(this.drag) {
            this.graph.movePoint(this.drag, e.x, e.y)
        }
    }

    #onKeyDown(e) {
            
        switch(e.key) {
            case "Escape":
                this.#deselect()
                break;
            case "Delete":
                if(this.hover) {
                    this.#removePoint(this.hover)
                }
                break;
        }
    }

    #onMouseUp(e) {
        this.drag = null
    }

    #addEventListeners() {
        document.addEventListener('keydown', this.#onKeyDown.bind(this))
        document.addEventListener('mousedown', this.#onMouseDown.bind(this))
        document.addEventListener('mousemove', this.#onMouseMove.bind(this))
        document.addEventListener('mouseup', this.#onMouseUp.bind(this))
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

    #removePoint(point) {
        this.graph.removePoint(point)
        if(this.selection == point) {
            this.selection = null
        }
        if(this.hover == point) {
            this.hover = null
        }
    }

    #deselect() {
        this.selection = null
        this.edgeIntent = null
    }

    draw(ctx) {
        this.graph.draw(ctx)

        if(this.edgeIntent) this.edgeIntent.draw(ctx, { dash: [3, 3] })

        if(this.pointIntent) this.pointIntent.draw(ctx, { size: 12, color: "rgba(0,0,0,0.5)" })
        if(this.hover) this.hover.draw(ctx, { hover: true })
        if(this.selection) this.selection.draw(ctx, { selected: true })
    }
}