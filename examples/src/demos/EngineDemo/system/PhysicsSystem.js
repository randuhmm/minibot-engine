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
		
		var EngineSystem = minibot.engine.EngineSystem;
		
		var PhysicsSystem = Class.create(
			EngineSystem,
			{
				
				initialize: function($super)
				{
					$super(ComponentType.PHYSICS);
				},
				
				update: function(dt)
				{
					this.updateComponents(dt);
				},
				
				render: function()
				{
					
				}
				
			}
		);
		
		return PhysicsSystem;
		
	}
	
);

