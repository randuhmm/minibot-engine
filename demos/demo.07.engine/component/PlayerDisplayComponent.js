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
		
		var PlayerDisplayComponent = Class.create(
			EngineComponent,
			{
				
				scene: null,
				
				camera: null,
				
				initialize: function($super)
				{
					$super(ComponentType.DISPLAY);
				},
				
				update: function(dt)
				{
					
				},
				
				onAddedToSystem: function()
				{
					this.scene = this.getSystem().getScene();
					this.camera = this.getSystem().getCamera();
				},
				
				render: function(dt, layer, x, y)
				{
					this.scene.drawRect('', x + this.getProperty("x"), y + this.getProperty("x"), 50, 50);
				},
				
				getLayers: function()
				{
					return [0];
				},
				
				isVisible: function()
				{
					return true;
				}
				
			}
		);
		
		return PlayerDisplayComponent;
		
	}
	
);
