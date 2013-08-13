
require 'utils/class'
require 'engine/component/core/GameComponent'

GameObject = class(
	function(o, type)
		o.type = type
		o.components = {}
		o.data = {}
    o.game = nil
	end
)

function GameObject:getType()
	return self.type
end

function GameObject:addComponent(component)
	local type = component:getType()
	if self.components[type] == nil
	then
		table.insert(self.components, type, component)
		component:setObject(self)
		component:onAddedToObject()
	end
end

function GameObject:removeComponent(component)

end

function GameObject:onAddedToGame(game)
  self.game = game
end

function GameObject:getComponent(type)
	if not (self.components[type] == nil)
	then
		return self.components[type]
	end
	return nil
end

function GameObject:hasComponent(type)

end

function GameObject:update(dt)
	for k, v in pairs(self.components) do
		v:update(dt)
	end
end

function GameObject:setProperty(key, value)
	self.data[key] = value
end

function GameObject:getProperty(key)
	return self.data[key]
end

function GameObject:hasProperty(key)
	return (self.data[key] == nil)
end

function GameObject:sendMessage(message)
	for k, v in pairs(self.components) do
		v:receiveMessage(message)
	end
end

