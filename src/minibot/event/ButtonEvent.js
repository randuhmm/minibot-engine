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
		
		var ButtonEvent = Class.create(
			BaseEvent,
			/** @lends event.MouseEvent# */
			{

				/** The object upon which the mouse is displayed.
				 * @type display.DisplayObject
				 */ 
				displayObject: null,
				
				/**
				 * Constructs a MouseEvent instance.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} type The type of event.
				 * @param {Boolean} bubbles Indicates a bubbling event.
				 * @param {Boolean} cancelable Indicates whether the event action can be terminated.
				 * @param {Number} x The x coordinate of the MouseEvent.
				 * @param {Number} y The y coordinate of the MouseEvent.
				 * @param {display.DisplayObject} displayObject The object upon which the mouse is displayed.
				 * @param
				 */
				initialize: function
				(
					$super,
					type, 
					bubbles,
					cancelable,
					displayObject
				)
				{
					$super(type, bubbles, cancelable);

					this.displayObject = displayObject;
					
				}
				
			}
		);
		
		ButtonEvent.SELECT			= "buttonSelect";
		
		return ButtonEvent;
	
	}
);
