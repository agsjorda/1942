class Sprite {
	constructor(className, x, y) {
		this.className = className;
		this.x = x;
		this.y = y;

		// Create a new div element and assign it to the 'element' property
		this.element = document.createElement("div");
		this.element.classList.add(className);
		this.element.style.position = "absolute";
		this.element.style.left = x + "px";
		this.element.style.top = y + "px";

		// Append the element to the container or document body
		const container = document.getElementById("container");
		container.appendChild(this.element);
	}

	move(dx, dy) {
		this.x += dx;
		this.y += dy;

		// Update the position of the element
		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	}

	destroy() {
		// Remove the element from the container or document body
		this.element.remove();
	}
}

module.exports = Sprite;
