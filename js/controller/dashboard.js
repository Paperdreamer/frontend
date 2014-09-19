app.controller("dashboardController", function ($scope, $rootScope, projectsFactory, userFactory, $location) {
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
	$scope.closeProject = function(event, projectID) {
		event.stopPropagation();
		projectsFactory.closeProject(projectID);
		$scope.fetchBelongedProjects();
	};
	$scope.openProject = function(event, projectID) {
		event.stopPropagation();
		projectsFactory.openProject(projectID);
		$scope.fetchBelongedProjects();
	};
	$scope.deleteProject = function(event, projectID) {
		event.stopPropagation();
		projectsFactory.deleteProject(projectID);
		$scope.fetchBelongedProjects();
	};
	$scope.projectClick = function(project) {
		$location.path("/project/" + project.ID);
	};
	$scope.fetchBelongedProjects();
});