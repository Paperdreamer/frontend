app.directive("pdcanvas", function(settingsFactory, projectFactory, notificationFactory, $timeout) {
	return {
		restrict: "E",
		templateUrl: settingsFactory.templatePath + 'pdcanvas.html',
		replace: true,
		scope: {
			// Copy the canvasid attribute's value into the scope
			canvasID: "=canvasid",
			manipulation: "=manipulation",
		},

		link: function (scope, element, attributes) {
			$timeout(function () {

				var source;

				if (projectFactory.data.Panels) {
					scope.canvasData = _.find(projectFactory.data.Panels, function (item) {
						return item.ID == scope.canvasID;
					});
				} else {
					scope.canvasData = projectFactory.canvasData;
				}

				if (!scope.canvasData) {
					notificationFactory.error({
						title: "Canvas could not be created",
						content: "The canvasData variable could not be assigned."
					});
				} else {
					if (!_.isUndefined(attributes.scale)) {
						var scale = parseFloat(attributes.scale);
					} else {
						var scale = 1;
					}

					var canvas = new canvasClass({
						targetID: scope.canvasID,
						width: 330,
						height: 186,
						manipulation: scope.manipulation,
						backgroundImageURL: settingsFactory.assetPath + 'beach.jpg'
					}),
					canvasObjects = {};

					// Apply scale
					canvas.zoom(scale);

					_.each(scope.canvasData.Assets, function (item) {
						item.success = function (info) {
							canvasObjects[item.ID] = info;
						};

						canvas.addImage(settingsFactory.assetPath + item.Filename, item);
					});			
				}

			});	
		}
	};
});