define(
['minibot/utils'],
function(utils)
{
	return utils.define(
		{
			name: 'minibot.event.BaseEvent'
		},
		{
			
			type: null,
			
			data: null,
			
			target: null,
			
			initialize: function(type, data)
			{
				this.type = type;
				this.data = data;
			},
			
			isTouchEvent: function()
			{
				return false;
			}
			
		}
	);
});
