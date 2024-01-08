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