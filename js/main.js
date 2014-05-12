"use strict";

var app = angular.module("storyboard", ["ngRoute"]);

var templatePath = "partials/",
	restAPI = "../backend/";

app.controller("loginController", function ($scope, $location, $http) {
	$scope.login = function () {
		console.log($scope.login.username, $scope.login.password);
		  
		$http({method: 'GET', url: restAPI + 'login', headers: {
				username: $scope.login.username,
				password: $scope.login.password
			}
		}).
			success(function(data, status, headers, config) {
				if (data == "true") {
					alert("Login erfolgreich.");
				} else {
					alert("Zugangsdaten sind nicht korrekt.");
				}
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
	};
});

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