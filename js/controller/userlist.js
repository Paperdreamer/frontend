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
	$scope.fetchUserlists();
	$scope.fetchAdministratorStatus();
});;
//TODO: Put this into a factory