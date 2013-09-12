define(
	[
		
	],
	function
	(
		
	)
	{
		var EngineSystem = Class.create(
			{
				
				type: null,
				
				components: null,
				
				componentsByObject: null,
				
				engine: null,
				
				initialize: function(type)
				{
					this.type = type;
					
					this.components = [];
					
					this.componentsByObject = {};
					
				},
				
				getType: function()
				{
					return this.type;
				},
				
				addObject: function(obj)
				{
					if(obj.hasComponent(this.type)) {
						var c = obj.getComponent(this.type);
						this.components.push(c);
						this.componentsByObject[obj] = c;
						
						c.setSystem(this);
						c.onAddedToSystem();
						
						return c;
					}
					
					return null;
				},
				
				addResource: function(type, id)
				{
					if(!this.engine) return;
					this.engine.addResource(type, id);
				},
				
				getResource: function(type, id)
				{
					if(!this.engine) return;
					return this.engine.getResource(type, id);
				},
				
				removeObject: function(obj)
				{
				
				},
				
				setEngine: function(engine)
				{
					this.engine = engine;
				},
				
				getEngine: function()
				{
					return this.engine;
				},

				onAddedToEngine: function()
				{
					//-- OVERRIDE
				},
				
				onResourcesLoaded: function()
				{
					
				},
				
				update: function(dt)
				{
					//-- OVERRIDE
				},
				
				// Helper function to update all components of the system
				updateComponents: function(dt)
				{
					for(var i = 0; i < this.components.length; i++) {
						this.components[i].update(dt);
					}
				}
				
			}
		);
		
		return EngineSystem;
		
	}
	
);

