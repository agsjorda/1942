const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const Fighter = require("./public/js/Fighter");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Route to the index page
app.get("/", (req, res) => {
	res.render("index");
});
let connectedPlayers = 0;
let players = {};
console.log(players);
io.on("connection", (socket) => {
	if (connectedPlayers >= 2) {
		socket.emit("error", "Maximum number of players reached");
		socket.disconnect();
		return;
	}

	connectedPlayers++;

	socket.on("new player", function () {
		players[socket.id] = { x: 300, y: 300 };
	});

	socket.on("movement", function (data) {
		let player = players[socket.id] || {};
		if (data.left) {
			player.x -= 5;
		}
		if (data.up) {
			player.y -= 5;
		}
		if (data.right) {
			player.x += 5;
		}
		if (data.down) {
			player.y += 5;
		}
	});

	socket.on("disconnect", () => {
		connectedPlayers--;
	});
});

server.listen(5000, () => {
	console.log("Server listening on port 5000");
});

setInterval(function () {
	io.sockets.emit("state", players);
}, 1000 / 60);
