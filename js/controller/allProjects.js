app.controller("allProjectsController", function ($scope, allProjectsFactory) {
	$scope.fetchAllProjects = function() {
		allProjectsFactory.getAllProjects().then(function(data) {
			$scope.allProjects = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchAllProjects();
});;