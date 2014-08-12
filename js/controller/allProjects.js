app.controller("allProjectsController", function ($scope, $rootScope, projectsFactory, userFactory) {
	$rootScope.updateHeader();
	$scope.moderatorLoggedIn = false;
	userFactory.update(function(data) {
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	$scope.fetchAllProjects = function() {
		projectsFactory.getAllProjects().then(function(data) {
				$scope.allProjects = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.closeProject = function(projectID) {
		projectsFactory.closeProject(projectID);
		$scope.fetchAllProjects();
	};
	$scope.openProject = function(projectID) {
		projectsFactory.openProject(projectID);
		$scope.fetchAllProjects();
	};
	$scope.deleteProject = function(projectID) {
		projectsFactory.deleteProject(projectID);
		$scope.fetchAllProjects();
	};
	$scope.fetchAllProjects();
});;