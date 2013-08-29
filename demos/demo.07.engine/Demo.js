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
					
					this.engine = new MyEngine(this.scene);
					
					this.run();
				},
				
				update: function(dt)
				{
					// TODO: Fix base demo so it calls update
					//this.engine.update(dt);
				},
				
				render: function(dt)
				{
					this.engine.update(dt);
					
					this.scene.clear();
					
					this.engine.render(dt);
					
					this.scene.render(dt);
				}
				
			}
			
		);
		
		return Demo;
	}
);