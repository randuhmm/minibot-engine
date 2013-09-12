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
		
		var KeyboardEvent = Class.create(
			BaseEvent,
			/** @lends event.MouseEvent# */
			{
				
				key: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} type
				 * @param {Boolean} bubbles
				 * @param {Boolean} cancelable
				 * @param {Number} x
				 * @param {Number} y
				 * @param {display.DisplayObject} displayObject
				 * @param
				 */
				initialize: function
				(
					$super,
					type,
					bubbles,
					cancelable,
					key
				)
				{
					$super(type, bubbles, cancelable);
					
					this.key = key;
					
				}
				
			}
		);
		
		KeyboardEvent.KEY_DOWN			= "keyDown";
		KeyboardEvent.KEY_UP			= "keyUp";
		
		return KeyboardEvent;
	
	}
);
