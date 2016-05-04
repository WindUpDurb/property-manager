"use strict";

var express = require("express");
var router = express.Router();

var Property = require("../models/property");

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


module.exports = router;