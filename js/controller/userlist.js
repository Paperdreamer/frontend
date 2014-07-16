app.controller("userlistController", function ($scope, $rootScope, userlistFactory, userFactory) {
	$scope.selected = 1;
	$scope.administratorLoggedIn = false;
	$scope.moderatorLoggedIn = false;
	$scope.changeToWhichRoles = null;

	userFactory.update(function (data) {
		$scope.administratorLoggedIn = userFactory.isAdmin();
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	
	$scope.changeRole = function(userID, role){
		userlistFactory.changeRole(userID, role);
	};

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
		if (user.Admin == 1) {
			if (user.Deleteable == 1) {
				return "Moderator";
			} else {
				return "Administrator";
			}
		}
		return "User";
	};
	$scope.getDropdownForUser = function(user) {
		if (user.Admin == 1 && user.Deleteable == 0) {
			return ["Administrator"];
		}
		if ($scope.administratorLoggedIn)
			return ["Administrator", "Moderator", "User"];
		if ($scope.moderatorLoggedIn)
			return ["Moderator", "User"];
		return ["User"];	
	};
	$scope.fetchUserlists();
});;
