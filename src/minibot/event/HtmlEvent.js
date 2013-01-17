define(
['minibot/utils', 'minibot/event/BaseEvent'],
function(utils, BaseEvent)
{
	return utils.define(
		{
			name: 'minibot.event.HtmlEvent',
			parent: BaseEvent
		},
		{
			
			initialize: function($super, type, event)
			{
				$super(type, event);
			}
			
		},
		{
			CLICK:			"HtmlEvent_Click",
			MOUSE_UP:		"HtmlEvent_MouseUp",
			MOUSE_DOWN:		"HtmlEvent_MouseDown",
			MOUSE_MOVE:		"HtmlEvent_MouseMove",
			
			KEY_DOWN:		"HtmlEvent_KeyDown",
			KEY_UP:			"HtmlEvent_KeyUp",
			
			FOCUS:			"HtmlEvent_Focus",
			BLUR:			"HtmlEvent_Blur"
		}
	)
});

