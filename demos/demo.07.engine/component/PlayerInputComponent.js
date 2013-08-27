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
		
		var PlayerInputComponent = Class.create(
			EngineComponent,
			{
				
				initialize: function($super)
				{
					$super();
				},
				
				onAddedToObject: function()
				{
					
				},
				
				update: function(dt)
				{
					
				}
				
			}
		);
		
		return PlayerInputComponent;
		
	}
	
);
