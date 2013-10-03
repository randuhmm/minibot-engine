define(
	[
		'./Container'
	],
	function
	(
		Container
	)
	{
		
		var Buffer = Class.create(
			Container,
			/** @lends display.scene.Buffer# */
			{
				
				bufferScene: null,
				
				initialize: function($super, scene)
				{
					
					$super();
					
					this.bufferScene = scene;
					
					this.resizable = false;
				},
				
				renderBuffer: function(x, y)
				{
					var tempScene = this.scene;
					var tempRoot = this.root;
					
					this.setRoot(this);
					this.setScene(this.bufferScene);
					
					//Container.prototype.render(0, x, y)
					
					this.setRoot(tempRoot);
					this.setScene(tempScene);
				},
				
				render: function()
				{
				
				}
				
			}
		);
		
		return Container;
		
	}
);
