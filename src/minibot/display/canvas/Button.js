define(
	[
		'minibot/display/canvas/CanvasDisplayObject',
		'minibot/event/UIEvent'
	],
	function
	(
		CanvasDisplayObject,
		UIEvent
	)
	{
		
		var Button = Class.create(
			CanvasDisplayObject,
			/** @lends display.canvas.Button# */
			{
				
				upState: null,
				downState: null,
				overState: null,
				currentState: null,
				
				states: null,
				
				isDown: false,
				isOver: false,
				
				touchMoveCallback: null,
				touchEndCallback: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param
				 * @param {display.DisplayObject} upState The resource to display when the button is "up".
				 * @param {display.DisplayObject} downState The resource to display when the button is "down".
				 * @param {display.DisplayObject} overState The resource to display when the button is "over".
				 */
				initialize: function($super, upState, downState, overState)
				{
					$super();
					if(upState != undefined) this.upState = upState;
					if(downState != undefined) this.downState = downState;
					if(overState != undefined) this.overState = overState;
					
					this.currentState = this.upState;
					
					this.w = this.upState.w;
					this.h = this.upState.h;
					
					this.states = new Array();
					if(this.upState != null) this.states.push(this.upState);
					if(this.downState != null) this.states.push(this.downState);
					if(this.overState != null) this.states.push(this.overState);
					
					this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
					this.touchEndCallback = this.handleTouchEnd.bindAsEventListener(this);
				},
				
				/** 
				 * Function description.
				 * @access public
				 */
				render: function(dt, context, x, y)
				{
					this.currentState.render(dt, context, this.x + x, this.y + y);
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				onAddedToCanvas: function($super)
				{
					$super();
					this.states.each(function(displayObject) {
						displayObject.root = this.root;
						displayObject.parent = this;
						displayObject.onAddedToCanvas();
					}.bind(this));
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				dispatchEvent: function($super, event)
				{
					if(!this.isDown) {
						if(event.type == UIEvent.TOUCH_START) {
							this.currentState = this.downState;
							this.isDown = true;
							this.root.addEventListener(UIEvent.TOUCH_MOVE, this.touchMoveCallback);
							this.root.addEventListener(UIEvent.TOUCH_END, this.touchEndCallback);
						}
						if(event.type == UIEvent.TOUCH_END) return;
					} else {
						if(event.type == UIEvent.TOUCH_END) {
							this.currentState = this.upState;
							this.isDown = false;
							this.root.removeEventListener(UIEvent.TOUCH_MOVE, this.touchMoveCallback);
							this.root.removeEventListener(UIEvent.TOUCH_END, this.touchEndCallback);
						}
					}
					return $super(event);
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleTouchMove: function(event)
				{
					var canvasX = this.getCanvasX();
					var canvasY = this.getCanvasY();
					if(
						event.x >= canvasX && 
						event.x <= (canvasX + this.w) && 
						event.y >= canvasY && 
						event.y <= (canvasY + this.h)
					) {
						this.currentState = this.downState;
						this.isOver = true;
					} else {
						this.currentState = this.upState;
						this.isOver = false;
					}
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleTouchEnd: function(event)
				{
					this.currentState = this.upState;
					this.isDown = false;
					this.root.removeEventListener(UIEvent.TOUCH_MOVE, this.touchMoveCallback);
					this.root.removeEventListener(UIEvent.TOUCH_END, this.touchEndCallback);
				}
				
			}
		);
		
		return Button;
		
	}
);
