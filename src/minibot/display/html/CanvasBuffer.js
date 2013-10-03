define(
	[
		'minibot/display/scene/Buffer',
		'./CanvasScene'
	],
	function
	(
		Buffer,
		CanvasScene
	)
	{
		
		// For circular dependency resolution
		CanvasScene = require('./CanvasScene');
		
		var CanvasBuffer = Class.create(
			Buffer,
			/** @lends display.html.CanvasBuffer# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.html.HtmlElement
				 * @constructs
				 */
				initialize: function($super, element)
				{
					
					var scene = new CanvasScene(element);
					
					$super(scene);
				},
				
				setWidth: function($super, width)
				{
					$super(width);
					this.scene.setWidth(width);
				},
				
				setHeight: function($super, height)
				{
					$super(height);
					this.scene.setHeight(height);
				},
				
				render: function(dt, x, y)
				{
					
				}
				
			}
		);
		
		return CanvasBuffer;
		
	}
);