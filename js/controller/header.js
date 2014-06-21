app.controller("headerController", function ($scope, $rootScope, $location, userFactory, notificationFactory) {
	// If user is already logged in, redirect to the dashboard
	$scope.userdata = null;
	$scope.currentPage = $location.path();
	
	$scope.update = function() {
		$scope.currentPage = $location.path();
		console.log("New current page " + $scope.currentPage);
		userFactory.update(function(data) {
			if (data != undefined && data["Name"] != undefined) {
				$scope.userdata = {
					Username: data["Name"],
					Fullname: data["Fullname"]
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
	
	$rootScope.updateHeader = function() {
		$scope.update();
	};
	
	$scope.update();
});
