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
		
		var CameraInputComponent = Class.create(
			EngineComponent,
			{
				
				initialize: function($super)
				{
					$super(ComponentType.INPUT);
				},
				
				onAddedToObject: function()
				{
					
				},
				
				update: function(dt)
				{
					
				}
				
			}
		);
		
		return CameraInputComponent;
		
	}
	
);
