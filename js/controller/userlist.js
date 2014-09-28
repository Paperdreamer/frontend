app.controller("userlistController", function ($scope, $rootScope, userlistFactory, userFactory, hashService, $route) {
	$scope.selected = 1;
	$scope.administratorLoggedIn = false;
	$scope.moderatorLoggedIn = false;

	userFactory.update(function (data) {
		$scope.administratorLoggedIn = userFactory.isAdmin();
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	
	$scope.gravatarToPP = function(grmail, size) {
		return "http://www.gravatar.com/avatar/" + hashService.MD5(grmail) + ".jpg?s=" + size;
	};
	
	$scope.changeRole = function(userID, textRole) {
		var role = 0;
		if (textRole == "Administrator")
			role = 2;
		else if (textRole == "Moderator")
			role = 1;
		userlistFactory.updateUser(userID, "Role", role);
		$route.reload();
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
		if ($scope.administratorLoggedIn) {
			return ["Administrator", "Moderator", "User"];
		}
		if ($scope.moderatorLoggedIn) {
			if(user.Admin == 1 && user.Deleteable == 1) {
				return ["Moderator"];
			} else {
				return ["Moderator", "User"];
			}
		}
		return ["User"];	
	};
	$scope.fetchUserlists();
});;
