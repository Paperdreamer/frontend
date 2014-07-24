app.controller("userlistController", function ($scope, $rootScope, userlistFactory, userFactory) {
	$scope.selected = 1;
	$scope.administratorLoggedIn = false;
	userFactory.update(function (data) {
		$scope.administratorLoggedIn = userFactory.isAdmin();
	});

	$scope.activateUser = function(username) {
		userlistFactory.activateUser(username);
		$scope.fetchUserlists();
	};
	$scope.fetchUserlists = function() {
		$rootScope.updateHeader();
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
	$scope.getRoleFromUser = function(user) {
		if (user.Admin == 1)
			return "Administrator";
		return "User";
	};
	$scope.fetchUserlists();
});;
