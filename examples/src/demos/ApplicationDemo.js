define(
	[
		'minibot',
		'BaseDemo'
	],
	function
	(
		minibot,
		BaseDemo
	)
	{
		
		var Demo = Class.create(
			BaseDemo,
			{
				
				initialize: function($super, element)
				{
					$super(element);
					
					this.run();
				},
				
				render: function(dt)
				{
					this.scene.clear();
					this.scene.render();
				}
				
			}
			
		);
		
		return Demo;
	}
);