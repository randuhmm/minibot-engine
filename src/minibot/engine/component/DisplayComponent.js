define(
	[
		'minibot/engine/EngineComponent'
	],
	function
	(
		EngineComponent
	)
	{
		
		var DisplayComponent = Class.create(
			EngineComponent,
			{
				
				scene: null,
				
				initialize: function($super, type)
				{
					$super(type);
				},
				
				update: function(dt)
				{
					
				},
				
				onAddedToSystem: function()
				{
					this.scene = this.getSystem().getScene();
				},
				
				render: function(dt, layer, x, y)
				{
					// override
				},
				
				getLayers: function()
				{
					// override
					return [];
				},
				
				isVisible: function()
				{
					// override
					return true;
				}
				
			}
		);
		
		return DisplayComponent;
		
	}
	
);
