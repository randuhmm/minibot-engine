define(
['minibot/utils', 'minibot/event/BaseEvent'],
function(utils, BaseEvent)
{
	return utils.define(
		{
			name: 'minibot.event.UIEvent',
			parent: BaseEvent
		},
		{
			
			canvasX: null,
			canvasY: null,
			
			x: null,
			y: null,
			
			initialize: function($super, type, data, x, y)
			{
				this.canvasX = x;
				this.canvasY = y;
				this.x = x;
				this.y = y;
				$super(type, data);
			},
			
			isTouchEvent: function()
			{
				return true;
			}
			
		},
		{
			TOUCH_START: "uIEvent_TouchStart",
			TOUCH_MOVE: "uIEvent_TouchMove",
			TOUCH_END: "uIEvent_TouchEnd",
			
			FOCUS: "uIEvent_Focus",
			BLUR: "uIEvent_Blur",
		}
	)
});

