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
				
				moving: null,
				
				initialize: function($super)
				{
					$super(ComponentType.PHYSICS);
					
					this.moving = false;
				},
				
				onAddedToObject: function($super)
				{
					$super();
				},
				
				onAddedToSystem: function()
				{
					this.addListener(PlayerObject.START_MOVE, this.handleStartMove.bindAsEventListener(this));
				},
				
				handleStartMove: function(message)
				{
					this.moving = true;
				},
				
				update: function($super, dt)
				{
					$super(dt);
					
					if(this.moving) {
						this.setProperty("x", this.getProperty("x") + 1);
						this.setProperty("y", this.getProperty("y") + 1);
					}
				}
				
			}
		);
		
		return PlayerPhysicsComponent;
		
	}
	
);
