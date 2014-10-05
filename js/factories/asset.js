app.factory("assetFactory", function ($http, Restangular, $upload, settingsFactory) {
	return {
		getTags: function () {
			return Restangular.all("tags").getList();
		},

		createTag: function (tagsRestObject, newName) {
			return tagsRestObject.post({Name: newName});
		},

		addAssetToCanvas: function (projectID, canvasID, assetID) {
			return $http.post(settingsFactory.backendUrl + "project/" + projectID + "/canvas/" + canvasID + "/assets/" + assetID);
		},

		uploadAsset: function (tagID, name, file, success, progress) {
			return $upload.upload({
				url: settingsFactory.backendUrl + '_assets', //upload.php script, node.js route, or servlet url
				method: 'POST',
				//headers: {'header-key': 'header-value'},
				//withCredentials: true,
				data: { TagID: tagID, Name: name },
				file: file // or list of files ($files) for html5 only
				//fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
				// customize file formData name ('Content-Disposition'), server side file variable name. 
				//fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
				// customize how data is added to formData. See #40#issuecomment-28612000 for sample code
				//formDataAppender: function(formData, key, val){}
			}).progress(function(evt) {
				if (_.isFunction(progress)) {
					// Call progress function and hand over the percantage.
					progress(parseInt(100.0 * evt.loaded / evt.total));
				}
			}).success(function(data, status, headers, config) {
				if (_.isFunction(success)) {
					success(data, status, headers, config);
				}
			});
		}
	}
});
