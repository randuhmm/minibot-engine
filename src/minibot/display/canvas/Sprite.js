define(
	[
		'minibot/display/canvas/CanvasDisplayObject'
	],
	function
	(
		CanvasDisplayObject
	)
	{
		var Sprite = Class.create(
			CanvasDisplayObject,
			/** @lends display.canvas.Sprite# */
			{
				
				sprite: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
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
				
				render: function(dt, context, x, y)
				{
					try {
						context.drawImage(
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