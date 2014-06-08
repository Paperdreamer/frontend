app.controller("loginController", function ($scope, $location, userFactory, notificationFactory) {
	// If user is already logged in, redirect to the dashboard
	userFactory.update(function (data) {
		if (data != "false") {
			$location.path("/dashboard");
		}
	});

	$scope.login = function () {
		userFactory.login($scope.login.username, $scope.login.password, function (data) {
			if (data != "false") {
				notificationFactory.success({title: "Login", content: "successful!"});
				$location.path("/dashboard");
			} else {
				notificationFactory.warning({content: "Credentials are not correct."});
			}
		}, function (data, status) {
			notificationFactory.error({title: "Error:", content: "A server error occured. Status code: " + status});
		})
	};
});