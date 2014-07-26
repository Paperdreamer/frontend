app.controller("allProjectsController", function ($scope, $rootScope, projectsFactory) {
	$rootScope.updateHeader();
	$scope.fetchAllProjects = function() {
		projectsFactory.getAllProjects().then(function(data) {
				$scope.allProjects = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchAllProjects();
});;