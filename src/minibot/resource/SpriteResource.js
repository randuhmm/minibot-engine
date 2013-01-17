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
		
		var SpriteResource = Class.create(
			Resource,
			/** @lends resource.SpriteResource# */
			{
				imageId: null,
				
				imageResource: null,
				
				img: null,
				
				x: 0,
				y: 0,
				w: -1,
				h: -1,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends resource.Resource
				 * @constructs
				 * @param {String} id The id of the Resource.
				 * @param {Object} data The data associated with the Resource.
				 * @param 
				 */
				initialize: function($super, id, data)
				{
					$super(id);
					
					if(data != undefined) {
						if(data.image_id != undefined) this.imageId = data.image_id;
						else if(data.imageId != undefined) this.imageId = data.imageId;
						
						if(data.x != undefined) this.x = data.x;
						if(data.y != undefined) this.y = data.y;
						if(data.w != undefined) this.w = data.w;
						if(data.h != undefined) this.h = data.h;
					}
				},
				
				load: function(manager, callback)
				{
					this.imageResource = manager.getResource(
						ImageResource.TYPE,
						this.imageId
					);
					
					this.img = this.imageResource.img;
					
					if(this.w == -1) this.w = this.img.width;
					if(this.h == -1) this.h = this.img.height;
					
					this.loaded = true;
					callback();
				}
			}
		);
		
		SpriteResource.TYPE = 2;
		
		return SpriteResource;
		
	}
);
