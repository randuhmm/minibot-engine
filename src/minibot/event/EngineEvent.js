/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'./BaseEvent'
	],
	function
	(
		BaseEvent
	)
	{
		
		var EngineEvent = Class.create(
			BaseEvent,
			/** @lends event.EngineEvent# */
			{
				
				object: null,
				
				component: null,
				
				data: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function
				(
					$super,
					type,
					object,
					component,
					data
				)
				{
					$super(type, false, false);
					
					this.object = object;
					this.component = component;
					this.data = data;
				}
				
			}
		);
		
		return EngineEvent;
	
	}
);
