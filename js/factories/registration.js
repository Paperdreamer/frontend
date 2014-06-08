app.factory("registrationFactory", function ($http, settingsFactory) {
	return {
		register: function (registrationData, successCallback, errorCallback) {
			$http
				.post(settingsFactory.backendUrl + "user", registrationData)
				.success(successCallback)
				.error(errorCallback);
		}
	}
})