class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx, { size = 16, color = "#000" } = {}) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2 )
        ctx.fill()
        ctx.fillStyle = "#000"
    }
}