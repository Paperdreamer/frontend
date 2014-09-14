app.controller("profileController", function ($scope, $rootScope, $routeParams, userlistFactory, projectsFactory, userFactory, hashService) {
	var userID = $routeParams.userID;
	$rootScope.updateHeader();
	$scope.moderatorLoggedIn = false;
	$scope.currentUser = null;
	userFactory.update(function(data) {
		$scope.moderatorLoggedIn = userFactory.isModerator();
		$scope.currentUser = userFactory.getUserData();
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
	$scope.fetchProjectsOfUser = function() {
		projectsFactory.getProjectsOfUser(userID).then(function(data) {
				$scope.projectsOfUser = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchUser(200);
	$scope.fetchProjectsOfUser();
});;