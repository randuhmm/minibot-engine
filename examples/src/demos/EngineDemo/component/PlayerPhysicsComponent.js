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
		
		var PlayerPhysicsComponent = Class.create(
			EngineComponent,
			{
				
				initialize: function($super)
				{
					$super(ComponentType.PHYSICS);
					
					this.moving = false;
				},
				
				onAddedToObject: function($super)
				{
					
					this.setProperty("vx", 0);
					this.setProperty("vy", 0);
					
					this.addEventListener(
						PlayerObject.START_MOVE_LEFT, 
						this.handleStartMove.bindAsEventListener(this, -1, 0)
					);
					this.addEventListener(
						PlayerObject.START_MOVE_UP, 
						this.handleStartMove.bindAsEventListener(this, 0, -1)
					);
					this.addEventListener(
						PlayerObject.START_MOVE_RIGHT, 
						this.handleStartMove.bindAsEventListener(this, 1, 0)
					);
					this.addEventListener(
						PlayerObject.START_MOVE_DOWN, 
						this.handleStartMove.bindAsEventListener(this, 0, 1)
					);
					
					this.addEventListener(
						PlayerObject.STOP_MOVE_LEFT, 
						this.handleStopMove.bindAsEventListener(this, 1, 0)
					);
					this.addEventListener(
						PlayerObject.STOP_MOVE_UP, 
						this.handleStopMove.bindAsEventListener(this, 0, 1)
					);
					this.addEventListener(
						PlayerObject.STOP_MOVE_RIGHT, 
						this.handleStopMove.bindAsEventListener(this, -1, 0)
					);
					this.addEventListener(
						PlayerObject.STOP_MOVE_DOWN, 
						this.handleStopMove.bindAsEventListener(this, 0, -1)
					);
					
				},
				
				onAddedToSystem: function()
				{
					
				},
				
				handleStartMove: function(message, vx, vy)
				{
					this.setProperty("vx", this.getProperty("vx") + (vx*PlayerPhysicsComponent.VX));
					this.setProperty("vy", this.getProperty("vy") + (vy*PlayerPhysicsComponent.VY));
				},
				
				handleStopMove: function(message, vx, vy)
				{
					this.setProperty("vx", this.getProperty("vx") + (vx*PlayerPhysicsComponent.VX));
					this.setProperty("vy", this.getProperty("vy") + (vy*PlayerPhysicsComponent.VY));
				},
				
				update: function($super, dt)
				{
					$super(dt);
					
					var dx = this.getProperty("vx") * dt / 1000
					var dy = this.getProperty("vy") * dt / 1000
					
					if(dx != 0 || dy != 0) {
						this.setProperty("x", this.getProperty("x") + dx);
						this.setProperty("y", this.getProperty("y") + dy);
					}
				}
				
			}
		);
		
		PlayerPhysicsComponent.VX = 200;
		PlayerPhysicsComponent.VY = 200;
		
		return PlayerPhysicsComponent;
		
	}
	
);
