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
		
		var DisplaySystem = minibot.engine.system.DisplaySystem;
		
		var GameDisplaySystem = Class.create(
			DisplaySystem,
			{
				
				initialize: function($super, scene)
				{
					$super(ComponentType.DISPLAY, scene);
				}
				
			}
		);
		
		return GameDisplaySystem;
		
	}
	
);

