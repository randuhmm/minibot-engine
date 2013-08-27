define(
	[
		'minibot',
		'BaseDemo',
		'./MyEngine'
	],
	function
	(
		minibot,
		BaseDemo,
		MyEngine
	)
	{
		
		var Demo = Class.create(
			BaseDemo,
			{
				
				engine: null,
				
				initialize: function($super, element)
				{
					$super(element);
					
					this.engine = new MyEngine();
					
					this.run();
				},
				
				update: function(dt)
				{
					this.engine.update(dt);
				},
				
				render: function(dt)
				{
					this.scene.clear();
					
					this.engine.render(dt);
					
					this.scene.render(dt);
				}
				
			}
			
		);
		
		return Demo;
	}
);