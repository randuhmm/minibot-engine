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
		
		var DisplayObject = Class.create(
			EventDispatcher,
			/** @lends display.DisplayObject# */
			{
				
				parent: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends event.EventDispatcher
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
				},
				
				onAddedToParent: function()
				{
					
				},
				
				isCanvasObject: function()
				{
					return false;
				},
				
				isHtmlObject: function()
				{
					return false;
				}
				
			}
		);
		
		Object.extend(
			DisplayObject,
			/** @lends display.DisplayObject */
			{
				AddResource: function(klass, type, id)
				{
					if(klass.RESOURCES == undefined) klass.RESOURCES = {};
					if(klass.RESOURCES[type] == undefined) klass.RESOURCES[type] = {};
					klass.RESOURCES[type][id] = null;
				},
				
				AddObject: function(klass, object)
				{
					if(klass.OBJECTS == undefined) klass.OBJECTS = [];
					klass.OBJECTS.push(object);
				},
				
				GetResource: function(klass, type, id)
				{
					if(klass.RESOURCES == undefined) return null;
					if(klass.RESOURCES[type] == undefined) return null;
					if(klass.RESOURCES[type][id] == undefined) return null;
					return klass.RESOURCES[type][id];
				}
			}
		);
		
		return DisplayObject;
		
	}
);
