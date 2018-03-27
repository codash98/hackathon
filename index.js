var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var session = require('express-session')

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
 });

//  create a schema according to the docs and store it in an own folder
// the schema should describe the fields we have in our form and specify the data it can expect
// It should look something like this:

var UserSchema = new mongoose.Schema({
  name:{
      type: String,
      required: true,
      trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  passwordConf: {
    type: String,
    required: true,
  },
  contact:{
      type: Number,
      required: true,
      unique: true,
      trim: true,
  },
  designation: {
      type: Number,
      required: true,
  },
  railwayID: {
      type: String,
      required: true
  }

});

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });


 var User = mongoose.model('User', UserSchema);
 module.exports = User;
 var Resthouse = mongoose.model("Resthouses", restHouseSchema);
 var Resthousebooking = mongoose.model("Resthousebookings", restHouseBookingsSchema);

 //hashing a password before saving it to the database

app.get("/", function(req, res){
    res.redirect("/login");
});

app.get("/login", function(req, res){
    res.render("lg&su/login.ejs");
    //res.redirect("/irctcTourism");
});

app.get("/signup", function(req, res){
    res.render("lg&su/signup.ejs");
});

app.post("/signup", function(req, res){
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.passwordConf);
    console.log(req.body.contact);
    console.log(req.body.designation);
    console.log(req.body.railwayID);
    if (req.body.name &&
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf &&
        req.body.contact &&
        req.body.designation &&
        req.body.railwayID
    ) {
        var userData = {
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          passwordConf: req.body.passwordConf,
          contact: req.body.contact,
          designation: req.body.designation,
          railwayID: req.body.railwayID
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
          if (err) {
            return next(err)
          } else {
            return res.redirect('/login');
          }
        });
      }
    else
      res.send("Fucked Up!")
})

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
        roomtType = 0;
    else
        roomType = 1;
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