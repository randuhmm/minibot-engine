define(
	[
		'minibot/display/scene/SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		var Sprite = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Sprite# */
			{
				
				sprite: null,
				
				composite: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param {resource.SpriteResource} sprite
				 * @param
				 */
				initialize: function($super, sprite)
				{
					$super();
					this.sprite = sprite;
					this.w = sprite.w;
					this.h = sprite.h;
				},
				
				render: function(dt, x, y)
				{
					try {
						this.scene.drawImage(
							this.sprite.img,
							this.sprite.x, //sx,
							this.sprite.y, //sy,
							this.sprite.w, //sw,
							this.sprite.h, //sh,
							this.x + x, //dx,
							this.y + y, //dy,
							this.w, //dw,
							this.h //dh
						);
					} catch(error) {
						console.log('SpriteObject: Fatal Error');
					}
				}
				
			}
		);
		
		return Sprite;
		
	}
);