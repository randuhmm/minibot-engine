define([
	'minibot/utils',
	'minibot/display/canvas/CanvasDisplayObject',
	'minibot/event/UIEvent'
],
function(
	utils, 
	CanvasDisplayObject,
	UIEvent
)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.TextInput',
			parent: CanvasDisplayObject
		},
		{
			
			input: null,
			
			inputX: null,
			inputY: null,
			inputW: null,
			inputH: null,
			
			initialize: function($super, value, style)
			{
				$super();
				
				this.input = new Element('input', {type: 'text'});
				
				if(value != undefined) this.input.value = value;
				if(style != undefined) this.input.setStyle(style);
				
				this.input.observe('focus', this.handleInputFocus.bindAsEventListener(this));
				this.input.observe('blur', this.handleInputBlur.bindAsEventListener(this));
			},
			
			setValue: function(value)
			{
				this.input.value = value;
			},
			
			setType: function(type)
			{
				this.input.type = type;
			},
			
			getValue: function()
			{
				return this.input.value;
			},
			
			getType: function()
			{
				return this.input.type;
			},
			
			onAddedToCanvas: function($super)
			{
				$super();
				
				console.log('added text');
				this.canvas.addToHtmlOverlay(this.input);
			},
			
			onRemovedFromCanvas: function($super)
			{
				$super();
				
				this.input.remove();
			},
			
			render: function($super, dt, context, x, y)
			{
				
				if(this.inputX != (this.x + x)) {
					this.inputX = (this.x + x);
					this.input.style.left = (this.inputX / this.canvas.scale) + "px";
				}
				
				if(this.inputY != (this.y + y)) {
					this.inputY = (this.y + y);
					this.input.style.top = (this.inputY / this.canvas.scale) + "px";
				}
				
				if(this.inputW != (this.w)) {
					this.inputW = (this.w);
					this.input.style.width = (this.inputW / this.canvas.scale) + "px";
				}
				
				if(this.inputH != (this.h)) {
					this.inputH = (this.h);
					this.input.style.height = (this.inputH / this.canvas.scale) + "px";
				}
				
				context.strokeRect(this.x + x, this.y + y, this.w, this.h);
				
				$super();
				
			},
			
			dispatchEvent: function($super, event)
			{
				console.log("TextInput::dispatchEvent");
				if(event.type == UIEvent.TOUCH_START) {
					this.input.focus();
				}
				return $super(event);
			},
			
			handleInputFocus: function(event)
			{
				var x = 0;
				var y = 0;
				
				var uIEvent = new UIEvent(UIEvent.FOCUS, {}, x, y);
				this.dispatchEvent(uIEvent);
			},
			
			handleInputBlur: function(event)
			{
				var x = 0;
				var y = 0;
				
				var uIEvent = new UIEvent(UIEvent.BLUR, {}, x, y);
				this.dispatchEvent(uIEvent);
			}
			
		}
	);
});
