const canvas = document.getElementById("main-canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

function canvasResize() {
	canvas.height = window.innerHeight
	canvas.width = window.innerWidth
}
canvasResize(); window.addEventListener("resize", canvasResize)

const car = new Car(100, 100, 20, 20, 10, 0, 0.98, 0.03)

function draw() {
	ctx.fillStyle = "black"
	ctx.fillRect(0,0,canvas.width,canvas.height)

	ctx.fillStyle = "white"
	car.draw(ctx)
	window.requestAnimationFrame(draw)
}
draw()