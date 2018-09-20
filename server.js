var express = require("express");
var app = express();

var fs = require("fs");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;


var ladybug = fs.readFileSync("img/ladybug.svg");
var ladybugmid = fs.readFileSync("img/ladybug-middlelegs.svg");
var ladybugouter = fs.readFileSync("img/ladybug-outerlegs.svg");

var ladyindex = fs.readFileSync("index.html");
var ladyindexDOM = new JSDOM(ladyindex);

ladyindexDOM.window.document.getElementById("ladybug").innerHTML = ladybug;
ladyindexDOM.window.document.getElementById("ladybug-middlelegs").innerHTML = ladybugmid;
ladyindexDOM.window.document.getElementById("ladybug-outerlegs").innerHTML = ladybugouter;

console.log(ladyindexDOM.serialize());

app.get("/", function(req, res) {
  res.send(ladyindexDOM.serialize());
  //res.sendFile(__dirname + "/index.html");
  console.log("served /index.html");
});



app.get("/ladybug/css", function (req, res) {
	res.sendFile(__dirname + "/css/index.css");
	console.log("served /css/index.css")
});

app.get("/ladybug/script", function (req, res) {
	res.sendFile(__dirname + "/js/index.js");
	console.log("served /js/index.js");
});

app.listen(4001, function(err) {
	if (err) throw err;
	console.log("App listening on port 4001");
});
