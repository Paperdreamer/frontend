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
		.when('/registration', {
			templateUrl: templatePath + 'registration.html',
			controller: "registrationController"
		})
		.when('/registrationComplete', {
			templateUrl: templatePath + 'registrationComplete.html'
		})
		.when('/dashboard', {
			templateUrl: templatePath + 'dashboard.html'
		})

	.otherwise({
		redirectTo: '/login'
	});
});