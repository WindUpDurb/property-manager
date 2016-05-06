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
         var dataToSend = angular.copy(propertyData);
         var maxTenants = [];
         for (var i = 0; i < propertyData.maxTenants; i++) {
             maxTenants.push(`tenant${i}`);
         }
         dataToSend.maxTenants = maxTenants;

        PropertyServices.addNewProperty(dataToSend)
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
            response.data.maxTenants = response.data.maxTenants.length;
            $scope.property = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.savePropertyEdits = function (propertyEdits) {
        var dataToSend = angular.copy(propertyEdits);
        var maxTenants = [];
        for (var i = 0; i < propertyEdits.maxTenants; i++) {
            maxTenants.push(`tenant${i}`);
        }
        dataToSend.maxTenants = maxTenants;
        PropertyServices.editProperty(dataToSend)
            .then(function (response) {
                alert("Property Has Been Updated");
                $state.go("properties")
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };

});

app.controller("propertyManagementController", function ($scope, $state, PropertyServices) {
   console.log("Property Management Controller");

    PropertyServices.getIndividualProperty($state.params.propertyID)
        .then(function (response) {
            $scope.property = response.data;
            console.log("Property data: ", $scope.property)
            return PropertyServices.getPotentialClients($state.params.propertyID)
        })
        .then(function (response) {
            $scope.potentialClientsList = response.data;
            console.log($scope.potentialClientsList)
        })
        .catch(function (error) {
            console.log("Error: ", error);
        });

    $scope.clientMoveIn = function (clientID) {
        PropertyServices.moveInClient($state.params.propertyID, clientID)
            .then(function (response) {
                alert("Money in the Bank! $$$$");
            })
            .catch(function (error) {
                console.log("Error: ", error);
            })
    };
    
    $scope.evictTenant = function(tenant) {
        PropertyServices.tenantEviction($state.params.propertyID, tenant._id)
            .then(function (response) {
                console.log(response.body)
                alert("Received")
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
        console.log(clientData);
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
    
});


app.controller("overviewController", function ($scope, ClientServices, PropertyServices) {
   console.log("Overview Controller");
    PropertyServices.getPropertyList()
        .then(function (response) {
            $scope.listOfProperties = response.data;
        })
        .catch(function (error) {
            console.log("Error: ", error);
        })
    
    
});







