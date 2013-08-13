/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'minibot/event/EventDispatcher'
	],
	function
	(
		EventDispatcher
	)
	{
		
		var EngineComponent = Class.create(
			EventDispatcher,
			/** @lends engine.EngineComponent# */
			{
				
				type: null,
				
				object: null,
				
				data: null,
				
				initialize: function($super, type)
				{
					$super();
					
					this.type = type;
					this.data = {};
				},
				
				getType: function()
				{
					return this.type;
				},
				
				setProperty: function()
				{
				
				}
				
				
			}
		);
		
		return EngineComponent;
	
	}
);

/*
require 'utils/class'

GameComponent = class(
	function(o, type)
		o.type = type
		o.object = nil
		o.data = {}
    o.listeners = {}
	end
)

function GameComponent:getType()
	return self.type
end

function GameComponent:setProperty(key, value)
	self.object:setProperty(key, value)
end

function GameComponent:getProperty(key)
	return self.object:getProperty(key)
end

function GameComponent:hasProperty(key)
	return self.object:hasProperty(key, type)
end

function GameComponent:setObject(object)
	self.object = object
end

function GameComponent:onAddedToObject()
	-- OVERRIDE
end

function GameComponent:sendMessage(message)
	self.object:sendMessage(message)
end

function GameComponent:addListener(type, func, obj)
  if obj == nil then obj = self.listeners end
  obj[type] = func
end

function GameComponent:callListener(type, listeners, params)
  local f = listeners[type]
  if f == nil then return end
  f(self, unpack(params))
end

function GameComponent:receiveMessage(message)
  self:callListener(message.type, self.listeners, {message})
end

function GameComponent:update(dt)
	-- OVERRIDE
end

GameComponent.COMPONENT_EVENT = "ComponentEvent"
*/