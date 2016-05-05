"use strict";

var mongoose = require("mongoose");

var propertySchema = new mongoose.Schema({
    propertyAddress : { type : String, require : true},
    rent : { type: Number, require : false},
    utilities : { type : Number, require : false},
    bedrooms : { type : Number, require : true},
    bathrooms : { type : Number, require : true},
    maxTenants : [{ type: String, require : true }],
    tenants : [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }]
});

var Property = mongoose.model("Property", propertySchema);

module.exports = Property;
