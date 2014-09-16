app.controller("editProfileController", function ($scope, $rootScope, $routeParams, userlistFactory, userFactory, notificationFactory, hashService) {
	var userID = $routeParams.userID;
	$rootScope.updateHeader();
	$scope.moderatorLoggedIn = false;
	$scope.readOnly = {username: true, fullName: true, email: true, gravatar: true, role: true};
	$scope.changeVer = {username: true, fullName: true, email: true, gravatar: true, role: true, password: true};
	$scope.passChangeable = false;
	userFactory.update(function(data) {
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
		$scope.fetchUser(200);
	};
	$scope.fetchUser(200);
});;