/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[],
	function()
	{
		
		var BaseEvent = Class.create(
			/** @lends event.BaseEvent# */
			{
				
				type: null,
				
				target: null,
				
				currentTarget: null,
				
				bubbles: null,
				
				cancelable: null,
				
				currentPhase: null,
				
				/**
				 * Constructs a new BaseEvent
				 * @class This should describe the BaseEvent class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} type The type of event.
				 * @param {Boolean} bubbles Flags if the event bubbles after the capture phase.
				 * @param {Boolean} cancelable Flags if the event is able to cancel at any point in the event cycle.
				 */
				initialize: function(type, bubbles, cancelable)
				{
					this.type = type;
					
					this.bubbles = ((bubbles == undefined)?(false):(bubbles));
					this.cancelable = ((cancelable == undefined)?(false):(cancelable));
				},
				
				/**
				 * Function description goes here for "preventDefault"
				 */
				preventDefault: function()
				{
					
				}
				
			}
		);
		
		return BaseEvent;
		
	}
);
