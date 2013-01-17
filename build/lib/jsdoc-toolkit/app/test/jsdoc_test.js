/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */


define(
	[],
	function()
	{
 		
		var Resource = Class.create(
			/** @lends Resource# */
			{
				
				/**
				 * Create a new Resource object. 
				 * @class This is the basic Resource class.
				 * It is intended to be used as an Interface, although such types are not
				 * enforced in JavaScript.
				 * @constructs
				 * @param {String} id The id of the Resource.
				 */
				initialize: function(id)
				{
					this.id = id;
				},
				
				/**
				 * The id of the Resource.
				 * @type String
				 */
				id: null,
				
				/**
				 * Value that represents if the resource has been loaded or not.
				 * @private
				 * @type bool
				 */
				loaded: false,
				
				/**
				 * Load the Resource
				 * @param {ResourceManager} manager The ResourceManager instance.
				 * @param {Function} callback The callback function to call once loaded.
				 */
				load: function(manager, callback)
				{
					// Overload this function in the base class
					this.loaded = true;
					callback.defer();
				},
				
				/**
				 * Returns if the Resource has been loaded or not.
				 * @type bool
				 */
				isLoaded: function()
				{
					return this.loaded;
				}
				
			}
		);
	}
);

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
			/** @lends ImageResource# */
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
				 * @extends Resource
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
	}
);
