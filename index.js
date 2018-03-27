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
// app.listen(3000, function(){
//     console.log("Server has started");
// });


// // Pages Links
// app.get("/", function(req, res){
//     // res.redirect("/irctcTourism");
//     res.render("lg&su/index.ejs");
// });
// app.get("/signup", function(req, res){
//     res.render("lg&su/signup.ejs");
// });
// app.get("/admin", function(req, res){
//     res.render("lg&su/admin.ejs");
// });
// app.get("/landingpage", function(req, res){
//     res.render("user/landingpage.ejs");
// });
// app.get("/resthouse", function(req, res){
//     res.render("user/resthouse.ejs");
// });
// app.get("/result", function(req, res){
//     res.render("user/result.ejs");
// });
// app.get("/mybooking", function(req, res){
//     res.render("user/mybooking.ejs");
// });
// app.get("/contact", function(req, res){
//     res.render("user/contact.ejs");
// });
// app.get("/headadmin", function(req, res){
//     res.render("admin/headadmin.ejs");
// });
// app.get("/sadmin", function(req, res){
//     res.render("admin/sadmin.ejs");
// });
// // Pages Links
// app.get("/", function(req, res){
//     // res.redirect("/irctcTourism");
//     res.render("lg&su/index.ejs");
// });
// app.get("/signup", function(req, res){
//     res.render("lg&su/signup.ejs");
// });
// app.get("/admin", function(req, res){
//     res.render("lg&su/admin.ejs");
// });
// app.get("/landingpage", function(req, res){
//     res.render("user/landingpage.ejs");
// });
// app.get("/resthouse", function(req, res){
//     res.render("user/resthouse.ejs");
// });
// app.get("/result", function(req, res){
//     res.render("user/result.ejs");
// });
// app.get("/mybooking", function(req, res){
//     res.render("user/mybooking.ejs");
// });
// app.get("/contact", function(req, res){
//     res.render("user/contact.ejs");
// });


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
app.post("/irctcTourism/search", function(req, res){
    // get data from form and add to resthouses database
    var city = req.body.city,
    checkIn = req.body.checkIn,
    checkOut = req.body.checkOut,
    guest     = req.body.guestNo,
    oclass = req.body.oclass;
    var roomType;
    if(oclass < 3)
        oclass = 0;
    else
        oclass = 1;
    var resthouseData = {city: city, checkIn: checkIn, checkOut: checkOut, guest: guest, roomType:roomType};
    console.log(resthouseData);
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
        
        Resthousebooking.find({"$and" : [{city : city}, {roomType : roomType}, 
                                         {"$or" :[{"$and" : [{checkIn : {"$gte": (checkIn)} }, {checkIn : {"$lte": (checkOut)} } ] },
                                         {"$and" : [{checkOut : {"$gte": (checkIn)} }, {checkOut : {"$lte": (checkOut)} } ] }]} ]}, 
                function(err, queryResult){
                    if(err) console.log(err);
                    if(queryResult.length == 0){
                        Resthouse.find({"$and" : [{city:resthouseData.city}, {roomType: resthouseData.roomType}]}, function(err, searchRes){
                            if(err)
                                console.log(err);
                            else{
                                var searchResthouse = {resthouseData:resthouseData, searchRes: searchRes}
                                console.log(resthouseData);
                                res.render("book", {searchResthouse: searchResthouse});
                            }
                            });
                    }
                    else{
                        res.send("Not Found!");
                    }
                });
        // if(result == 0)
        // {
        //     Resthouse.find({"$and" : [{city:city}, {roomType: 0}]}, function(err, searchRes){
        //     if(err)
        //         console.log(err);
        //     else{
        //         var searchResthouse = {city: city, checkIn: checkIn, checkOut: checkOut, guest: guest, searchRes: searchRes}
        //         res.render("book", {searchResthouse: searchResthouse});
        //     }
        //     });
        // }
    
        //     function(err, newlyCreated){
        // if(err){
        //     console.log(err);
        // } else {
        //     //redirect back to resthouse page

        //     res.redirect("/searchResult");
        // }
    // }
    
        // else{
            
        // }
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