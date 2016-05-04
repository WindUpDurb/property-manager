"use strict";

var app = angular.module("propertyManagerApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("home", {
            url : "/",
            templateUrl : "/html/home.html",
            controller : "homeController"
        })
        .state("properties", {
            url : "/properties",
            templateUrl : "/html/properties.html",
            controller : "propertiesController"
        })
        .state("addProperty", {
            url : "/addProperty",
            templateUrl : "/html/addNewProperty.html",
            controller : "newPropertyController"
        })
        .state("editProperty", {
            url : "/editProperty/:propertyID",
            templateUrl : "html/editProperty.html",
            controller : "editPropertyController"
        })
        .state("clients", {
            url : "/clients",
            templateUrl : "/html/clients.html",
            controller : "clientsController"
        })
        .state("addClient", {
            url : "/addClient",
            templateUrl : "/html/addNewClient.html",
            controller : "newClientController"
        })
        .state("editClient", {
            url : "/editClient/:clientID",
            templateUrl : "/html/editClient.html",
            controller : "editClientController"
        })


    $urlRouterProvider.otherwise("/");
});