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
		
		var DisplayComponent = minibot.engine.component.DisplayComponent;
		
		var PlayerDisplayComponent = Class.create(
			DisplayComponent,
			{
				
				camera: null,
				
				initialize: function($super)
				{
					$super(ComponentType.DISPLAY);
				},
				
				update: function(dt)
				{
					
				},
				
				onAddedToSystem: function($super)
				{
					$super();
					this.camera = this.getSystem().getCamera();
				},
				
				render: function(dt, layer, x, y)
				{
					this.scene.drawRect('', x + this.getProperty("x"), y + this.getProperty("x"), 50, 50);
				},
				
				getLayers: function()
				{
					return [0];
				}
				
			}
		);
		
		return PlayerDisplayComponent;
		
	}
	
);
