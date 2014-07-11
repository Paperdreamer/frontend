 app.factory("allProjectsFactory", function (Restangular) {
	var object = {};
	var allProjects = Restangular.all('projects');
	object.getAllProjects = function() {
		return allProjects.getList();
	};
	return object;
});;