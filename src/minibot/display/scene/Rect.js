define(
	[
		'./SceneDisplayObject',
		'minibot/graphics/Color',
		'minibot/graphics/Pattern'
	],
	function
	(
		SceneDisplayObject,
		Color,
		Pattern
	)
	{
		
		var Rect = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Rect# */
			{
				
				mode: null,
				
				fillColor: null,
				fillPattern: null,
				strokeColor: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param
				 * @param {int} width The width of the rectangle.
				 */
				initialize: function($super, width, height, mode, fill, strokeColor)
				{
					$super();
					
					this.w = width;
					this.h = height;
					
					this.mode = mode;
					
					if(fill != undefined) {
						if(fill.type == Color.TYPE) {
							this.fillColor = fill;
						} else if(fill.type = Pattern.TYPE) {
							this.fillPattern = fill;
						}
					}
					if(strokeColor != undefined) this.strokeColor = strokeColor;
					
				},
				
				render: function(dt, x, y)
				{
					if(this.fillColor != null) this.scene.setFillColor(this.fillColor);
					if(this.fillPattern != null) this.scene.setFillPattern(this.fillPattern);
					
					this.scene.drawRect(this.mode, this.x + x, this.y + y, this.w, this.h);
				}
				
			}
		);
		
		return Rect;
		
	}
);
