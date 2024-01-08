class Graph {
    constructor(points = [], edges = []) {
        this.points = points
        this.edges = edges
    }

    #getConnections(p) {
        return this.edges.filter((v) => v.has(p))
    }

    draw(ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for(let edge of this.edges) {
            edge.draw(ctx)
        }

        for(let point of this.points) {
            point.draw(ctx)
        }
    }

    addEdge(p1, p2) {
        const edge = new Edge(p1, p2)
        if(!this.edges.some((v) => v.equals(edge))) {
            this.edges.push(edge)
        }
    }

    #getPointAtPosition(x, y) {
        return this.points.find((v) => v.x === x && v.y === y)
    }

    addPoint(x, y) {
        const success = this.#getPointAtPosition(x, y) == null

        if(success) {
            const point = new Point(x, y)
            this.points.push(point)
            return point
        }

        return null
    }

    movePoint(point, x, y) {
        if(!this.#getPointAtPosition(x, y)) {
            point.x = x
            point.y = y
        }
    }

    removeEdge(e) {
        this.edges.splice(this.edges.indexOf(e), 1)
    }

    removePoint(p) {
        this.#getConnections(p).map(v => this.removeEdge(v))
        this.points.splice(this.points.indexOf(p), 1)
    }

    dispose() {
        this.points.length = 0
        this.edges.length = 0
    }

    getNearestPoint(p, threshold = Number.MAX_SAFE_INTEGER) {
        let closest_dist = Number.MAX_SAFE_INTEGER
        let closest_p = null

        for(let graphPoint of this.points) {
            if(graphPoint === p) continue

            const dist = distance(p, graphPoint)
            if (dist < closest_dist) {
                closest_dist = dist
                closest_p = graphPoint
            }
        }

        return closest_dist < threshold ? closest_p : null
    }
}