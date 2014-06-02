app.factory("notificationFactory", function () {
	return {
		default: {
			duration: 2000,
			fadeOutDuration: 800,
			title: "",
			content: ""
		},

		error: function (options) {
			options = _.extend(this.default, options);
			this.createNotification("danger", options);
		},

		warning: function (options) {
			options = _.extend(this.default, options);
			this.createNotification("warning", options);
		},

		info: function (options) {
			options = _.extend(this.default, options);
			this.createNotification("info", options);
		},

		success: function (options) {
			options = _.extend(this.default, options);
			this.createNotification("success", options);
		},

		createNotification: function (type, options) {
			var newElement = $("<div/>").addClass("alert alert-" + type).html("<strong>" + options.title + "</strong> " + options.content);
			$(".notification").append(newElement);

			_.delay(function () {
				$(newElement).fadeOut(options.fadeOutDuration, function () {
					$(newElement).remove();
				}); 
			}, options.duration);
		}
	}
});