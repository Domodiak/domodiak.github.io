class Graph {
    constructor(points = [], edges = []) {
        this.points = points
        this.edges = edges
    }

    draw(ctx) {
        for(let edge of this.edges) {
            edge.draw(ctx)
        }

        for(let point of this.points) {
            point.draw(ctx)
        }
    }

    dispose() {
        this.points.length = 0
        this.edges.length = 0
    }
}