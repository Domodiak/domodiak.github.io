class Input {
	static down = [];
	/** @param {KeyboardEvent} e */
	static keydown(e) {
		if(!Input.down.some(v => v == e.key)) {
			Input.down.push(e.key)
		}
	}

	/** @param {KeyboardEvent} e */
	static keyup(e) {
		Input.down.splice(Input.down.indexOf(e.key), 1)
	}

	/** @param {KeyboardEvent} e */
	static keypress(e) {}
}

document.addEventListener("keydown", Input.keydown)
document.addEventListener("keyup", Input.keyup)
document.addEventListener("keypress", Input.keypress)