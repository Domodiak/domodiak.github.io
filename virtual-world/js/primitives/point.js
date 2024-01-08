class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    draw(ctx, { size = 16, color = "#000", selected = false } = {}) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2 )
        ctx.fill()
        if(selected) {
            ctx.beginPath()
            ctx.strokeStyle = "rgb(255,255,0)"
            ctx.lineWidth = 4
            ctx.arc(this.x, this.y, size / 3, 0, Math.PI * 2)
            ctx.stroke()
        }
        ctx.strokeStyle = "#000"
        ctx.fillStyle = "#000"
    }
}