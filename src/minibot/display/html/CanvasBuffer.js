define(
	[
		'minibot/display/scene/Buffer'
	],
	function
	(
		Buffer
	)
	{
		
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
				initialize: function($super, scene)
				{
					$super(scene);
				},
				
				setWidth: function($super, width)
				{
					$super(width);
					this.bufferScene.setWidth(width);
				},
				
				setHeight: function($super, height)
				{
					$super(height);
					this.bufferScene.setHeight(height);
				},
				
				render: function(dt, x, y)
				{
					var element = this.bufferScene.getElement();
					this.scene.drawImage(element, x*-1, y*-1, this.scene.width, this.scene.height, 0, 0, this.scene.width, this.scene.height);
				}
				
			}
		);
		
		return CanvasBuffer;
		
	}
);