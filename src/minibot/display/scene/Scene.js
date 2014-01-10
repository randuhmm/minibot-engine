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
			/** @lends display.scene.Scene# */
			{
				/** The scene container.
				 * @type display.scene.Container
				 */
				container: null,
				/** The scene width.
				 * @type Number
				 */
				width: null,
				/** The scene height.
				 * @type Number
				 */
				height: null,
				/** The scene options
				 * @type Object
				 */
				options: null,
				
				/**
				 * Constructs a new scene instance.
				 * @class Creates a new scene within a specified container.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function(options)
				{
					
					this.options = options;
					
					this.container = new Container();
					this.container.resizable = false;
					this.container.setRoot(this.container);
					this.container.setScene(this);
					
				},
				
				// Public Methods -->
				
				hasOption: function(key)
				{
					return this.options[key] != undefined;
				},
				
				getOption: function(key)
				{
					return this.options[key];
				},
				
				getBuffer: function()
				{
		
				},
				
				/** Set the width of the scene.
				 * @param {Number} width The width desired.
				 */
				setWidth: function(width)
				{
					this.width = width;
					this.container.setWidth(width);
				},
				
				/** Returns the width of the scene.
				 * @returns {Number}
				 */
				getWidth: function()
				{
					return this.width;
				},
				
				/** Set the height of the scene.
				 * @param {Number} height The height desired.
				 */
				setHeight: function(height)
				{
					this.height = height;
					this.container.setHeight(height);
				},
				
				/** Returns the height of the scene.
				 * @returns {Number}
				 */
				getHeight: function()
				{
					return this.height;
				},
				
				/** Appends a child to the specified container.
			     @param {display.DisplayObject} displayObject The displayObject to add.
				 @param {layer} layer The layer to be added to.
				 */
				addChild: function(displayObject, layer)
				{
					if(layer == undefined || layer == null) layer = 0;
					this.container.addChild(displayObject, layer);
				},
				
				/** Removes a child from the specified container.
			     @param {display.DisplayObject} displayObject The displayObject to remove.
				 *//** Removes all children from the specified container. */
				removeChild: function(displayObject)
				{
					this.container.removeChild(displayObject);
				},
				
				/** Removes all children from the specified container. */
				removeAllChildren: function()
				{
					this.container.removeAll();
				},
				
				/** Renders the scene
				 * @param {Number} dt The change in time.
				 */
				render: function(dt)
				{
					this.container.render(dt);
				},
				
				clear: function()
				{
					// overload in subclass
				},
				
				// Graphics Methods -->
				
				drawBuffer: function()
				{
					
				},
				
				/** Draws an image.
				 * @param {resource.ImageResource} image The image to be drawn.
				 * @param {Number} sx The starting x position of the image.
				 * @param {Number} sy The starting y position of the image.
				 * @param {Number} sw The starting width of the image.
				 * @param {Number} sh The starting height of the image.
		   		 * @param {Number} dx The x position to place the image.
				 * @param {Number} dy The y position to place the image.
				 * @param {Number} dw The destination width.
				 * @param {Number} dh The destination height.
				 */
				drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh)
				{
				
				},

				/** Draws a line.
				 * @param {Number} x1 The starting x coordinate.
				 * @param {Number} x2 The ending x coordinate.
				 * @param {Number} y1 The starting y coordinate.
				 * @param {Number} y2 The ending y coordinate.
				 */
				drawLine: function(x1, y1, x2, y2)
				{
					
				},

				/** Draws a Rectangle.
				 * @param {Number} Mode Represents whether or not to fill the rectangle.
				 * @param {Number} x The starting x coordinate.
				 * @param {Number} y The starting y coordinate.
				 * @param {Number} w The width of the rectangle.
				 * @param {Number} h The height of the rectangle.
				 */
				drawRect: function(mode, x, y, w, h)
				{

				},

				/** Sets the fill color.
				 * @param {graphics.Color} color The color to be used.
				 */
				setFillColor: function(color)
				{
					
				},

				/** Sets the line color.
				 * @param {graphics.Color} color The color to be used.
				 */
				setLineColor: function(color)
				{
					
				},

				/** Sets the line style.
				 * @param {object} style The style to be used.
				 */
				setLineStyle: function(style)
				{
				
				},

				/** Sets the line width.
				 * @param {Number} width The width to be used.
				 */
				setLineWidth: function(width)
				{
				
				},

				/** Save
				 */
				save: function()
				{

				},
				
				/** Restore
				 */
				restore: function()
				{

				},
				
				/** Translate
				 * @param {Number} x 
				 * @param {Number} y 
				 */
				translate: function(x, y)
				{

				},
				
				/** Rotate
				 * @param {Number} a 
				 */
				rotate: function(a)
				{

				},
		
				// <-- Graphics Methods
				
				// Event Methods -->
				
				addEventListener: function(type, callback)
				{
					this.container.addEventListener(type, callback);
				},
				
				hasEventListener: function(type)
				{
					return this.container.addEventListener(type);
				},
				
				dispatchEvent: function(event)
				{
					return this.container.dispatchEvent(event);
				},
				
				removeEventListener: function(type, callback)
				{
					this.container.removeEventListener(type, callback);
				},
				
				removeAllEventListeners: function()
				{
					this.container.removeAllEventListeners();
				}
				
				// <-- Event Methods
				
				// <-- Public Methods
				
				
			}
		);
		
		Scene.MOUSE_EVENTS = 1;
		Scene.KEYBOARD_EVENTS = 2;
		Scene.TOUCH_EVENTS = 4;

		return Scene;
		
	}
);
