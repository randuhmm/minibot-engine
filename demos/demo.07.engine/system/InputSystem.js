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
		
		var InputSystem = Class.create(
			EngineSystem,
			{
				
				initialize: function($super)
				{
					$super(ComponentType.INPUT);
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
		
		return InputSystem;
		
	}
	
);

