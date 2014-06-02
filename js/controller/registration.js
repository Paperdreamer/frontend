app.controller("registrationController", function ($scope, $location, $http, notificationFactory) {
	$scope.register = function () {
		var registrationData = {
			Fullname: $scope.registration.Fullname,
			Name: $scope.registration.Name,
			Email: $scope.registration.Email,
			GravatarEmail: $scope.registration.GravatarEmail,
			Password: $scope.registration.Password
		};

		$http.post(restAPI + "user", registrationData).success(function (data) {
			console.log("Rückgabe", data);
			$location.path("/registrationComplete");
		}).error(function (data, status) {
			// TODO: Notification
			if (status == 409) {
				notificationFactory.warning({content: "Username or E-Mail already taken."});
			} else {
				notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
			}
		});	
	};
});;