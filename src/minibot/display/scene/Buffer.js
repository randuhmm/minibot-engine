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
					
					this.root = this;
					this.scene = this.bufferScene;
					this.onAddedToScene();
					
					Container.prototype.render.call(this, 0, x, y)
					
					this.root = tempRoot;
					this.scene = tempScene;
				},
				
				render: function()
				{
				
				}
				
			}
		);
		
		return Buffer;
		
	}
);
