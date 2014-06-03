 app.factory("userlistFactory", function (Restangular, $http, notificationFactory) {
	var object = {};
	var activeUsers = Restangular.all('activeUsers');
	var suspendedUsers = Restangular.all('suspendedUsers');
	object.getActiveUsers = function() {
		return activeUsers.getList();
	};
	object.getSuspendedUsers = function() {
		return suspendedUsers.getList();
	};
	object.activateUser = function(username) {
		console.log("Activate", username);
		var usernameData = { Username: username };
		$http.post(restAPI + "activateUser", usernameData).success(function (data) {
			console.log("ActivateUser Rückgabe", data);
		}).error(function (data, status) {
			if (status == 401) {
				notificationFactory.error({content: "You are not logged in as administrator."});
			} else {
				notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
			}
		});
	};
	object.isAdministratorLoggedIn = function(successCallback, errorCallback) {
		$http({method: 'GET', url: restAPI + 'isAdministratorLoggedIn'
			}).success(successCallback).error(errorCallback);
	};
	return object;
});;