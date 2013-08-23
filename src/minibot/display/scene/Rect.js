define(
	[
		'./SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		
		var Rect = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Rect# */
			{
				
				mode: null,
				
				fillColor: null,
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
				initialize: function($super, width, height, mode, fillColor, strokeColor)
				{
					$super();
					
					this.w = width;
					this.h = height;
					
					this.mode = mode;
					
					if(fillColor != undefined) this.fillColor = fillColor;
					if(strokeColor != undefined) this.strokeColor = strokeColor;
					
				},
				
				render: function(dt, x, y)
				{
					if(this.fillColor != null) this.scene.setFillColor(this.fillColor);
					
					this.scene.drawRect(this.mode, this.x + x, this.y + y, this.w, this.h);
				}
				
			}
		);
		
		return Rect;
		
	}
);
