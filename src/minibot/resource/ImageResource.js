/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'minibot/resource/Resource'
	],
	function
	(
		Resource
	)
	{
		
		var ImageResource = Class.create(
			Resource,
			/** @lends resource.ImageResource# */
			{
				
				/**
				 * The src URL.
				 * @type String
				 */
				src: null,
				
				/**
				 * The Image object.
				 * @type Image
				 */
				img: null,
				
				/**
				 * Create a new ImageResource object. 
				 * @class The base ImageResource object.
				 * It is intended to be used as an Interface, although such types are not
				 * @extends resource.Resource
				 * @constructs
				 * @param {String} id The id of the Resource.
				 * @param {Object} data The data associated with the Resource.
				 * @param 
				 */
				initialize: function($super, id, data)
				{
					$super(id);
					if(data.src != undefined) this.src = data.src;
				},
				
				load: function(manager, callback)
				{
					this.loaded = true;
					if(this.src != null) {
						this.img = new Image();
						this.img.addEventListener("load", this.handleLoadImageSuccess.bindAsEventListener(this, callback), false);
						this.img.addEventListener("error", this.handleLoadImageFailure.bindAsEventListener(this, callback), false);
						this.img.src = this.src;
					} else {
						callback();
					}
				},
				
				handleLoadImageSuccess: function(event, callback)
				{
					callback();
				},
				
				handleLoadImageFailure: function(event, callback)
				{
					// TODO: Adjust error reporting
					console.log('ImageResource: Failed to load image.');
					callback();
				}
				
			}
		);
		
		ImageResource.TYPE = 1;
		
		return ImageResource;
		
	}
);
