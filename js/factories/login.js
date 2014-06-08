app.factory("loginFactory", function ($location, $http, settingsFactory) {
	return {
		login: function (username, password, successCallback, errorCallback) {
			$http({method: 'GET', url: settingsFactory.backendUrl + 'login', headers: {
					username: username,
					password: password
				}
			}).
			success(successCallback).
			error(errorCallback);
		}
	};
})