define(
	[
		'minibot/display/scene/Scene',
		'minibot/event/MouseEvent',
		'minibot/graphics/Color'
	],
	function
	(
		Scene,
		MouseEvent,
		Color
	)
	{
		
		var CanvasScene = Class.create(
			Scene,
			/** @lends display.html.CanvasScene# */
			{
				
				element: null,
				
				context: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.html.HtmlElement
				 * @constructs
				 */
				initialize: function($super, element)
				{
					$super();
					
					this.element = ((element == undefined)?(new Element('canvas')):(element));
					
					this.setWidth(this.element.width);
					this.setHeight(this.element.height);
					
					this.context = this.element.getContext("2d");
					
					this.element.observe('mousedown', this.handleMouseEvent.bind(this));
					this.element.observe('mouseup', this.handleMouseEvent.bind(this));
					this.element.observe('mousemove', this.handleMouseEvent.bind(this));
					
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
					
				},
				
				drawRect: function(mode, x, y, w, h)
				{
					this.context.fillRect(x,y,w,h); 
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
					this.container.dispatchEvent(mouseEvent);
				}
				
			}
		);
		
		return CanvasScene;
		
	}
);