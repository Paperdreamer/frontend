app.controller("canvasEditController", function ($scope, $rootScope, $routeParams, projectFactory, notificationFactory, $route) {

	var projectInfo;

	// If this is true, the order was changed -> enable the save button.
	$scope.changeState = false;
	$scope.ready = false;


	$scope.start = function () {
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
	};

	$scope.start();

		$scope.saveChanges = function () {
			$scope.oldZoom = $scope.canvas.scale;
			$scope.canvas.resetZoom();

			var objects = $scope.canvas.canvas._objects,
				newAssets = [];

			_.each(objects, function (object, index) {
				var asset = _.findWhere($scope.canvasData.Assets, {ID: object.dbProperties.AssetToCanvasID});

				var objectData = {
					ID: object.dbProperties.AssetToCanvasID,
					top: object.top,
					left: object.left,
					flipX: object.flipX,
					flipY: object.flipY,
					scaleX: object.scaleX,
					scaleY: object.scaleY,
					angle: object.angle,
					Index: index
				};

				if (object.dbProperties.asset) {
					_.extend(objectData, object.dbProperties.asset);
					objectData.ID = null;
					objectData.AssetID = object.dbProperties.asset.ID;
				}

				if (asset) {
					_.extend(asset, objectData);	
				} else {
					$scope.canvasData.Assets.push(objectData);
				}
				
			});

			projectFactory.saveCanvas($routeParams.projectID, $routeParams.canvasID, $scope.canvasData, function () {
				notificationFactory.success("Canvas saved successfully");
				$scope.canvas.zoom($scope.oldZoom);
			}, function (data, status) {
				notificationFactory.error("An error occured contacting the server. Error Code: " + status);
			});

			$scope.changeState = false;
		};

		$scope.removeAsset = function (asset) {
			
			projectFactory.removeAssetFromCanvas($routeParams.projectID, $routeParams.canvasID, asset.ID, function () {
				$scope.canvas.removeImage(asset.canvasInfo.object);

				$scope.canvasData.Assets = _.without($scope.canvasData.Assets, asset);
			}, function (data, status) {
				notificationFactory.error("An error occured contactig the server.");
			});

		};

		$scope.navigateBack = function () {
			window.history.back();
		};

		$( "table.indexOrder tbody" ).sortable({
			helper: function( event, ui ) {
				// TODO: Here we can fix the width problem LATER
				return ui;
			},
			stop: function(event, ui) {
				$scope.canvas.changeIndex($(ui.item).data("id"), ui.item.index());
			}
		}).disableSelection();


});