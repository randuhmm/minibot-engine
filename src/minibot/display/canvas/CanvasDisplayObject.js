define(
	[
		'minibot/display/DisplayObject'
	],
	function
	(
		DisplayObject
	)
	{
		
		var CanvasDisplayObject = Class.create(
			DisplayObject,
			/** @lends display.canvas.CanvasDisplayObject# */
			{
				
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				
				root: null,
				canvas: null,
				
				isVisible: true,
				touchEnabled: true,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
				},
				
				isCanvasObject: function()
				{
					return true;
				},
				
				render: function(dt, context, x, y)
				{
					// This function must be overloaded in the sub class
				},
				
				onAddedToCanvas: function()
				{
					// This callback is triggered when a canvas object is added to a canvas element
				},
				
				
				onRemovedFromCanvas: function()
				{
					// This callback is triggered when a canvas object is removed from a canvas element
				},
				
				getCanvasX: function()
				{
					var canvasX = 0;
					if(this.parent != null) {
						canvasX += this.parent.getCanvasX();
					}
					canvasX += this.x;
					return canvasX;
				},
				
				getCanvasY: function()
				{
					var canvasY = 0;
					if(this.parent != null) {
						canvasY += this.parent.getCanvasY();
					}
					canvasY += this.y;
					return canvasY;
				},
				
				hide: function()
				{
					this.isVisible = false;
				},
				
				show: function()
				{
					this.isVisible = true;
				}
				
			}
		);
		
		return CanvasDisplayObject;
		
	}
);
