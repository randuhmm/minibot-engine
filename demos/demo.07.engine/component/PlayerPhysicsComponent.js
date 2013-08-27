define(
	[
		'minibot',
		'../enum/ComponentType'
	],
	function
	(
		minibot,
		ComponentType
	)
	{
		
		var EngineComponent = minibot.engine.EngineComponent;
		
		var PlayerPhysicsComponent = Class.create(
			EngineComponent,
			{
				
				
				initialize: function($super)
				{
					$super(ComponentType.PHYSICS);
				},
				
				onAddedToObject: function($super)
				{
					$super();
				},
				
				onAddedToSystem: function()
				{
					
				},
				
				update: function($super, dt)
				{
					$super(dt);
				}
				
			}
		);
		
		return PlayerPhysicsComponent;
		
	}
	
);
