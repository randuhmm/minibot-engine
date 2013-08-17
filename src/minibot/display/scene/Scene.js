define(
	[
		'minibot/event/EventDispatcher',
		'./Container'
	],
	function
	(
		EventDispatcher,
		Container
	)
	{
		
		var Scene = Class.create(
			EventDispatcher,
			/** @lends display.scene.Scene# */
			{
				
				container: null,
				
				width: null,
				
				height: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
					
					this.container = new Container();
					this.container.resizable = false;
					this.container.setRoot(this.container);
					this.container.setScene(this);
				},
				
				// Public Methods -->
				
				setWidth: function(width)
				{
					this.width = width;
					this.container.setWidth(width);
				},
				
				getWidth: function()
				{
					return this.width;
				},
				
				setHeight: function(height)
				{
					this.height = height;
					this.container.setHeight(height);
				},
				
				getHeight: function()
				{
					return this.height;
				},
				
				addChild: function(displayObject, layer)
				{
					if(layer == undefined || layer == null) layer = 0;
					this.container.addChild(displayObject, layer);
				},
				
				removeChild: function(displayObject)
				{
					this.container.removeChild(displayObject);
				},
				
				removeAllChildren: function()
				{
					this.container.removeAll();
				},
				
				render: function(dt)
				{
					this.container.render(dt);
				},
				
				// Graphics Methods -->
				
				drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh)
				{
				
				},
				
				drawLine: function(x1, y1, x2, y2)
				{
					
				},
				
				drawRect: function(mode, x, y, w, h)
				{
					
				},
				
				setFillColor: function(color)
				{
					
				},
				
				setLineColor: function(color)
				{
					
				},
				
				setLineStyle: function(style)
				{
				
				},
				
				setLineWidth: function(width)
				{
				
				},
				
				// <-- Graphics Methods
				
				// <-- Public Methods
				
				
			}
		);
		
		return Scene;
		
	}
);
