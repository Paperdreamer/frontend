app.factory("userFactory", function ($http, settingsFactory, notificationFactory, $location) {
	return {
		userData: null,
		expirationCallback: null,

		login: function (nameOrMail, passwordHash, successCallback, errorCallback) {
			$http({
				method: 'GET', 
				url: settingsFactory.backendUrl + 'login', 
				headers: {
					Username: nameOrMail,
					Passwordhash: passwordHash
				}
			}).success(_.bind(function (data, status, headers, config) {
				if (data != "false") {
					this.userData = data;
				}
				this.routeGuard();
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
				this.routeGuard();
				callback(data);
			}, this)).error(function (data, status) {
				notificationFactory.error("Server error: " + status + ". Response: " + data);
			});
		},

		routeGuard: function () {
			if (this.isLoggedIn()) {
				if ($location.path() == "/login") {
					// Redirect to dashboard. loading.hide() will be handled by route change event.
					$location.path("/dashboard");
				}
			} else {
				$location.path('login');
			}
		},

		isLoggedIn: function () {
			if (_.isNull(this.userData)) {
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
		},
		
		getUserData: function() {
			if(!_.isNull(this.userData)) {
				return this.userData;
			}
		}
	}
});