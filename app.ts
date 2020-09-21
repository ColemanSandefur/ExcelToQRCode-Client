//Main Imports
import express = require('express');
const app: express.Application = express();
import http = require("http");
const server = http.createServer(app);
import path = require("path");
import bodyParser = require("body-parser");
import socket_io = require("socket.io");
const io = socket_io(server);
import ejs = require("ejs");
import fs = require("fs");

//Adding directories
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "static")));

//Import my classes
import { ConfigManager } from "./ConfigManager";
ConfigManager.loadConfig("qrconfig.json");
import { QrGenerator } from "./qr-generator";

server.listen(ConfigManager.config.ip.split(":").pop(), () => {
    console.log(`Listening on port *${ConfigManager.config.ip.split(":").pop()}`);
});

app.get("/", (req, res) => {
    fs.readFile(__dirname + "/index.html", (err, html) => {
        res.send(ejs.render(html.toString()));
    });
});

//Scanned qr codes get linked here
app.get("/decode/:data", (req, res) => {
    fs.readFile(__dirname + "/decode.html", (err, html) => {
        //:data is in base64 we need to convert it back to ascii
        let data = QrGenerator.base64Decode(req.params["data"]);

        //put the data into desired html file using ejs
        res.send(ejs.render(html.toString(), {"data": data}));
    });
});

QrGenerator.generateQRCode("qr-code.jpg",<JSON><unknown>{name: "bob"});