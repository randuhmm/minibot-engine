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
		
		var EngineSystem = minibot.engine.EngineSystem;
		
		var DisplaySystem = Class.create(
			EngineSystem,
			{
				
				initialize: function($super)
				{
					$super(ComponentType.DISPLAY);
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
				
				// update all of the components 
				update: function(dt)
				{
					
				},
				
				// render the scene layer by layer, check if each component is on screen first
				render: function()
				{
					var i, j, layer, component;
					for(i = 0; i < this.layers.length; i++) {
						layer = this.layers[i];
						for(j = 0; j < layer.length; j++) {
							component = layer[j];
							if(!component.isVisible()) continue;
							component.render(context, i);
						}
					}
				}
				
			}
		);
		
		return DisplaySystem;
		
	}
	
);

