class Car {
	constructor(x, y, mass, length, width, orientation, friction, turnRate) {
		this.x = x
		this.y = y
		this.length = length
		this.width = width
		this.orientation = orientation
		this.friction = friction
		this.speed = 0
		this.mass = mass
		this.turnRate = turnRate

		this.lastUpdate = Date.now()
	}

	#update() {
		const deltaTime = (Date.now() - this.lastUpdate)/1000
		this.lastUpdate = Date.now()

		const w = Input.down.some(v => v == "w")
		const a = Input.down.some(v => v == "a")
		const s = Input.down.some(v => v == "s")
		const d = Input.down.some(v => v == "d")

		let acceleration = 0

		if(w) {
			let force = 5000
			acceleration += force / this.mass
		}
		if(s) {
			let force = 2000
			acceleration -= force / this.mass
		}
		if(a) {
			this.orientation -= this.speed * this.turnRate * deltaTime
		}
		if(d) {
			this.orientation += this.speed * this.turnRate * deltaTime
		}

		this.speed += acceleration * deltaTime
		this.speed *= this.friction

		this.x += Math.cos(this.orientation) * this.speed * deltaTime
		this.y += Math.sin(this.orientation) * this.speed * deltaTime
	}

	/** @param {CanvasRenderingContext2D} ctx */
	draw(ctx) {
		this.#update()
		ctx.save()
		ctx.translate(this.x, this.y)
		ctx.rotate(this.orientation)
		ctx.fillRect(-this.length / 2, -this.width / 2, this.length, this.width)
		ctx.restore()
	}
}