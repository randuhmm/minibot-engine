define(
	[
		'minibot/engine/EngineSystem'
	],
	function
	(
		EngineSystem
	)
	{
		
		var DisplaySystem = Class.create(
			EngineSystem,
			{
				
				scene: null,
				
				layers: null,
				
				initialize: function($super, type, scene)
				{
					$super(type);
					
					this.scene = scene;
					
					this.layers = new Array();
					
				},
				
				update: function(dt)
				{
					this.updateComponents(dt);
				},
				
				addObject: function($super, obj)
				{
					var c = $super(obj);
					if(c == null) return null;
					
					var l = c.getLayers();
					for(var i = 0; i < l.length; i++) {
						this.addToLayer(c, l[i]);
					}
				},
				
				addToLayer: function(component, layer)
				{
					while(!this.layers[layer]) {
						this.layers.push([]);
					}
					this.layers[layer].push(component);
				},

				onAddedToEngine: function()
				{
					// Setup the world?
				},
				
				getScene: function()
				{
					return this.scene;
				},
				
				getCamera: function()
				{
					return this.engine.getCamera();
				},
				
				// render the scene layer by layer, check if each component is on screen first
				render: function(dt)
				{
					
					var camera = this.getCamera();
					var cameraX = camera.getProperty("x") * -1;
					var cameraY = camera.getProperty("y") * -1;
					
					var i, j, layer, component;
					for(i = 0; i < this.layers.length; i++) {
						layer = this.layers[i];
						for(j = 0; j < layer.length; j++) {
							component = layer[j];
							if(!component.isVisible()) continue;
							component.render(dt, i, cameraX, cameraY);
						}
					}
				}
				
			}
		);
		
		return DisplaySystem;
		
	}
	
);