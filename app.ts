//Main Imports
import express = require('express');
const app: express.Application = express();
import http = require("http");
const server = http.createServer(app);
import path = require("path");
import bodyParser = require("body-parser");
import socket_io = require("socket.io");
const io = socket_io(server);

//Adding directories
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));

//Import my classes

server.listen(3000, () => {
    console.log("Listening on port *3000");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});