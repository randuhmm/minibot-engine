import EventDispatcher from 'minibot/event/EventDispatcher'

/**
 * Creates a new DisplayObject instance.
 * @class
 * @constructs
 * @name DisplayObject
 * @extends event.EventDispatcher
 */
var DisplayObject = function() {
  EventDispatcher.call(this);
};

DisplayObject.prototype = Object.create(EventDispatcher.prototype);
DisplayObject.prototype.constructor = DisplayObject;
DisplayObject.subclasses = [];

/**
 * The object that contains this DisplayObject.
 * @memberof DisplayObject.prototype
 * @type object
 */
DisplayObject.prototype.parent = null;

/**
 * Actions to be performed upon being added to a parent object.
 * @memberof DisplayObject.prototype
 */
DisplayObject.prototype.onAddedToParent = function() {
  // override
};

/**
 * Adds a resource to the map.
 * @param {} klass The class of the resource.
 * @param {type} type The type of the resource.
 * @param {Integer} id The id of the resource.
 */
DisplayObject.AddResource = function(klass, type, id) {
  if(klass.RESOURCES === undefined) klass.RESOURCES = {};
  if(klass.RESOURCES[type] === undefined) klass.RESOURCES[type] = {};
  klass.RESOURCES[type][id] = null;
};

/**
 * Adds an object to the map.
 * @param {} klass The class of the object.
 * @param {object} object
 */
DisplayObject.AddObject = function(klass, object) {
  if(klass.OBJECTS === undefined) klass.OBJECTS = [];
  klass.OBJECTS.push(object);
};

/**
 * Returns a resource of specified type and id.
 * @param {} klass The class of the resource.
 * @param {type} type The type of the resource.
 * @param {Integer} id The type of the resource.
 * @returns {resource} The resource. A result of null means the resource is not on the map.
 */
DisplayObject.GetResource = function(klass, type, id) {
  if(klass.RESOURCES === undefined) return null;
  if(klass.RESOURCES[type] === undefined) return null;
  if(klass.RESOURCES[type][id] === undefined) return null;
  return klass.RESOURCES[type][id];
};

DisplayObject.ALIGN_HORZ_CENTER = 1;

DisplayObject.ALIGN_VERT_CENTER = 2;

export default DisplayObject;
