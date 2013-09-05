define(
	[
		'minibot/event/EventDispatcher'
	],
	function
	(
		EventDispatcher
	)
	{
		var EngineObject = Class.create(
			EventDispatcher,
			{
			
				type: null,
				
				components: null,
				
				data: null,
				
				engine: null,
				
				initialize: function($super, type, data)
				{
					$super();
					
					this.type = type;
					this.components = {};
					
					if(data == undefined) data = {};
					this.data = data;
				},
				
				getType: function()
				{
					return this.type;
				},

				addComponent: function(component)
				{
					var type = component.getType()
					if(this.components[type] == undefined) {
						this.components[type] = component;
						component.setObject(this);
						component.onAddedToObject();
					}
				},

				removeComponent: function(component)
				{

				},
				
				setEngine: function(engine)
				{
					this.engine = engine;
				},

				onAddedToEngine: function()
				{
					//-- OVERRIDE
				},
				
				onResourcesLoaded: function()
				{
					for(var c in this.components) {
						this.components[c].onResourcesLoaded();
					}
				},

				getComponent: function(type)
				{
					if(this.components[type] != undefined) {
						return this.components[type];
					}
					return null;
				},

				hasComponent: function(type)
				{
					return (this.components[type] != undefined)
				},

				update: function(dt)
				{
					for(var c in this.components) {
						this.components[c].update(dt);
					}
				},

				setProperty: function(key, value)
				{
					this.data[key] = value;
				},

				getProperty: function(key)
				{
					return this.data[key];
				},

				hasProperty: function(key)
				{
					return (this.data[key] != undefined);
				}
				
			}
		);
		
		return EngineObject;
		
	}
);
