app.controller("projectViewController", function ($scope, $rootScope, $routeParams, $route, projectFactory, notificationFactory, userFactory, userlistFactory) {
	// If this is true, the order was changed -> enable the save button.
	$scope.changeState = false;
	
	userlistFactory.getActiveUsers().then(function(data) {
			$scope.allUsers = [];
			angular.forEach(data, function(item){
				$scope.allUsers.push(item.Name);
			});
		}, function(error) {
			$scope.error = error;
		});

	$scope.removeCanvas = function (canvasID) {
		var projectID = $routeParams.projectID,

		successCallback = function (data) {
			// Remove the panel / canvas from the list
			$scope.canvasList = _.filter($scope.canvasList, function (item) {
				return item.ID != canvasID;
			});
		},
		// error callback
		function (data, status) {
			notificationFactory.error({
				title: "An error occured contacting the Server, code " + status,
				content: data
			});
		});
	
	projectFactory.getUsers(
		$routeParams.projectID,
		// success callback
		function (data) {
			$scope.users = data;
			$scope.artists = new Array();
			$scope.supervisors = new Array();
			$scope.users.forEach(function(element) {
				if (element.Role == "Supervisor")
					$scope.supervisors.push({Name: element.Name});
				else if (element.Role == "Artist")
					$scope.artists.push({Name: element.Name});
				else if (element.Role == "Director")
					$scope.director = element.Name;
			});
		},
		// error callback
		function (data, status) {
			notificationFactory.error({
				title: "An error occured contacting the Server, code " + status,
				content: data
			});
		});
	
	
	userFactory.update(function (data) {
		$scope.moderatorLoggedIn = userFactory.isModerator() || Director.UserID == data["ID"];
	});

		
	$scope.saveChanges = function () {
		$scope.changeState = false;
		$scope.editusers = false;
		$scope.editname = false;
		$scope.editdescription = false;
		
		var updatedProject = { 	Name: $scope.projectInfo.Name, 
				Description: $scope.projectInfo.Description, 
				Director: $scope.director, 
				supervisors: $scope.supervisors,
				artists: $scope.artists
		};		
		var errorCallback = function (data, status) {
			notificationFactory.error({title: "Error:", content: "Server error occured with status code: " + status + " and reponse: " + data });
		};

		var successCallback = function (data) {
			$route.reload();
		};
		projectFactory.updateProject($scope.projectInfo.ID, updatedProject, successCallback, errorCallback);
	};
	
	
	$scope.isUsername = function(name) {
		if ($scope.users == undefined)
			return false;
		var filtered  = $scope.allUsers.filter(function(element, index, array) {
				return element == name;
			}
		);
		return (typeof filtered !== 'undefined' && filtered.length > 0);
	};

	$scope.createCanvas = function (Title, Description, Notes) {
		projectFactory.createCanvas($scope.projectInfo.ID, $scope.canvasList.length+1, Title, Description, Notes, function () {
			$scope.getList();
		}, function (data, status) {
			notificationFactory.error("Server returned error code: " + status + ".");
		});
	};

	$scope.getList = function () {
		projectFactory.get(
			$routeParams.projectID,
			// success callback
			function (data) {
				var canvasList = data.Panels;
				$scope.projectInfo = data;

				// Sort the canvasList first by the position indices.
				canvasList = _.sortBy(canvasList, function (item) {
					return item.PositionIndex;
				});

				$scope.canvasList = canvasList;

				$( ".canvasPanels" ).sortable({
					items: ".canvas",
					handle: "div.panel-heading",
					stop: function( event, ui ) {
						// If dragging has finished, iterate over all canvas panels and update the indeces in the canvasList.
						$(event.target).children().each(function (index, element) {
							// Update position indeces
							_.find(canvasList, function (item) {
								return item.ID == $(element).data("id");
							}).PositionIndex = index;
						});

						$scope.changeState = true;
						$scope.$apply();
					}
				});
			},
			// error callback
			function (data, status) {
				notificationFactory.error({
					title: "An error occured contacting the Server, code " + status,
					content: data
				});
			});
	};

	$scope.getList();

	$scope.addSupervisor = function() {
		$scope.supervisors.push({Name: ""});
		$scope.changeState = true;
	};
	$scope.removeSupervisor = function(supervisor) {
		$scope.supervisors.splice($scope.supervisors.indexOf(supervisor), 1);
		$scope.changeState = true;
	};
	$scope.addArtist = function() {
		$scope.artists.push({Name: ""});
		$scope.changeState = true;
	};
	$scope.removeArtist = function(artist) {
		$scope.artists.splice($scope.artists.indexOf(artist), 1);
		$scope.changeState = true;
	};
});