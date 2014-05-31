app.controller("loginController", function ($scope, $location, $http, loginFactory) {
	$scope.login = function () {
		loginFactory.login($scope.login.username, $scope.login.password, function (data) {
			if (data == "true") {
				alert("Login successful.");
			} else {
				alert("Credentials are not correct.");
			}
		}, function () {
			alert("A server error occured.");
		})
	};
});