const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

// Route to the index page
app.get("/", (req, res) => {
	res.render("index");
});

io.on("connect", (socket)=>{
    console.log("user connected socket", socket.id);
});

server.listen(8000, () => {
	console.log("Server listening on port 8000");
});
