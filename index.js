var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
app.use(express.static("public"));
// SCHEMA SETUP


mongoose.connect("mongodb://localhost:27017/resthouse_1");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

var restHouseSchema = new mongoose.Schema({
    name: String,
    image: String,
    roomQty: [0, 0],
    address: String,
    city: String,
    description: String,
    roomsBooked : [0, 0],
    bookedDates : [ [Date, Number] ] //date and the class of the room
 });

 var restHouseBookingsSchema = new mongoose.Schema({
     name: String,
     roomType: Number,
     checkin: Date,
     checkout: Date,
     guests: Number,
 })

 var Resthouse = mongoose.model("Resthouses", restHouseSchema);
 var Resthousebooking = mongoose.model("Resthousebookings", restHouseBookingsSchema);

// app.get("/home", function(req, res){
//     res.render("landing");
// });

app.get("/", function(req, res){
    // Resthouse.find({}, function(err, result){
    //     if(err) console.log(err);
    //     console.log(result);
    // });
    res.redirect("/irctcTourism");
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
// app.post("/irctcTourism", function(req, res){
//     // get data from form and add to resthouses array
//     var name = req.body.name,
//     image    = req.body.image,
//     address  = req.body.address,
//     city     = req.body.city,
//     desc     = req.body.description;
//     var newResthouse = {name: name, image: image, address: address, city: city, description: desc}
//     // Create a new resthouse and save to DB
//     Resthouse.create(newResthouse, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to resthouse page
//             res.redirect("/irctcTourism");
//         }
//     });
// });

//CREATE - add new resthouse to DB
app.post("/irctcTourism", function(req, res){
    // get data from form and add to resthouses db
    var name = req.body.name,
    image    = req.body.image,
    address  = req.body.address,
    city     = req.body.city,
    desc     = req.body.description;
    roomQty0 = req.body.roomsGen;
    roomQty1 = req.body.roomsAC;

    var newResthouse = {name: name, image: image, address: address, city: city, description: desc, roomQty: [roomQty0, roomQty1]} ;
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
    // Get all resthouses from DB
    Resthouse.find({}, function(err, allResthouse){
    res.render("search",{resthouses:allResthouse});
});
});

//BOOK - show searched resthouses for booking
app.post("/search", function(req, res){
    // get data from form and add to resthouses database
    var city = req.body.city,
    checkIn = req.body.checkIn,
    checkOut = req.body.checkOut,
    guest     = req.body.guestNo,
    oclass = req.body.oclass;
    var result;
//     Resthouse.find({
//         city: city
//    }, function(err, searchResult){
//        if(err) console.log(err);
       
//    var searchResthouse = {city: city, checkIn: checkIn, checkOut: checkOut, guest: guest, searchResult: searchResult};
//    res.render("book", {searchResthouse: searchResthouse});
       
//    });
   
// });
    // var searchResthouse = {city: city, checkIn: checkIn, checkOut: checkOut, guest: guest, searchResult: searchResult};
    // res.render("book", {searchResthouse: searchResthouse});
    // Create a new resthouse and save to DB
    if(oclass < 3){
        result = Resthousebooking.find({"$and" : [{city : city}, {roomType : 0}, 
                {"$or" :[{"$and" : [{checkIn : {"$gte": new ISODate(checkIn)} }, {checkIn : {"$lte": new ISODate(checkOut)} } ] },
                {"$and" : [{checkOut : {"$gte": new ISODate(checkIn)} }, {checkOut : {"$lte": new ISODate(checkOut)} } ] }]} ]}).length;
        if(result == 0)
        {
            Resthouse.find({"$and" : [{city:city}, {roomType: 0}]}, function(err, searchRes){
            if(err)
                console.log(err);
            else{
                res.redirect("/search");
            }
            });
        }
        else{
            res.send("Not Found!");
        }
    }
        //     function(err, newlyCreated){
        // if(err){
        //     console.log(err);
        // } else {
        //     //redirect back to resthouse page

        //     res.redirect("/searchResult");
        // }
    // }
    else{
        result = Resthousebooking.find({"$and" : [{city : city}, {roomType : 1}, 
            {"$or" :[{checkIn : {"$gte": checkIn} }, {checkOut : {"$lte" : checkOut}}]} ]}).length;
        if(result == 0)
        {
            Resthouse.find({"$and" : [{city:city}, {roomType: 1}]}, function(err, searchRes){
            if(err)
                console.log(err);
            else{
                res.redirect("/searchResult");
            }
            });
        }
        else{
            res.send("Not Found!");
        }
}
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
});


app.listen(3000, function(){
    console.log("Server has started");
});