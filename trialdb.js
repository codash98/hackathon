var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demo_1");

var locationSchema = new mongoose.Schema({
    name: String,
    state: String
});

var Loc = mongoose.model("locations", locationSchema);

// var udaipur = new Loc({
//     name: "Udaipur", 
//     state: "Rajasthan"
// });

// udaipur.save(function(err, loc){
//     if(err)
//     {
//         console.log("Error found!")
//     }
//     else{
//         console.log("City added");
//         console.log(udaipur);
//     }
// });

// Loc.create({
//     name:"Chennai",
//     state:"Tamil Nadu"
// }, function(err, loc){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(loc);
//     }
// });


//retrive all locs
var p = 500;
Loc.find({}, function(err, flocation){
    if(err)
    {
        console.log("Error!!");
    }
    else
    {
        console.log("Locations");
        console.log(p);
        p = flocation.length;
        //console.log(flocation);
        callback(p);
    }
    console.log(p);
});