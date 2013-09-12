define(
	[
		'minibot/event/EngineEvent'
	],
	function
	(
		EngineEvent
	)
	{
		var EngineComponent = Class.create(
			{
				
				type: null,
				
				object: null,
				
				system: null,
				
				eventQueue: null,
				
				initialize: function(type)
				{
					this.type = type;
					this.eventQueue = [];
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
				
				buildEvent: function(type, data)
				{
					return this.object.buildEvent(type, data, this);
				},
				
				queueEvent: function(event)
				{
					this.eventQueue.push(event);
				},
				
				flushEventQueue: function()
				{
					while(this.eventQueue.length) {
						this.dispatchEvent(this.eventQueue.pop());
					}
				},
				
				dispatchEvent: function(event)
				{
					this.object.dispatchEvent(event);
				},
				
				addEventListener: function(type, callback)
				{
					this.object.addEventListener(type, callback);
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
				
				update: function(dt)
				{
					//-- OVERRIDE
				}
				
			}
		);
		
		return EngineComponent;
		
	}
	
);

