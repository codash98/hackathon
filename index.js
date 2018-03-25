var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.use(express.static("public"));
// SCHEMA SETUP


mongoose.connect("mongodb://localhost:27017/demo_1");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var restHouseSchema = new mongoose.Schema({
    name: String,
    image: String,
    roomType: String,
    roomQty: Number,
    availability: Number,
    address: String,
    city: String,
    description: String
 });

 var Resthouse = mongoose.model("Resthouse", restHouseSchema);

// app.get("/", function(req, res){
//     res.render("landing");
// });


app.listen(3000, function(){
    console.log("Server has started");
});

app.get("/", function(req, res){
    // res.redirect("/irctcTourism");
    res.render("signup3.ejs");
});

//INDEX - show all resthouses
app.get("/irctcTourism", function(req, res){
    // Get all resthouses from DB
    Resthouse.find({}, function(err, allResthouse){
       if(err){
           console.log(err);
       } else {
          res.render("index",{resthouses:allResthouse});
       }
    });
});

//CREATE - add new resthouse to DB
app.post("/irctcTourism", function(req, res){
    // get data from form and add to resthouses array
    var name = req.body.name,
    image    = req.body.image,
    address  = req.body.address,
    city     = req.body.city,
    desc     = req.body.description;
    var newResthouse = {name: name, image: image, address: address, city: city, description: desc}
    // Create a new resthouse and save to DB
    Resthouse.create(newResthouse, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to resthouse page
            res.redirect("/irctcTourism");
        }
    });
});

//NEW - show form to create new resthouse
app.get("/irctcTourism/new", function(req, res){
   res.render("new"); 
});

app.get("/irctcTourism/search", function(req, res){
    res.render("search");
});

// SHOW - shows more info about one resthouse
app.get("/irctcTourism/:id", function(req, res){
    //find the resthouse with provided ID
    Resthouse.findById(req.params.id, function(err, foundResthouse){
        if(err){
            console.log(err);
        } else {
            //render show template with that resthouse
            res.render("show", {resthouse: foundResthouse});
        }
    });
})
