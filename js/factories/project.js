app.factory('projectFactory', function ($http, settingsFactory) {
	return {
		get: function (id, successCallback, errorCallback) {
			$http.get(settingsFactory.backendUrl + "project/" + id)
				.success(_.bind(function (data, status, headers, config) {
					this.data = data;

					successCallback(data, status, headers, config);
				}, this))
				.error(errorCallback);
		},

		getCanvas: function (projectID, canvasID, successCallback, errorCallback) {
			$http.get(settingsFactory.backendUrl + "project/" + projectID + "/canvas/" + canvasID)
				.success(_.bind(function (data, status, headers, config) {
					this.canvasData = data;
					successCallback(data, status, headers, config);
				}, this))
				.error(errorCallback);
		},

		removeCanvas: function (projectID, canvasID, successCallback, errorCallback) {
			$http.delete(settingsFactory.backendUrl + "project/" + projectID + "/canvas/" + canvasID)
				.success(_.bind(function (data, status, headers, config) {
					successCallback(data, status, headers, config);
				}, this))
				.error(errorCallback);
		},

		createCanvas: function (projectID, positionIndex, title, description, notes, successCallback, errorCallback) {
			var data = {
				ProjectID: projectID,
				PositionIndex: positionIndex,
				Title: title,
				Description: description,
				Notes: notes
			};

			$http.post(settingsFactory.backendUrl + "project/" + projectID + "/canvas", data)
				.success(successCallback)
				.error(errorCallback); 
		},

		reset: function () {
			this.data = {};
		},

		data: {}
	};
});