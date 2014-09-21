app.controller("editProfileController", function ($scope, $rootScope, $routeParams, userlistFactory, userFactory, notificationFactory, hashService, $route) {
	var userID = $routeParams.userID;
	$rootScope.updateHeader();
	$scope.administratorLoggedIn = false;
	$scope.moderatorLoggedIn = false;
	$scope.readOnly = {username: true, fullName: true, email: true, gravatar: true, role: true};
	$scope.changeVer = {username: true, fullName: true, email: true, gravatar: true, role: true, password: true};
	$scope.passChangeable = false;
	userFactory.update(function(data) {
		$scope.administratorLoggedIn = userFactory.isAdmin();
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	$scope.fetchUser = function(size) {
		userlistFactory.getUser(userID).then(function(data) {
			$scope.user = data;
			$scope.gravatar = "http://www.gravatar.com/avatar/" + hashService.MD5($scope.user.GravatarEmail) + ".jpg?s=" + size;
			if($scope.user.isAdmin == "1") {
				if($scope.user.isDeleteable == "0") {
					$scope.role = "Administrator";
				} else {
					$scope.role = "Moderator";
				}
			} else {
				$scope.role = "User";
			}
		}, function(error) {
			$scope.error = error;
		});
	};
	$scope.togglePassword = function() {
		$scope.passChangeable = !$scope.passChangeable;
	};
	$scope.toggleButton = function(type) {
		$scope.readOnly[type] = !$scope.readOnly[type];
		$scope.changeVer[type] = !$scope.changeVer[type];
	};
	$scope.updateUser = function(userID, action, newValue) {
		if(action == 'Password') {
			if($scope.user.PasswordHash == hashService.MD5($scope.currentPassword)) {
				if($scope.newPassword == $scope.newPassword2) {
					userlistFactory.updateUser(userID, action, hashService.MD5(newValue));
					$scope.passChangeable = true;
				} else {
					notificationFactory.warning({content: "Entered passwords don't match!"});
				}
			} else {
				notificationFactory.warning({content: "Password not correct!"});
			}
		} else {
			userlistFactory.updateUser(userID, action, newValue);
		}
		$route.reload();
	};
	$scope.getRoleFromUser = function(user) {
		if (user.isAdmin == 1) {
			if (user.isDeleteable == 1) {
				return "Moderator";
			} else {
				return "Administrator";
			}
		}
		return "User";
	};
	$scope.getDropdownForUser = function(user) {
		if (user.isAdmin == 1 && user.isDeleteable == 0) {
			return ["Administrator"];
		}
		if ($scope.administratorLoggedIn)
			return ["Administrator", "Moderator", "User"];
		if ($scope.moderatorLoggedIn) {
			if(user.isAdmin == 1 && user.isDeleteable == 1) {
				return ["Moderator"];
			} else {
				return ["Moderator", "User"];
			}
		}
		return ["User"];	
	};
	$scope.changeRole = function(userID, textRole) {
		var role = 0;
		if (textRole == "Administrator")
			role = 2;
		else if (textRole == "Moderator")
			role = 1;
		userlistFactory.updateUser(userID, "Role", role);
		$scope.fetchUser(200);
		$route.reload();
	};
	$scope.fetchUser(200);
});;