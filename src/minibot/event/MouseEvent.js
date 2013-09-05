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
		
		var MouseEvent = Class.create(
			BaseEvent,
			/** @lends event.MouseEvent# */
			{
				
				x: null,
				
				y: null,
				
				displayObject: null,
				
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
					x,
					y,
					displayObject
				)
				{
					$super(type, bubbles, cancelable);
					
					this.x = x;
					
					this.y = y;
					
					this.displayObject = displayObject;
					
				}
				
			}
		);
		
		MouseEvent.CLICK			= "mouseClick";
		MouseEvent.MOUSE_DOWN		= "mouseDown";
		MouseEvent.MOUSE_UP			= "mouseUp";
		MouseEvent.MOUSE_MOVE		= "mouseMove";
		
		return MouseEvent;
	
	}
);
