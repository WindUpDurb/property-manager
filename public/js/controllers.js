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

app.controller("newPropertyController", function ($scope, $state, PropertyServices) {
    console.log("new Property");

     $scope.addNewProperty = function (propertyData) {
        PropertyServices.addNewProperty(propertyData)
            .then(function (response) {
                alert("Property Has Been Add, You Baller.");
                $scope.newProperty = null;
                $state.go("properties");

            })
            .catch(function (error) {
                console.log("Error: ", error);
            })

    };
    
});


app.controller("editPropertyController", function ($scope, $state, $stateParams, PropertyServices) {
    console.log("Edit Client Controller");

    PropertyServices.getIndividualProperty($stateParams.propertyID)
        .then(function (response) {
            console.log(response.data);
            $scope.property = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.savePropertyEdits = function (propertyEdits) {
        PropertyServices.editProperty(propertyEdits)
            .then(function (response) {
                alert("Property Has Been Updated");
                $state.go("properties")
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

app.controller("newClientController", function ($scope, $state, ClientServices) {
    console.log("New Client Controller");

    $scope.addNewClient = function (clientData) {
        console.log(clientData)
        ClientServices.addNewClient(clientData)
            .then(function (response) {
                alert("New Client Has Been Added, You Baller.");
                $scope.newClient = null;
                $state.go("clients")
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })

    };

});


app.controller("editClientController", function ($scope, $state, $stateParams, ClientServices) {
    console.log("Edit Client Controller");

    ClientServices.getIndividualClient($stateParams.clientID)
        .then(function (response) {
            console.log(response.data);
            $scope.client = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    
    $scope.saveClientEdits = function (clientEdits) {
     ClientServices.editClient(clientEdits)
          .then(function (response) {
              alert("Client Has Been Updated");
              $state.go("clients")
          })
         .catch(function (error) {
             console.log("Error: ", error);
         })
    };
    
})