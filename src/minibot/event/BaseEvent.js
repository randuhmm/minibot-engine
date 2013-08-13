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
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function(type, bubbles, cancelable)
				{
					this.type = type;
					
					this.bubbles = ((bubbles == undefined)?(false):(bubbles));
					this.cancelable = ((cancelable == undefined)?(false):(cancelable));
				},
				
				preventDefault: function()
				{
					
				}
				
			}
		);
		
		return BaseEvent;
		
	}
);
