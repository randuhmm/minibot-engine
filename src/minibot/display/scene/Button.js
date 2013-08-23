define(
	[
		'./SceneDisplayObject',
		'minibot/event/MouseEvent'
	],
	function
	(
		SceneDisplayObject,
		MouseEvent
	)
	{
		
		var Button = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Button# */
			{
				
				upState: null,
				downState: null,
				overState: null,
				currentState: null,
				
				states: null,
				
				isDown: false,
				isOver: false,
				
				mouseMoveCallback: null,
				mouseUpCallback: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
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
					
					//this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
					//this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
				},
				
				/** 
				 * Function description.
				 * @access public
				 */
				render: function(dt, x, y)
				{
					this.currentState.render(dt, this.x + x, this.y + y);
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				onAddedToScene: function($super)
				{
					$super();
					this.states.each(function(displayObject) {
						displayObject.root = this.root;
						displayObject.parent = this;
						displayObject.scene = this.scene;
						displayObject.onAddedToScene();
					}.bind(this));
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				dispatchEvent: function($super, event)
				{
					if(!this.isDown) {
						if(event.type == MouseEvent.MOUSE_DOWN) {
							this.currentState = this.downState;
							this.isDown = true;
							
							if(!this.mouseMoveCallback) {
								this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
								this.root.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							}
							
							if(!this.mouseUpCallback) {
								this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
								this.root.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
							}
							
						} else if(event.type == MouseEvent.MOUSE_MOVE) {
							
							
							
							this.currentState = this.overState;
							
							if(!this.mouseMoveCallback) {
								this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
								this.root.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							}
							
						}
					} else {
						if(event.type == MouseEvent.MOUSE_UP) {
							this.isDown = false;
							
							if(this.mouseMoveCallback) {
								this.root.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
								this.mouseMoveCallback = null;
							}
							
							if(this.mouseUpCallback) {
								this.root.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
								this.mouseUpCallback = null;
							}
							
							this.currentState = this.upState;
							
							this.sendClick.bind(this).defer(event);
						}
					}
					return $super(event);
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleMouseMove: function(event)
				{
					
					this.isOver = this.isEventOver(event);
					
					if(this.isOver && this.isDown) {
						this.currentState = this.downState;
					} else if(this.isOver) {
						this.currentState = this.overState;
					} else if(this.isDown) {
						this.currentState = this.upState;
					} else {
						this.currentState = this.upState;
						if(this.mouseMoveCallback) {
							this.root.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							this.mouseMoveCallback = null;
						}
					}
					
				},
				
				isEventOver: function(event)
				{
					var sceneX = this.getSceneX();
					var sceneY = this.getSceneY();
					return (
						event.x >= sceneX && 
						event.x <= (sceneX + this.w) && 
						event.y >= sceneY && 
						event.y <= (sceneY + this.h)
					);
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleMouseUp: function(event)
				{
					this.currentState = this.upState;
					this.isDown = false;
					
					if(this.mouseMoveCallback) {
						this.root.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
						this.mouseMoveCallback = null;
					}
					
					if(this.mouseUpCallback) {
						this.root.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
						this.mouseUpCallback = null;
					}
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				sendClick: function(event)
				{
					var x = event.x;
					var y = event.y;
					var type = MouseEvent.CLICK;
					
					var mouseEvent = new MouseEvent(type, false, false, x, y, this);
					this.dispatchEvent(mouseEvent);
				}
				
			}
		);
		
		return Button;
		
	}
);
