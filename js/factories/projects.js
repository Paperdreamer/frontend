 app.factory("projectsFactory", function (Restangular) {
	var object = {};
	var belongedProjects = Restangular.all('projects/belonged');
	var allProjects = Restangular.all('projects');
	object.getBelongedProjects = function() {
		return belongedProjects.getList();
	};
	object.getAllProjects = function() {
		return allProjects.getList();
	};
	return object;
});;