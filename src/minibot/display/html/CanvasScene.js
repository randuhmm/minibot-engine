define(
	[
		'minibot/display/scene/Scene',
		'minibot/event/MouseEvent',
		'minibot/event/KeyboardEvent',
		'minibot/event/enum/Keyboard',
		'minibot/graphics/Color',
		'minibot/display/html/CanvasBuffer'
	],
	function
	(
		Scene,
		MouseEvent,
		KeyboardEvent,
		Keyboard,
		Color,
		CanvasBuffer
	)
	{
		
		var CanvasScene = Class.create(
			Scene,
			/** @lends display.html.CanvasScene# */
			{
				
				element: null,
				
				context: null,
				
				mouseBfx: null,
				
				keyboardBfx: null,
				
				touchBfx: null,
				
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.html.HtmlElement
				 * @constructs
				 */
				initialize: function($super, options)
				{
					$super(options);
					
					this.element = ((this.hasOption('element'))?(this.getOption('element')):(new Element('canvas')));
					this.enableEvents = ((this.hasOption('enableEvents'))?(this.getOption('enableEvents')):(true));
					
					this.setWidth((this.hasOption('width')?(this.getOption('width')):(this.element.width)));
					this.setHeight((this.hasOption('height')?(this.getOption('height')):(this.element.height)));
					
					this.context = this.element.getContext("2d");
					
					if(this.enableEvents) {
						// Mouse Event Handling
						this.mouseBfx = this.handleMouseEvent.bind(this);
						this.element.observe('mousedown', this.mouseBfx);
						this.element.observe('mouseup', this.mouseBfx);
						this.element.observe('mousemove', this.mouseBfx);
						
						// Keyboard Event Handling
						this.keyboardBfx = this.handleKeyboardEvent.bind(this);
						document.observe('keydown', this.keyboardBfx);
						document.observe('keyup', this.keyboardBfx);
					}
				},
				
				setWidth: function($super, width)
				{
					$super(width);
					this.element.width = width;
				},
				
				setHeight: function($super, height)
				{
					$super(height);
					this.element.height = height;
				},
				
				getElement: function()
				{
					return this.element;
				},
				
				clear: function()
				{
					this.setWidth(this.width);
				},
				
				drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh)
				{
					this.context.drawImage(
						image,
						sx,
						sy,
						sw,
						sh,
						dx,
						dy,
						dw,
						dh
					);
				},
				
				drawLine: function(x1, y1, x2, y2)
				{
					this.context.beginPath();
					this.context.moveTo(x1, y1);
					this.context.lineTo(x2, y2);
					this.context.stroke();
				},
				
				drawPoly: function(mode, c, closed)
				{
					/*
					this.context.beginPath();
					this.context.moveTo(x1, y1);
					this.context.lineTo(x2, y2);
					this.context.stroke();
					*/
				},
				
				drawRect: function(mode, x, y, w, h)
				{
					this.context.fillRect(x,y,w,h); 
				},
				
				drawText: function(mode, text, style, x, y)
				{
					if(style != null) {
						this.context.font = style.getSize() + "pt " + style.getFamily();
						this.setFillColor(style.getColor());
						this.context.textAlign = style.getAlign(); 
					}
					
					this.context.fillText(text, x, y);
				},
				
				createBuffer: function()
				{
					var scene = new CanvasScene();
					var buffer = new CanvasBuffer(scene);
					return buffer;
				},
				
				drawBuffer: function(buffer)
				{
					// draws a buffer object to the scene
				},
				
				setFillColor: function(color)
				{
					this.context.fillStyle = 'rgba('+color.getAsString(Color.RGB)+')';
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
				
				// <-- Public Methods
				
				handleMouseEvent: function(event)
				{
					event.preventDefault();
					
					var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
					var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
					var type;
					
					x += event.clientX;
					y += event.clientY;
					
					//x = x * this.scale;
					//y = y * this.scale;
					
					switch(event.type) {
						case 'mousedown':
							type = MouseEvent.MOUSE_DOWN;
							break;
						case 'mousemove':
							type = MouseEvent.MOUSE_MOVE;
							break;
						case 'mouseup':
							type = MouseEvent.MOUSE_UP;
							break;
						default:
							return;
					}
					
					var mouseEvent = new MouseEvent(type, false, false, x, y, this.container);
					this.dispatchEvent(mouseEvent);
				},
				
				handleKeyboardEvent: function(event)
				{
					event.preventDefault();
					
					var type;
					var key = this.getKeyFromKeyCode(event.keyCode);
					if(key == undefined) return;
					
					switch(event.type) {
						case 'keydown':
							type = KeyboardEvent.KEY_DOWN;
							break;
						case 'keyup':
							type = KeyboardEvent.KEY_UP;
							break;
					}
					
					var keyboardEvent = new KeyboardEvent(type, false, false, key);
					this.dispatchEvent(keyboardEvent);
					
				},
				
				getKeyFromKeyCode: function(keyCode)
				{
					//console.log(keyCode);
					switch(keyCode) {
						case 32:
							return Keyboard.KEY_SPACE;
						case 37:
							return Keyboard.KEY_LEFT;
						case 38:
							return Keyboard.KEY_UP;
						case 39:
							return Keyboard.KEY_RIGHT;
						case 40:
							return Keyboard.KEY_DOWN;
					}
				}
				
			}
		);
		
		return CanvasScene;
		
	}
);