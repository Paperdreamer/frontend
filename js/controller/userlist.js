app.controller("userlistController", function ($scope, userlistFactory) {
	$scope.selected = 1;
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
	$scope.fetchUserlists();
});;
//TODO: Put this into a factory