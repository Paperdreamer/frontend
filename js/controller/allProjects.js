app.controller("allProjectsController", function ($scope, $rootScope, projectsFactory, userFactory, $location) {
	$rootScope.updateHeader();
	$scope.moderatorLoggedIn = false;
	userFactory.update(function(data) {
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	$scope.fetchAllProjects = function() {
		projectsFactory.getAllProjects().then(function(data) {
				$scope.allProjects = data;
				projectsFactory.getBelongedProjects().then(function(dat) {
					var belongedProjects = dat;
					var i, j;
					for(i = 0; i < $scope.allProjects.length; i++) {
						for(j = 0; j < belongedProjects.length; j++) {
							if($scope.allProjects[i]["ID"] == belongedProjects[j]["ID"]) {
								$scope.allProjects[i] = _.extend({Role: belongedProjects[j]["Role"]}, $scope.allProjects[i]);
							}
						}
					}
				}, function(error) {
					$scope.error = error;
				});
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.closeProject = function(projectID) {
		event.stopPropagation();
		projectsFactory.closeProject(projectID);
		$scope.fetchAllProjects();
	};
	$scope.openProject = function(projectID) {
		event.stopPropagation();
		projectsFactory.openProject(projectID);
		$scope.fetchAllProjects();
	};
	$scope.deleteProject = function(projectID) {
		event.stopPropagation();
		projectsFactory.deleteProject(projectID);
		$scope.fetchAllProjects();
	};
	$scope.projectClick = function(project) {
		$location.path("/project/" + project.ID);
	};
	$scope.fetchAllProjects();
});;