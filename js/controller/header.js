app.controller("headerController", function ($scope, $rootScope, $location, userFactory, notificationFactory, hashService) {
	// If user is already logged in, redirect to the dashboard
	$scope.userdata = null;
	$scope.currentPage = $location.path();
	
	$scope.update = function() {
		$scope.currentPage = $location.path();
		userFactory.update(function(data) {
			if (data != undefined && data["Name"] != undefined) {
				$scope.userdata = {
					Username		: data["Name"],
					Fullname		: data["Fullname"],
					ID				: data["ID"], 
					GravatarEmail	: data["GravatarEmail"]
				};
			} else {
				$scope.userdata = null;
			}
		});
	};
	
	
	$scope.logout = function() {
		userFactory.logout(function() {
			$scope.userdata = null;
		}, function(data, status) {
			notificationFactory.error("Server error: " + status + ". Response: " + data);
		})
	};
	
	$scope.gravatarToPP = function(grmail, size) {
		var input = "";
		if(grmail) {
			input = grmail;
		}
		return "http://www.gravatar.com/avatar/" + hashService.MD5(input) + ".jpg?s=" + size;
	};
	
	$rootScope.updateHeader = function() {
		$scope.update();
	};
	
	$scope.update();
});
