app.controller("userlistController", function ($scope, userlistFactory) {
	$scope.selected = 1;
	$scope.administratorLoggedIn = false;

	$scope.activateUser = function(username) {
		console.log("Activate User called", username);
		userlistFactory.activateUser(username);
		$scope.fetchUserlists();
	};
	$scope.fetchUserlists = function() {
		userlistFactory.getActiveUsers().then(function(data) {
				$scope.activeUsers = data;
			}, function(error) {
				$scope.error = error;
			});
		userlistFactory.getSuspendedUsers().then(function(data) {
				$scope.suspendedUsers = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchAdministratorStatus = function() {
		userlistFactory.isAdministratorLoggedIn(
			function(data) {
				$scope.administratorLoggedIn = data;
			}, function(data, status) {
				notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
			}
		);
	};
	$scope.getRoleFromUser = function(user) {
		if (user.Admin == 1)
			return "Administrator";
		return "User";
	};
	$scope.fetchUserlists();
	$scope.fetchAdministratorStatus();
});;
