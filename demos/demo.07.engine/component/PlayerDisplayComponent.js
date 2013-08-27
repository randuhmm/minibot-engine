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
				
				initialize: function($super)
				{
					$super();
				},
				
				update: function(dt)
				{
					
				},
				
				render: function(layer)
				{
					var p = this.getProperty("position");
					context.beginPath();
					context.arc(p.x, p.y, 16, 0, 2 * Math.PI, false);
					context.fillStyle = 'green';
					context.fill();
				}
				
			}
		);
		
		return PlayerDisplayComponent;
		
	}
	
);
