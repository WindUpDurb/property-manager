"use strict";

var mongoose = require("mongoose");

var clientSchema = new mongoose.Schema({
    name : { type : String, require : true},
    email : { type : String, require : false},
    phoneNumber : { type : Number, require : true},
    propertyAt : { type : String , require : true}
});


var Client = mongoose.model("Client", clientSchema);


module.exports = Client;