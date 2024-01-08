class GraphEditor {
    constructor(graph) {
        this.graph = graph
        this.selection = null
        this.hover = null

        this.#addEventListeners()
    }
    
    #addEventListeners() {
        document.addEventListener('mousedown', (e) => {
            if(e.button === 0) {
                if(this.hover) {
                    this.selection = this.hover
                } else {
                    this.#addPoint(e.x, e.y)
                }
            }
        })

        document.addEventListener('mousemove', (e) => {
            this.hover = this.graph.getNearestPoint(new Point(e.x, e.y), 8)
        })
    }

    #addPoint(x, y) {
        const newPoint = this.graph.addPoint(x, y)
        this.selection = newPoint
    }

    draw(ctx) {
        this.graph.draw(ctx)

        if(this.hover) this.hover.draw(ctx, { size: 16, hover: true })
        if(this.selection) this.selection.draw(ctx, { size: 16, selected: true })
    }
}