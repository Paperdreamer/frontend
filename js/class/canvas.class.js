'use strict';

var canvasClass = function (options) {
	// Constructor
	var newClass = {
		canvas: {},

		targetID: "",
		width: 400,
		height: 400,
		scale: 1,
		backgroundImageURL: "",
		manipulation: true,			// Is it allowed to manipulate the elements in the canvas ?

		images: {},

		addImage: function (imageURL, options) {
			fabric.Image.fromURL(imageURL, _.bind(function(imageObject) {
				var ID = _.size(this.images);

				// If no scale is set, auto scale the image to fit the canvas
				imageObject.canvasID = options.ID;

				if (!options.scaleX || !options.scaleY) {
					this.imageAutoScale(imageObject);
				} else {
					imageObject.scaleX = parseFloat(options.scaleX);
					imageObject.scaleY = parseFloat(options.scaleY);
				}

				if (options.flipX) {
					imageObject.flipX = parseInt(options.flipX);
				}

				if (options.flipY) {
					imageObject.flipY = parseInt(options.flipY);
				}

				if (options.top) {
					imageObject.top =  parseFloat(options.top);
				}

				if (options.left) {
					imageObject.left =  parseFloat(options.left);
				}

				if (options.angle) {
					imageObject.angle = options.angle;
				}

				// Set index
				if (options.Index) {
					imageObject.index = options.Index;
				}

				imageObject.selectable = this.manipulation;

				this.canvas.add(imageObject);

				this.zoomObject(imageObject);

				this.images[ID] = imageObject;
				this._reorder();


				if ( _.isFunction( options.success ) ) {
					options.success({
						id: ID,
						object: imageObject,
						url: imageURL
					});
				}
			}, this));
		},

		resetZoom: function () {
			this.zoom(1 / this.scale);
		},

		zoomObject: function (object, scale) {
			if (_.isUndefined(scale))
				var scale = this.scale;

			var scaleX = object.scaleX;
			var scaleY = object.scaleY;
			var left = object.left;
			var top = object.top;
			
			var tempScaleX = scaleX * scale;
			var tempScaleY = scaleY * scale;
			var tempLeft = left * scale;
			var tempTop = top * scale;
			
			object.scaleX = tempScaleX;
			object.scaleY = tempScaleY;
			object.left = tempLeft;
			object.top = tempTop;
			
			object.setCoords();

			this.canvas.renderAll();
		},

		zoom: function (scale) {
			this.scale = this.scale * scale;
			
			this.canvas.setHeight(this.canvas.getHeight() * scale);
			this.canvas.setWidth(this.canvas.getWidth() * scale);
			 var objects = this.canvas.getObjects();

				_.each(objects, function (object) {
					this.zoomObject(object, scale);
				}, this);
				
		
			this.canvas.renderAll();
		},

		imageAutoScale: function (imageObject) {
			// Evaluate a scale so the image does does not prevent editing the canvas
			var newScale = _.min( [ ( (this.width / 2) / imageObject.width ), ( (this.height / 2) / imageObject.height ) ] );
			imageObject.scale ( newScale );
		},

		setBackgroundImage: function (imgURL) {
			// TODO
			//this.backgroundImageURL = imgURL;
			//this.canvas.setBackgroundImage(imgURL, this.canvas.renderAll.bind(this.canvas));
		},

		changeIndex: function (imageID, index) {
			var size = _.size(this.images);
			this.images[imageID].moveTo(size - (index + 1));
		},

		export: function () {
			return this.canvas.toJSON();
		},

		_constructor: function () {
			if (this.targetID == "") {
				console.error("No canvas targetID set in the options! The canvas could not be initialized.");
			} else {
				// Create a new canvas bound to targetID
				this.canvas = new fabric.Canvas(this.targetID);
				
				// Set the canvas's dimensions
				this.canvas.setDimensions({ width: this.width, height: this.height });

				// Set the background Image if one is specified
				if (this.backgroundImageURL != "")
					this.setBackgroundImage(this.backgroundImageURL);
			}
		},


		_reorder: function () {
			this.canvas._objects = _.sortBy(this.canvas._objects, function (object) {
				return parseInt(object.index); 
			}, this);

			this.canvas.renderAll();
		}
	};

	// Merge options
	newClass = _.extend(newClass, options);

	// Execute the _constructor() Method
	newClass._constructor();

	// Return new instance
	return newClass;
};