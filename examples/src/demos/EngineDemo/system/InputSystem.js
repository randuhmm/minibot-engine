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
				
				scene: null,
				
				initialize: function($super, scene)
				{
					$super(ComponentType.INPUT);
					
					this.scene = scene;
				},
				
				update: function(dt)
				{
					this.updateComponents(dt);
				},
				
				getScene: function()
				{
					return this.scene;
				},
				
				render: function()
				{
					
				}
				
			}
		);
		
		return InputSystem;
		
	}
	
);

