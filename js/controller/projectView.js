app.controller("projectViewController", function ($scope, $rootScope, $routeParams, projectFactory, notificationFactory) {
	// If this is true, the order was changed -> enable the save button.
	$scope.changeState = false;

	$scope.removeCanvas = function (canvasID) {
		var projectID = $routeParams.projectID,

		successCallback = function (data) {
			// Remove the panel / canvas from the list
			$scope.canvasList = _.filter($scope.canvasList, function (item) {
				return item.ID != canvasID;
			});
		},

		errorCallback = function () {
			notificationFactory.error("The chosen canvas could not be deleted due to server issues.");
		};

		projectFactory.removeCanvas(projectID, canvasID, successCallback, errorCallback);
	};

	$scope.createCanvas = function (Title, Description, Notes) {
		projectFactory.createCanvas($scope.projectInfo.ID, $scope.canvasList.length+1, Title, Description, Notes, function () {
			$scope.getList();
		}, function (data, status) {
			notificationFactory.error("Server returned error code: " + status + ".");
		});
	};

	$scope.saveChanges = function () {
		// TODO Implementation
		$scope.changeState = false;
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
							}).index = index;
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


});