 app.factory("projectsFactory", function (Restangular, $http, settingsFactory, notificationFactory) {
	var object = {};
	var belongedProjects = Restangular.all('projects/belonged');
	var allProjects = Restangular.all('projects');
	object.getBelongedProjects = function() {
		return belongedProjects.getList();
	};
	object.getAllProjects = function() {
		return allProjects.getList();
	};
	object.closeProject = function(projectID) {
		var projectData = {ProjectID: projectID, Action: "close"};
		$http.put(settingsFactory.backendUrl + "project", projectData).error(function(data, status) {
			if (status > 0)
				notificationFactory.error({title:"Error:", content: "Server error occurred with status code:  " + status + " and response: " + data});
		});
	};
	object.openProject = function(projectID) {
		var projectData = {ProjectID: projectID, Action: "open"};
		$http.put(settingsFactory.backendUrl + "project", projectData).error(function(data, status) {
			if (status > 0)
				notificationFactory.error({title:"Error:", content: "Server error occurred with status code:  " + status + " and response: " + data});
		});
	};
	object.deleteProject = function(projectID) {
		$http.delete(settingsFactory.backendUrl + "project/" + projectID).error(function(data, status) {
			if (status > 0)
				notificationFactory.error({title:"Error:", content: "Server error occurred with status code:  " + status + " and response: " + data});
		});
	};
	return object;
});;