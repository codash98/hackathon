var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "ejs");


app.get("/", function(req, res){
    res.render("landing");
});


app.listen(3000, function(){
    console.log("Server has started");
});

