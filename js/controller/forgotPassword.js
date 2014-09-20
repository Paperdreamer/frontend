app.controller("forgotPasswordController", function ($scope, notificationFactory, userlistFactory, $location) {
	//Changes the current password with a newly generated password and sends it to the user
	var sendRandomPassword = function() {
		var pass = Math.random(100, 200).toString(36).substring(7);
		userlistFactory.sendRandomPassword(pass, $scope.user[0]);
	};
	$scope.send = function() {
		userlistFactory.getActiveUsers().then(function(data) {
			var allUsers = data;
			$scope.user = _.filter(allUsers, function(param) {return param["Name"] == $scope.renewal.username});
			if(_.isEmpty($scope.user)) {
				notificationFactory.error({content: "Invalid Username!"});
			} else if ($scope.user[0]["Email"] != $scope.renewal.email) {
				notificationFactory.warning({content: "This Username - Email pair doesn't exist!"});
			} else {
				sendRandomPassword();
				notificationFactory.success({content: "New password sent!"});
				$location.path("/login");
			}
		}, 
		function(error) {
			$scope.error = error;
		});
	};
});