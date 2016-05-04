"use strict";

var express = require("express");
var router = express.Router();

var Client = require("../models/client");

router.route("/")
    .get(function (request, response) {
        Client.find({}, function (error, clients) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(clients);
            }
        })
    })
    .post(function (request, response) {
        var newClient = new Client(request.body);

        newClient.save(function (error, savedClient) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(savedClient);
            }
        })

    })

router.route("/:clientID")
    .delete(function (request, response) {
        Client.findByIdAndRemove(request.params.clientID, function (error) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send("Client has been deleted");
            }
        })
    })
    .get(function (request, response) {
        Client.findById(request.params.clientID, function (error, clientData) {
            if (error) {
                response.status(400).send(error);
            } else {
                response.send(clientData);
            }
        })
    })
    .put(function (request, response) {
       Client.findByIdAndUpdate(request.body._id, { $set : request.body}, {new: true}, function (error) {
           if (error) {
               response.status(400).send(error);
           } else {
               response.send("Client Updated");
           }
       })
    })

module.exports = router;