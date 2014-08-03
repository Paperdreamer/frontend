app.controller("canvasEditController", function ($scope, $rootScope, $routeParams, projectFactory, notificationFactory) {

	var projectInfo;

	// If this is true, the order was changed -> enable the save button.
	$scope.changeState = false;
	$scope.ready = false;


	projectFactory.getCanvas(
		$routeParams.projectID,
		$routeParams.canvasID,
		// success callback
		function (data) {
			$scope.canvasData = data;
			console.log("set canvas data controller");
			$scope.ready = true;
		},
		// error callback
		function (data, status) {
			notificationFactory.error({
				title: "An error occured contacting the Server, code " + status,
				content: data
			});
		});

		
		$scope.saveChanges = function () {
			$scope.changeState = false;
		};

		$scope.navigateBack = function () {
			window.history.back();
		};


});