const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const graph = new Graph()
const graphEditor = new GraphEditor(graph)

function draw() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    graphEditor.draw(ctx)

    window.requestAnimationFrame(draw)
}

draw()