"use strict";

var app = angular.module("propertyManagerApp");

app.controller("homeController", function () {
    console.log("Home Controller");
});



app.controller("propertiesController", function ($scope, $state, PropertyServices) {
    console.log("Property Controller");

    PropertyServices.getPropertyList()
        .then(function (response) {
            console.log(response.data)
            $scope.listOfProperties = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.removeProperty = function (toDelete) {

        console.log(toDelete);
        PropertyServices.removeProperty(toDelete._id)
            .then(function (response) {
                alert("Your ballin' property has been removed");
            })
            .catch(function (error) {
               console.log("Error: ", error);
            });
    };


});

app.controller("newPropertyController", function ($scope, PropertyServices) {
    console.log("new Property");

     $scope.addNewProperty = function (propertyData) {
        PropertyServices.addNewProperty(propertyData)
            .then(function (response) {
                alert("Property Has Been Add, You Baller.");
                $scope.newProperty = null;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })

    };
    
});


app.controller("clientsController", function ($scope, $state, ClientServices) {
    console.log("Clients Controller");

    ClientServices.getClientList()
        .then(function (response) {
            console.log(response.data)
            $scope.listOfClients = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.removeClient = function (toDelete) {

        console.log(toDelete);
        ClientServices.removeClient(toDelete._id)
            .then(function (response) {
                alert("Screw that client. He has been removed");
            })
            .catch(function (error) {
                console.log("Error: ", error);
            });
    };
});

app.controller("newClientController", function ($scope, ClientServices) {
    console.log("New Client Controller");

    $scope.addNewClient = function (clientData) {
        console.log(clientData)
        ClientServices.addNewClient(clientData)
            .then(function (response) {
                alert("New Client Has Been Added, You Baller.");
                $scope.newClient = null;
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })

    };

});