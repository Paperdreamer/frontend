app.controller("loginController", function ($scope, $location, $rootScope, userFactory, notificationFactory, hashService) {
	// If user is already logged in, redirect to the dashboard
	userFactory.update(function (data, status) {
			if (status != undefined) {
				notificationFactory.error({title: "Error:", content: "A server error occured. Status code: " + status});
				$rootScope.updateHeader();
			} else if (data["ID"] != undefined) {
				$location.path("/dashboard");
				$rootScope.updateHeader();
			}
		});

	$scope.login = function () {
		var passwordHash = hashService.MD5($scope.login.password);
		userFactory.login($scope.login.username, passwordHash, function (data) {
			if (data != "false") {
				notificationFactory.success({title: "Login", content: "successful!"});
				$location.path("/dashboard");
			} else {
				notificationFactory.warning({content: "Credentials are not correct."});
			}
			$rootScope.updateHeader();
		}, function (data, status) {
			notificationFactory.error({title: "Error:", content: "A server error occured. Status code: " + status});
			$rootScope.updateHeader();
		})
	};
});