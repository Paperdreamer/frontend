app.controller("registrationController", function ($scope, $location, $http) {
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
			if (status == 412) {
				alert("Username or E-Mail already taken.");
			} else {
				alert("Server error occured with status code: " + status + " and reponse: " + data);
			}
		});	
	};
});;