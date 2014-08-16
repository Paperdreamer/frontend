app.controller("projectViewController", function ($scope, $rootScope, $routeParams, projectFactory, notificationFactory) {

	$scope.projectInfo = projectInfo;

	// If this is true, the order was changed -> enable the save button.
	$scope.changeState = false;


	projectFactory.get(
		$routeParams.projectID,
		// success callback
		function (data) {
			var canvasList = data.Panels;

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

		
		$scope.saveChanges = function () {
			// TODO Implementation
			$scope.changeState = false;
		};


});