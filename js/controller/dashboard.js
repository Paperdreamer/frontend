app.controller("dashboardController", function ($scope, $rootScope, projectsFactory) {
	$rootScope.updateHeader();
	$scope.fetchBelongedProjects = function() {
		projectsFactory.getBelongedProjects().then(function(data) {
				$scope.belongedProjects = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchBelongedProjects();
});