app.controller("dashboardController", function ($scope, $rootScope, projectsFactory, userFactory) {
	$rootScope.updateHeader();
	$scope.moderatorLoggedIn = false;
	userFactory.update(function(data) {
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	$scope.fetchBelongedProjects = function() {
		projectsFactory.getBelongedProjects().then(function(data) {
				$scope.belongedProjects = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.closeProject = function(projectID) {
		projectsFactory.closeProject(projectID);
		$scope.fetchBelongedProjects();
	};
	$scope.openProject = function(projectID) {
		projectsFactory.openProject(projectID);
		$scope.fetchBelongedProjects();
	};
	$scope.deleteProject = function(projectID) {
		projectsFactory.deleteProject(projectID);
		$scope.fetchBelongedProjects();
	};
	$scope.fetchBelongedProjects();
});