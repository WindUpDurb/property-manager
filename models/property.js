"use strict";

var mongoose = require("mongoose");
var Client = require("./client");

var propertySchema = new mongoose.Schema({
    propertyAddress : { type : String, require : true},
    rent : { type: Number, require : false},
    utilities : { type : Number, require : false},
    bedrooms : { type : Number, require : true},
    bathrooms : { type : Number, require : true},
    maxTenants : [{ type: String, require : true }],
    tenants : [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }]
});

propertySchema.statics.evictTenant = function (propertyID, clientID, callback) {

    Property.findById(propertyID, function (error1, propertyData) {
        Client.findById(clientID, function (error2, clientData) {
            if (error1 || error2) return callback(error1 || error2);

            console.log("Client Data",  clientData);
            console.log("Property Data",  propertyData)

            propertyData.tenants = propertyData.tenants.filter(function (tenants) {
             return tenants.toString() !== clientData._id.toString();
             });

            clientData.tenantAt = null;

            console.log("Client Data After", clientData);
            console.log("Property Data After", propertyData)

            clientData.save(function (error1) {
                propertyData.save(function (error2) {
                    callback(error1 || error2);
                });
            });
        });
    });

};

propertySchema.statics.moveInClient = function (propertyID, clientID, callback) {

    Property.findById(propertyID, function (error1, propertyData) {
        Client.findById(clientID, function (error2, clientData) {
            if (error1 || error2) return callback(error1 || error2);

            propertyData.tenants.push(clientData._id);
            clientData.tenantAt = propertyData._id;

            propertyData.save(function (error1) {
                clientData.save(function (error2) {
                    callback(error1 || error2);
                });
            });
        });
    });
};


var Property = mongoose.model("Property", propertySchema);

module.exports = Property;
