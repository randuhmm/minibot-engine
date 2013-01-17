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
			/** @lends resource.Resource# */
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
		
		return Resource;
		
	}
);
