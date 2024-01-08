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

    addPoint(x, y) {
        const hasPoint = this.points.some((v) => v.x === x && v.y === y)
        const success = !hasPoint

        console.log(success)
        if(success) {
            const point = new Point(x, y)
            this.points.push(point)
            return point
        }

        return null
    }

    dispose() {
        this.points.length = 0
        this.edges.length = 0
    }
}