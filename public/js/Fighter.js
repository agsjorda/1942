class Fighter {
	constructor({ id,position, velocity = {x:0,y:0}, className }) {
		this.id = id
		this.position = position;
		this.velocity = velocity;
		this.isAttacking;
		this.health = 100;
		this.className = className;
	}

	attack() {
		this.isAttacking = true;
		setTimeout(() => {
			this.isAttacking = false;
		}, 100);
	}
}
module.exports = Fighter;