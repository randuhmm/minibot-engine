
require 'engine/object/Player'
require 'engine/component/player/PlayerPhysicsComponent'
require 'engine/component/player/PlayerInputComponent'
require 'engine/component/player/PlayerHealthComponent'

require 'engine/factory/EquipmentFactory'

PlayerFactory = {}

function PlayerFactory.Create(world, equipments)
	local player = Player()
	player:setProperty("x", 0)
	player:setProperty("y", 0)
	player:setProperty("health", 5)
	
	player:addComponent(PlayerPhysicsComponent(world))
	player:addComponent(PlayerInputComponent())
	player:addComponent(PlayerHealthComponent())
  
  -- Add equipments
  local e = {nil, nil, nil, nil, nil, nil, nil, nil}
  for i,v in ipairs(equipments) do
    e[i] = EquipmentFactory.Create(v, world)
	end
  player:setProperty("equipment", e)
  
	return player
end