// alert("from game.js");

window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM fully loaded and parsed");
    const socket = io();

	// socket.on("message", function (data) {
	// 	console.log(data);
	// });

	const movement = {
		up: false,
		down: false,
		left: false,
		right: false,
	};
	document.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "a":
				movement.left = true;
				break;
			case "w":
				movement.up = true;
				break;
			case "d":
				movement.right = true;
				break;
			case "s":
				movement.down = true;
				break;
		}
		// console.log(event.key);
	});

	window.addEventListener("keyup", (event) => {
		switch (event.key) {
			case "a":
				movement.left = false;
				break;
			case "w":
				movement.up = false;
				break;
			case "d":
				movement.right = false;
				break;
			case "s":
				movement.down = false;
				break;
		}
		// console.log(event.key);
	});

	socket.emit("new player");
	setInterval(function () {
		socket.emit("movement", movement);
	}, 1000 / 60);

	const canvas = document.getElementById("canvas");
	canvas.width = 1024;
	canvas.height = 600;
	const context = canvas.getContext("2d");
	socket.on("state",  async function (players) {
		console.log(players);
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "green";
		for (let id in players) {
			let player = players[id];
			context.beginPath();
			context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
			context.fill();
			// await player.update();
		}
	});
});
