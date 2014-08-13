 app.controller("newProjectController", function ($scope, $location, userlistFactory, newProjectFactory, notificationFactory, userFactory) {
	$scope.project = { 	Name: "", 
						Description: "", 
						Director: "", 
						supervisors: [ {Name: ""} ],
						artists: [ {Name: ""} ]
	};
	
	$scope.moderatorLoggedIn = false;
	
	userFactory.update(function (data) {
		$scope.project.Director = data["Name"];
		$scope.moderatorLoggedIn = userFactory.isModerator();
	});
	
	$scope.fetchUserlists = function() {
		userlistFactory.getActiveUsers().then(function(data) {
				$scope.users = data;
			}, function(error) {
				$scope.error = error;
			});
	};
	$scope.fetchUserlists();
	
	$scope.isUsername = function(name) {
		if ($scope.users == undefined)
			return false;
		var filtered  = $scope.users.filter(function(element, index, array) {
				return element.Name == name;
			}
		);
		return (typeof filtered !== 'undefined' && filtered.length > 0);
	};

	$scope.addSupervisor = function() {
		$scope.project.supervisors.push({Name: ""});
	};
	$scope.removeSupervisor = function(supervisor) {
		$scope.project.supervisors.splice($scope.project.supervisors.indexOf(supervisor), 1);
	};
	$scope.addArtist = function() {
		$scope.project.artists.push({Name: ""});
	};
	$scope.removeArtist = function(artist) {
		$scope.project.artists.splice($scope.project.artists.indexOf(artist), 1);
	};
	
	$scope.createProject = function() {
		console.log("Create Project");
		
		var errorCallback = function (data, status) {
			if (status == 409) {
				notificationFactory.warning({content: "Project name already exists."});
			} else {
				notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
			}
		};

		var successCallback = function (data) {
			$location.path("/dashboard");
		};
		
		newProjectFactory.createProject($scope.project, successCallback, errorCallback);
	};
 });
 