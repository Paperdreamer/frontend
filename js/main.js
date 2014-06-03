"use strict";

var app = angular.module("paperdreamer", ["ngRoute", "restangular"]);

var templatePath = "partials/",
	restAPI = "../backend/";

app.config(function ($routeProvider, RestangularProvider) {
	var templatePath = "partials/";
	RestangularProvider.setBaseUrl(restAPI);

	$routeProvider
		.when('/login', {
			templateUrl: templatePath + 'login.html',
			controller: "loginController"
		})
		.when('/registration', {
			templateUrl: templatePath + 'registration.html',
			controller: "registrationController"
		})
		.when('/userlist', {
			templateUrl: templatePath + 'userlist.html',
			controller: "userlistController"
		})
		.when('/registrationComplete', {
			templateUrl: templatePath + 'registrationComplete.html'
		})

	.otherwise({
		redirectTo: '/login'
	});
});