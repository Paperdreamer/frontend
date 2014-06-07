app.controller("registrationController", function ($scope, $location, notificationFactory, registrationFactory) {
	$scope.register = function () {
		var registrationData = {
			Fullname: $scope.registration.Fullname,
			Name: $scope.registration.Name,
			Email: $scope.registration.Email,
			GravatarEmail: $scope.registration.GravatarEmail,
			Password: $scope.registration.Password
		};

		var errorCallback = function (data, status) {
			if (status == 409) {
				notificationFactory.warning({content: "Username or E-Mail already taken."});
			} else {
				notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
			}
		};

		var successCallback = function (data) {
			$location.path("/registrationComplete");
		};

		registrationFactory.register(registrationData, successCallback, errorCallback);
	};
});;