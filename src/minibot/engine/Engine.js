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
		
		var Engine = Class.create(
			EventDispatcher,
			/** @lends engine.EngineComponent# */
			{
				
				initialize: function($super)
				{
					$super();
				},
				
				// Public Methods -->
				
				update: function()
				{
				
				},
				
				render: function()
				{
				
				}
				
				// <-- Public Methods
				
				
				
			}
		);
		
		return Engine;
	
	}
);
