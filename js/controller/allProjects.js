app.controller("allProjectsController", function ($scope, $rootScope, projectsFactory, userFactory) {
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
								$scope.allProjects[i]["Role"] = belongedProjects[j]["Role"];
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
	$scope.projectClick = function(project, event) {
		if(event.target.toString() == "[object HTMLButtonElement]") {
			return;
		} else {
			$location.path("/project/" + project.ID);
		}
	};
	$scope.fetchAllProjects();
});;