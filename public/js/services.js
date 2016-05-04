"use strict";

var app = angular.module("propertyManagerApp");

app.service("PropertyServices", function ($http) {

    this.getPropertyList = function () {
        return $http.get("/api/properties")
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

});


app.service("ClientServices", function ($http) {

    this.getClientList = function () {
        return $http.get("/api/clients")
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

});