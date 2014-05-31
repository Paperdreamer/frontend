app.factory("loginFactory", function ($location, $http) {
	return {
		login: function (username, password, successCallback, errorCallback) {
			$http({method: 'GET', url: restAPI + 'login', headers: {
					username: username,
					password: password
				}
			}).
			success(successCallback).
			error(errorCallback);
		}
	};
})