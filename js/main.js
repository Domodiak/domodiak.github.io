const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const p1 = new Point(100, 100)
const p2 = new Point(100, 200)
const p3 = new Point(200, 300)
const p4 = new Point(400, 300)

const e1 = new Edge(p1, p2)
const e2 = new Edge(p1, p3)
const e3 = new Edge(p1, p4)
const e4 = new Edge(p2, p3)

const graph = new Graph([p1, p2, p3, p4], [e1, e2, e3, e4])
graph.draw(ctx)