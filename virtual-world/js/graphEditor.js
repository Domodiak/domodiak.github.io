class GraphEditor {
    constructor(graph) {
        this.graph = graph
        this.selection = null

        this.#addEventListeners()
    }
    
    #addEventListeners() {
        document.addEventListener('mousedown', (e) => {
            if(e.button === 0) {
                this.#addPoint(e.x, e.y)
            }
        })
    }

    #addPoint(x, y) {
        const newPoint = this.graph.addPoint(x-8, y-8)
        this.selection = newPoint
    }

    draw(ctx) {
        this.graph.draw(ctx)

        if(this.selection) {
            this.selection.draw(ctx, { size: 16, selected: true })
        }
    }
}