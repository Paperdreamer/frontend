app.controller("registrationController", function ($scope, $location, notificationFactory, registrationFactory, hashService) {
	$scope.register = function () {
		var passwordHash = hashService.MD5($scope.registration.Password);
		var registrationData = {
			Fullname: $scope.registration.Fullname,
			Name: $scope.registration.Name,
			Email: $scope.registration.Email,
			GravatarEmail: $scope.registration.GravatarEmail,
			PasswordHash: passwordHash
		};

		var errorCallback = function (data, status) {
			if (status == 409) {
				notificationFactory.warning({content: data});
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
