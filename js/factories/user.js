app.factory("userFactory", function ($http, settingsFactory, notificationFactory) {
	return {
		userData: null,
		expirationCallback: null,

		login: function (nameOrMail, password, successCallback, errorCallback) {
			$http({
				method: 'GET', 
				url: settingsFactory.backendUrl + 'login', 
				headers: {
					username: nameOrMail,
					password: password
				}
			}).success(_.bind(function (data, status, headers, config) {
				if (data != "false") {
					this.userData = data;
				}

				successCallback(data, status, headers, config);
			}, this))
			.error(errorCallback);
		},
		
		logout: function(successCallback, errorCallback) {
			$http({
				method: 'GET', 
				url: settingsFactory.backendUrl + 'logout'
			}).success(successCallback)
			.error(errorCallback);
		},

		update: function (callback) {
			$http({
				method: 'GET', 
				url: settingsFactory.backendUrl + 'user'
			}).success(_.bind(function (data) {
				if (data != "false") {
					this.userData = data;
				} else {
					this.userData = null;

					if (_.isFunction(this.expirationCallback))
						expirationCallback();
				}

				callback(data);
			}, this)).error(function (data, status) {
				notificationFactory.error("Server error: " + status + ". Response: " + data);
			});
		},

		isLoggedIn: function () {
			if (_.isNull(userData)) {
				return false;
			} else {
				return true;
			}
		},

		isAdmin: function () {
			if (!_.isNull(this.userData)) {
				return this.userData.isAdmin == "1" && this.userData.isDeleteable == "0";
			}
		},
		
		isModerator: function() {
			if (!_.isNull(this.userData)) {
				return this.userData.isAdmin == "1";
			}
		}
	}
});