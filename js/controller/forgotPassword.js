app.controller("forgotPasswordController", function ($scope, notificationFactory, userlistFactory, $location) {
	$scope.send = function() {
		userlistFactory.getActiveUsers().then(function(data) {
			var allUsers = data;
			$scope.user = _.filter(allUsers, function(param) {return param["Name"] == $scope.renewal.username});
			if(_.isEmpty($scope.user)) {
				notificationFactory.error({content: "Invalid Username!"});
			} else if ($scope.user[0]["Email"] != $scope.renewal.email) {
				notificationFactory.warning({content: "This Username - Email pair doesn't exist!"});
			} else {
				userlistFactory.sendRandomPassword($scope.user[0]);
				notificationFactory.success({content: "New password sent!"});
				$location.path("/login");
			}
		}, 
		function(error) {
			$scope.error = error;
		});
	};
});