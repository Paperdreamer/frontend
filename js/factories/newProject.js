app.factory("newProjectFactory", function ($http, settingsFactory) {
	return {
		createProject: function (project, successCallback, errorCallback) {
			$http
				.post(settingsFactory.backendUrl + "project", project)
				.success(successCallback)
				.error(errorCallback);
		}
	}
})
