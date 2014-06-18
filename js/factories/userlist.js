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
		console.log("Activate", username);
		var usernameData = { Username: username };
		$http.post(settingsFactory.backendUrl + "user/activate", usernameData).success(function (data) {
			console.log("ActivateUser Rückgabe", data);
		}).error(function (data, status) {
			if (status == 401) {
				notificationFactory.error({content: "You are not logged in as administrator."});
			} else {
				notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
			}
		});
	};
	
	object.changeLevel = function(userID, level){
		console.log("Change Level", userID);
		var userData={UserID: userID, Level: level};
		$http.post(settingsFactory.backendUrl+"user/change", userData).success(function(data){
		//TODO: these error messages might not be applicable
		console.log("ChangeUser userID Rückgabe",data);
		}).error(function(data, status){
			alert("userlistFactory changeLevel error");
			notificationFactory.error({title:"Error:", content: "Server error occurred with status code:  "+status+" and response: "+data});
		});
	};
	return object;
});;
