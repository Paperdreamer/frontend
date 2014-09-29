app.directive("assetmanager", function(settingsFactory, projectFactory, notificationFactory, $routeParams) {
	return {
		restrict: "E",
		templateUrl: settingsFactory.templatePath + 'assetmanager.html',
		replace: true,

		link: function (scope, element, attributes) {
			scope.element = element;
			jQuery.noConflict();
			$(element).modal('hide');
		},

		controller: function ($scope, assetFactory) {
			$scope.start = function () {
				$scope.chosenTag = false;

				assetFactory.getTags().then(function (data) {
					$scope.assignTags(data);
					$scope.showAll();
				});
			};

			$scope.assignTags = function (tags) {
				$scope.tags = tags;
			};

			$scope.showTag = function (tag) {
				$scope.chosenTag = tag;
				$scope.prepareAssets(tag.Assets);
			};

			$scope.showAll = function () {
				var assets = [];
				
				_.each($scope.tags, function (tag) {
					assets = _.extend(assets, tag.Assets);
				});

				$scope.prepareAssets(assets);
				$scope.chosenTag = false;
			};


			$scope.prepareAssets = function (assets) {
				$scope.assets = [];
				var count = 0,
					row = 0;

				_.each(assets, function (asset) {
					if (!$scope.assets[row]) {
						$scope.assets[row] = [];
					}

					$scope.assets[row][count] = asset;
					count++;

					if (count == 3) {
						count = 0;
						row++;
					}
				});
			};


			$scope.assignAsset = function (asset, Filename) {
				$scope.canvas.addImage("../backend/assets/" + Filename, {asset: asset});
				$($scope.element).modal('hide');
			};

			$scope.createNewTag = function (tagName) {
				assetFactory.createTag($scope.tags, tagName).then(function () {
					$scope.start();
				});
			};


			$scope.onFileSelect = function ($files) {
				$scope.file = $files;
				$scope.chosenFiles = $files;
			};

			$scope.startUpload = function () {
				_.each($scope.chosenFiles, function (file) {
					assetFactory.uploadAsset($scope.chosenTag.ID, $scope.assetName, file);
				});
			};

			$scope.start();
		}
	};
});