app.controller("userlistController", function ($scope, userlistFactory, userFactory) {
	$scope.selected = 1;
	$scope.administratorLoggedIn = false;
	userFactory.update(function (data) {
		$scope.administratorLoggedIn = userFactory.isAdmin();
	});
	
	$scope.changeRole = function(userID, role){
		userlistFactory.changeRole(userID, role);
	};

	$scope.activateUser = function(username) {
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
	$scope.getRoleFromUser = function(user) {
		if (user.Admin == 1) {
			if (user.Deleteable == 1) {
				return "Moderator";
			} else {
				return "Administrator";
			}
		}
		return "User";
	};
	$scope.fetchUserlists();
});;
