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
				/**
				 * The object that contains this DisplayObject.
				 * @type object
				 */
				parent: null,
				
				/**
				 * Creates a new DisplayObject instance.
				 * @class The base object upon which objects are added to be displayed.
				 * The DisplayObject describes how and where to display objects onscreen.
				 * @extends event.EventDispatcher
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
				},
				/**
				 * Actions to be performed upon being added to a parent object.
				 */
				onAddedToParent: function()
				{
					// override
				}
				
			}
		);
		
		Object.extend(
			DisplayObject,
			/** @lends display.DisplayObject */
			{
				/**
				 * Adds a resource to the map.
				 * @param {} klass The class of the resource.
				 * @param {type} type The type of the resource.
				 * @param {Integer} id The id of the resource.
				 */
				AddResource: function(klass, type, id)
				{
					if(klass.RESOURCES == undefined) klass.RESOURCES = {};
					if(klass.RESOURCES[type] == undefined) klass.RESOURCES[type] = {};
					klass.RESOURCES[type][id] = null;
				},
				/**
				 * Adds an object to the map.
				 * @param {} klass The class of the object.
				 * @param {object} object
				 */
				AddObject: function(klass, object)
				{
					if(klass.OBJECTS == undefined) klass.OBJECTS = [];
					klass.OBJECTS.push(object);
				},
				/**
				 * Returns a resource of specified type and id.
				 * @param {} klass The class of the resource.
				 * @param {type} type The type of the resource.
				 * @param {Integer} id The type of the resource.
				 * @returns {resource} The resource. A result of null means the resource is not on the map.
				 */
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
