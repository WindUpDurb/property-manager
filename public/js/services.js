"use strict";

var app = angular.module("propertyManagerApp");

app.service("PropertyServices", function ($http) {

    this.getPropertyList = function () {
        return $http.get("/api/properties")
    };

    this.getIndividualProperty = function (propertyID) {
        return $http.get(`/api/properties/${propertyID}`)
    };

    this.addNewProperty = function (propertyToAdd) {
      return $http({
          method: "POST",
          data : propertyToAdd,
          url : "/api/properties"
      })
    };

    this.removeProperty = function (propertyToRemove) {
      return $http({
          method : "DELETE",
          data : propertyToRemove,
          url : `/api/properties/${propertyToRemove}`
      })
    };

    this.editProperty = function (propertyEdits) {
        return $http({
            method : "PUT",
            data : propertyEdits,
            url : `/api/properties/${propertyEdits._id}`
        })
    };

    this.getPotentialClients = function (propertyID) {
      return $http.get(`/api/properties/${propertyID}/clients`)
    };

});


app.service("ClientServices", function ($http) {

    this.getClientList = function () {
        return $http.get("/api/clients")
    };

    this.getIndividualClient = function (clientID) {
        return $http.get(`/api/clients/${clientID}`)
    };

    this.addNewClient = function (clientToAdd) {
        return $http({
            method: "POST",
            data : clientToAdd,
            url : "/api/clients"
        })
    };

    this.removeClient = function (clientToRemove) {
        return $http({
            method : "DELETE",
            data : clientToRemove,
            url : `/api/clients/${clientToRemove}`
        })
    };

    this.editClient = function (clientEdits) {
      return $http({
          method : "PUT",
          data : clientEdits,
          url : `/api/clients/${clientEdits._id}`
      })
    };

});