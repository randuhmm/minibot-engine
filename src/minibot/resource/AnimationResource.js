/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'minibot/resource/Resource',
		'minibot/resource/SpriteResource'
	],
	function
	(
		Resource,
		SpriteResource
	)
	{
		var AnimationResource = Class.create(
			Resource,
			/** @lends resource.AnimationResource# */
			{
				
				numberOfFrames: 0,
				
				sprites: null,
				
				spriteIds: null,
				
				delays: null,
				
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
					
					
					this.spriteIds = [];
					this.delays = [];
					if(data.frames != undefined) {

						for(var i = 0; i < data.frames.length; i++) {
							this.spriteIds.push(data.frames[i].sprite_id);
							this.delays.push(data.frames[i].delay);
						}
					}
					
					this.numberOfFrames = this.spriteIds.length;
					
					this.sprites = [];
				},
				
				load: function(manager, callback)
				{
					for(var i = 0; i < this.spriteIds.length; i++) {
						var sprite = manager.getResource(
							SpriteResource.TYPE,
							this.spriteIds[i]
						);
						this.sprites.push(sprite)
					}
					
					this.loaded = true;
					callback();
				},
				
				addFrame: function(sprite, delay)
				{
					this.sprites.push_back(sprite);
					this.delays.push_back(delay);
					this.numberOfFrames++;
				},
				
				getSprite: function(index)
				{
					return this.sprites[index];
				},
				
				getDelay: function(index)
				{
					return this.delays[index];
				},
				
				nextFrame: function(index)
				{
					return (index + 1) % this.numberOfFrames;
				},
				
				atEnd: function(index)
				{
					return (index + 1) == this.numberOfFrames;
				}
				
			}
		);
		
		AnimationResource.TYPE = 3;
		
		return AnimationResource;
	}
);
