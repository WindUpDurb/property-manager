"use strict";

var mongoose = require("mongoose");

var propertySchema = new mongoose.Schema({
    propertyAddress : { type : String, require : true},
    occupationStatus : { type: Boolean, require : true },
    rent : { type: Number, require : false},
    utilities : { type : Number, require : false},
    bedrooms : { type : Number, require : true},
    bathrooms : { type : Number, require : true}
});

var Property = mongoose.model("Property", propertySchema);

module.exports = Property;
