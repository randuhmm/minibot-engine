
require 'utils/class'

ComponentMessage = class(
	function(o, type, data)
		if data == nil then data = {} end
		o.type = type
		o.data = data
	end
)
