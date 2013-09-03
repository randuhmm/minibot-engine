define(
	[
		
	],
	function
	(
		
	)
	{
		var EngineComponent = Class.create(
			{
				
				type: null,
				
				object: null,
				
				system: null,
				
				listeners: null,
				
				initialize: function(type)
				{
					this.type = type;
					
					this.listeners = {};
				},
				
				getType: function()
				{
					return this.type;
				},

				setProperty: function(key, value)
				{
					this.object.setProperty(key, value);
				},

				getProperty: function(key)
				{
					return this.object.getProperty(key);
				},

				hasProperty: function(key)
				{
					return this.object.hasProperty(key);
				},
				
				setObject: function(object)
				{
					this.object = object;
				},
				
				onAddedToObject: function()
				{
					//-- OVERRIDE
				},
				
				setSystem: function(system)
				{
					this.system = system;
				},
				
				getSystem: function()
				{
					return this.system;
				},
				
				onAddedToSystem: function()
				{
					//-- OVERIDE?
				},

				sendMessage: function(message)
				{
					this.object.sendMessage(message);
				},

				addListener: function(type, func, obj)
				{
					if(obj == null) obj = this.listeners;
					obj[type] = func;
				},
				
				addResource: function(type, id)
				{
					if(this.system == null) return;
					this.system.addResource(type, id);
				},
				
				getResource: function(type, id)
				{
					if(this.system == null) return;
					return this.system.getResource(type, id);
				},
				
				onResourcesLoaded: function()
				{
					
				},

				callListener: function(type, listeners, params)
				{
					var f = listeners[type];
					if(f == null) return;
					f(params)
				},

				receiveMessage: function(message)
				{
					this.callListener(message.type, this.listeners, message)
				},

				update: function(dt)
				{
					//-- OVERRIDE
				}
				
			}
		);
		
		return EngineComponent;
		
	}
	
);

