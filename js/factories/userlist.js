 app.factory("userlistFactory", function (Restangular, $http, settingsFactory, notificationFactory) {
	var object = {};
	var activeUsers = Restangular.all('users/active');
	var suspendedUsers = Restangular.all('users/suspended');
	object.getActiveUsers = function() {
		return activeUsers.getList();
	};
	object.getSuspendedUsers = function() {
		return suspendedUsers.getList();
	};
	object.activateUser = function(username) {
		var usernameData = { Username: username };
		$http.post(settingsFactory.backendUrl + "user/activate", usernameData).error(function (data, status) {
			if (status == 401) {
				notificationFactory.error({content: "You are not logged in as administrator."});
			} else {
				notificationFactory.error({title: "Error:", content: "Server error occurred with status code: " + status + " and reponse: " + data });
			}
		});
	};
	object.sendRandomPassword = function(user) {
		var userData = {User: user};
		$http.post(settingsFactory.backendUrl + "user/randomPass", userData).error(function (data, status) {
			notificationFactory.error({title: "Error: ", content: "An error occurred with status code: " + status + " and response: " + data});
		});
	};
	object.changeRole = function(userID, role) {
		var userData = {UserID: userID, Role: role};
		$http.put(settingsFactory.backendUrl + "user", userData).error(function(data, status) {
			notificationFactory.error({title:"Error:", content: "Server error occurred with status code:  " + status + " and response: " + data});
		});
	};
	object.getUser = function(userID) {
		var address = "user/" + userID;
		var user = Restangular.one(address);
		return user.get();
	};
	object.updateUser = function(userID, action, newValue) {
		var updateData = {UserID: userID, Action: action, NewValue: newValue};
		$http.put(settingsFactory.backendUrl + "user", updateData).error(function(data, status) {
			notificationFactory.error({title:"Error:", content: "Server error occurred with status code:  " + status + " and response: " + data});
		});
	};
	return object;
});;
