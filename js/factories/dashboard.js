 app.factory("dashboardFactory", function (Restangular) {
	var object = {};
	var belongedProjects = Restangular.all('projects/belonged');
	object.getBelongedProjects = function() {
		return belongedProjects.getList();
	};
	return object;
});;