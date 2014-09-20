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
			// TODO Implementation
			$scope.oldZoom = $scope.canvas.scale;
			$scope.canvas.resetZoom();
			var objects = $scope.canvas.canvas._objects,
				newAssets = [];

			_.each(objects, function (object) {
				var objectData = {
					ID: object.dbProperties.AssetToCanvasID,
					top: object.top,
					left: object.left,
					flipX: object.flipX,
					flipY: object.flipY,
					scaleX: object.scaleX,
					scaleY: object.scaleY,
					angle: object.angle,
					Index: object.index
				};

				newAssets.push(objectData);
			});

			$scope.canvasData.Assets = newAssets;

			projectFactory.saveCanvas($routeParams.projectID, $routeParams.canvasID, $scope.canvasData, function () {
				notificationFactory.success("Canvas saved successfully");
				$scope.canvas.zoom($scope.oldZoom);
			}, function (data, status) {
				notificationFactory.error("An error occured contacting the server. Error Code: " + status);
			});

			$scope.changeState = false;
		};

		$scope.navigateBack = function () {
			window.history.back();
		};


});