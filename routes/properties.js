"use strict";

var express = require("express");
var router = express.Router();

var Property = require("../models/property");
var Client = require("../models/client");

router.route("/")
    .get(function (request, response) {
        Property.find({}, function (error, properties) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(properties);
            }
        })
    })
    .post(function (request, response) {
        var newProperty = new Property(request.body);
        console.log(request.body)
        console.log("new property ", newProperty)
        newProperty.save(function (error, savedProperty) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(savedProperty);
            }
        })
    })

router.route("/:propertyID")
    .delete(function (request, response) {
        Property.findByIdAndRemove(request.params.propertyID, function (error) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send("Property has been deleted");
            }
        })
    })
    .get(function (request, response) {
        Property.findById(request.params.propertyID, function (error, propertyData) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(propertyData);
            }
        }).populate("tenants")
    })
    .put(function (request, response) {
        console.log("edits: ", request.body)
        Property.findByIdAndUpdate(request.body._id, { $set : request.body}, {new: true}, function (error) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send("Property Updated");
            }
        })
    })

router.route("/:propertyID/clients")
    .get(function (request, response) {
        var propertyID = request.params.propertyID;
        Client
            .find({
                tenantAt : { $ne : propertyID }
            }, function (error, clientData) {
                if (error) response.status(400).send(error);
                response.send(clientData);
            })

    })

router.route("/:propertyID/moveInClient/:clientID")
    .post(function (request, response) {
        var propertyID = request.params.propertyID;
        var clientID = request.params.clientID;

        Property.moveInClient(propertyID, clientID, function (error) {
            if (error) response.status(400).send(error);
            response.status("Client Has Moved In");
        })

    })


module.exports = router;