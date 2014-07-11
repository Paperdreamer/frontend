app.controller("dashboardController", function ($scope, $rootScope, dashboardFactory) {
	$rootScope.updateHeader();
	$scope.fetchBelongedProjects = function() {
		dashboardFactory.getBelongedProjects().then(function(data) {
			$scope.belongedProjects = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchBelongedProjects();
});