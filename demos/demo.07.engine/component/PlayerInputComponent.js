define(
	[
		'minibot',
		'../enum/ComponentType',
		'../object/PlayerObject'
	],
	function
	(
		minibot,
		ComponentType,
		PlayerObject
	)
	{
		
		var EngineComponent = minibot.engine.EngineComponent;
		var KeyboardEvent = minibot.event.KeyboardEvent;
		var Keyboard = minibot.event.enum.Keyboard;
		
		var PlayerInputComponent = Class.create(
			EngineComponent,
			{
				
				left: false,
				up: false,
				right: false,
				down: false,
				
				initialize: function($super)
				{
					$super(ComponentType.INPUT);
				},
				
				onAddedToObject: function()
				{
					/*
					Event.observe(document, 'keydown', function() {
						var event = this.buildEvent(PlayerObject.START_MOVE, null);
						this.dispatchEvent(event);
					}.bindAsEventListener(this));
					*/
				},
				
				onAddedToSystem: function()
				{
					var scene = this.system.getScene();
					scene.addEventListener(KeyboardEvent.KEY_DOWN, this.handleKeyDown.bindAsEventListener(this));
					scene.addEventListener(KeyboardEvent.KEY_UP, this.handleKeyUp.bindAsEventListener(this));
				},
				
				update: function(dt)
				{
					// dispatch the events by flushing the queue
					this.flushEventQueue();
				},
				
				handleKeyDown: function(event)
				{
					var engineEvent = null;
					switch(event.key) {
						case Keyboard.KEY_LEFT:
							if(!this.left) {
								this.left = true;
								engineEvent = this.buildEvent(PlayerObject.START_MOVE_LEFT);
							}
							break;
						case Keyboard.KEY_UP:
							if(!this.up) {
								this.up = true;
								engineEvent = this.buildEvent(PlayerObject.START_MOVE_UP);
							}
							break;
						case Keyboard.KEY_RIGHT:
							if(!this.right) {
								this.right = true;
								engineEvent = this.buildEvent(PlayerObject.START_MOVE_RIGHT);
							}
							break;
						case Keyboard.KEY_DOWN:
							if(!this.down) {
								this.down = true;
								engineEvent = this.buildEvent(PlayerObject.START_MOVE_DOWN);
							}
							break;
						case Keyboard.KEY_SPACE:
							engineEvent = this.buildEvent(PlayerObject.SHAKE_SCREEN);
							break;
					}
					
					if(engineEvent != null) {
						this.queueEvent(engineEvent);
					}
					
				},
				
				handleKeyUp: function(event)
				{
					var engineEvent = null;
					switch(event.key) {
						case Keyboard.KEY_LEFT:
							if(this.left) {
								this.left = false;
								engineEvent = this.buildEvent(PlayerObject.STOP_MOVE_LEFT);
							}
							break;
						case Keyboard.KEY_UP:
							if(this.up) {
								this.up = false;
								engineEvent = this.buildEvent(PlayerObject.STOP_MOVE_UP);
							}
							break;
						case Keyboard.KEY_RIGHT:
							if(this.right) {
								this.right = false;
								engineEvent = this.buildEvent(PlayerObject.STOP_MOVE_RIGHT);
							}
							break;
						case Keyboard.KEY_DOWN:
							if(this.down) {
								this.down = false;
								engineEvent = this.buildEvent(PlayerObject.STOP_MOVE_DOWN);
							}
							break;
					}
					
					if(engineEvent != null) {
						this.queueEvent(engineEvent);
					}
					
				}
				
			}
		);
		
		return PlayerInputComponent;
		
	}
	
);
