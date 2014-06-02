app.controller("loginController", function ($scope, $location, $http, loginFactory, notificationFactory) {
	$scope.login = function () {
		loginFactory.login($scope.login.username, $scope.login.password, function (data) {
			if (data == "true") {
				notificationFactory.success({title: "Login", content: "successful!"});
			} else {
				notificationFactory.warning({content: "Credentials are not correct."});
			}
		}, function (data, status) {
			notificationFactory.error({title: "Error:", content: "A server error occured. Status code: " + status});
		})
	};
});