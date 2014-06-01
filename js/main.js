"use strict";

var app = angular.module("paperdreamer", ["ngRoute", "restangular"]);

var templatePath = "partials/",
	restAPI = "../backend/";

app.config(function ($routeProvider) {
	var templatePath = "partials/";

	$routeProvider
		.when('/login', {
			templateUrl: templatePath + 'login.html',
			controller: "loginController"
		})

	.otherwise({
		redirectTo: '/login'
	});
});