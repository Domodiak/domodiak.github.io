const canvas = document.getElementById("main-canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

function canvasResize() {
	canvas.height = window.innerHeight
	canvas.width = window.innerWidth
}
canvasResize(); window.addEventListener("resize", canvasResize)

function draw() {
	window.requestAnimationFrame(draw)
}
draw()