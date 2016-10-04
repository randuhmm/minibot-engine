(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //Allow using this built library as an AMD module
        //in another project. That other project will only
        //see this AMD call, not the internal modules in
        //the closure below.
        define(factory);
    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.minibot = factory();
    }
}(this, function () {
    //almond, and your modules will be inlined here
/**
 * almond 0.2.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name) && !defining.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (defined.hasOwnProperty(depName) ||
                           waiting.hasOwnProperty(depName) ||
                           defining.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());
define("../lib/almond", function(){});

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/EventDispatcher',
	[],
	function()
	{
		
		var EventDispatcher = Class.create(
			/** @lends event.EventDispatcher# */
			{
				/**
				 * Map of eventListeners availiable.
				 * @type json
				 */
				listeners: null,
				
				/**
				 * Creates a new EventDispatcher instance.
				 * @class Relegates and dispatches events to a target.
				 * Events can be attached to targets in order to keep the flow of processes running as intended.
				 * @constructs
				 */
				initialize: function()
				{
					this.listeners = {};
				},
				/**
				 * Registers an eventListener to a target.
				 * @param {type} type The data type of event the specified listener is looking for.
				 * @param {object} callback The listener object that recieves the specified type.
				 */
				addEventListener: function(type, callback)
				{
					var callbacks;
					if(this.listeners[type] == undefined) {
						callbacks = new Array();
						this.listeners[type] = callbacks;
					} else {
						callbacks = this.listeners[type];
					}
					callbacks.push(callback);
				},
				/**
				 * Returns whether or not the EventDispatcher has an event listener for the specified type.
				 * @param {type} type The data type of the event the specified listener is looking for.
				 * @returns {boolean} A value indicating whether or not an event listener for the specified type is available.
				 */
				hasEventListener: function(type)
				{
					return (this.listeners[type] != undefined);
				},
				/**
				 * Sends the event to the EventDispatcher to be sent into the event flow.
				 * @param {event} event The event to be sent into the event flow.
				 * @returns {boolean} A value indicating whether or not the event was successfully dispatched.
				 */
				dispatchEvent: function(event)
				{
					var callbacks;
					if(this.listeners[event.type] == undefined) {
						return false;
					} else {
						callbacks = this.listeners[event.type];
					}
					event.target = this;
					for(var i = 0; i < callbacks.length; i++) {
						var callback = callbacks[i];
						callback(event);
					}
					return true;
				},
				/**
				 * Gets rid of an eventListener.
				 * @param {type} type The type of data the specified listener is looking for.
				 * @param {object} callback The listener object that recieves the specified type.
				 */
				removeEventListener: function(type, callback)
				{
					var callbacks;
					if(this.listeners[type] == undefined) {
						return;
					} else {
						callbacks = this.listeners[type];
					}
					var i = callbacks.indexOf(callback);
					if(i == -1) return;
					callbacks.splice(i, 1);
					
					// Remove the callbacks array from the map if empty
					if(callbacks.length == 0) {
						delete this.listeners[type];
					}
				},
				/**
				 * Gets rid of all eventListeners on the map.
				 */
				removeAllEventListeners: function()
				{
					this.listeners = {};
				}
				
			}
		);
		
		return EventDispatcher;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/display/DisplayObject',
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
		
		DisplayObject.ALIGN_HORZ_CENTER = 1;
		DisplayObject.ALIGN_VERT_CENTER = 2;
		
		return DisplayObject;
		
	}
);

define('minibot/display/scene/SceneDisplayObject',
	[
		'minibot/display/DisplayObject'
	],
	function
	(
		DisplayObject
	)
	{
		
		var SceneDisplayObject = Class.create(
			DisplayObject,
			/** @lends display.scene.SceneDisplayObject# */
			{
				/** The x position of the SceneDisplayObject.
				 * @type Number
				 */
				x: 0,
				/** The y position of the SceneDisplayObject.
				 * @type Number
				 */
				y: 0,
				/** The width of the SceneDisplayObject.
				 * @type Number
				 */
				w: 0,
				/** The height position of the SceneDisplayObject.
				 * @type Number
				 */
				h: 0,
				/** The root directory.
				 * @type String
				 */
				root: null,
				/** The current scene.
				 * @type display.scene
				 */
				scene: null,
				/** Indicates whether or not the SceneDisplayObject is able to be seen.
				 * @type boolean
				 */
				isVisible: true,
				
				/**
				 * Creates a new SceneDisplayObject instance.
				 * @class The scenedisplay object manages both the scene as well as the objects to be displayed. 
				 * Objects can be added and removed from the scene while choosing what is to be rendered.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
				},
				/** Renders the SceneDisplayObject and its components.
				 * @param {Number} dt The change in time.
				 * @param {Number} x The x position at which the rendering occurs.
				 * @param {Number} y The y position at which the rendering occurs.
				 */
				render: function(dt, x, y)
				{
					// This function must be overloaded in the sub class
				},
				/** Actions to be triggered when a scene object is added to a scene.
				 *
				 */
				onAddedToScene: function()
				{
					// This callback is triggered when a scene object is added to a scene
				},
				/** Actions to be triggered when a scene object is removed from a scene.
				 *
				 */
				onRemovedFromScene: function()
				{
					// This callback is triggered when a scene object is removed from a scene
				},
				/** Retrieves the scene's X field.
				 * @returns display.scene
				 */
				getScene: function()
				{
					return this.scene;
				},
				/** Retrieves the scene object's width.
				 * @returns display.scene
				 */
				getWidth: function()
				{
					return this.w;
				},
				/** Retrieves the scene object's height.
				 * @returns display.scene
				 */
				getHeight: function()
				{
					return this.h;
				},
				/** Retrieves the scene's X field.
				 * @returns display.scene
				 */
				getSceneX: function()
				{
					var sceneX = 0;
					if(this.parent != null) {
						sceneX += this.parent.getSceneX();
					}
					sceneX += this.x;
					return sceneX;
				},
				/** Retrieves the scene's Y field.
				 * @returns display.scene
				 */
				getSceneY: function()
				{
					var sceneY = 0;
					if(this.parent != null) {
						sceneY += this.parent.getSceneY();
					}
					sceneY += this.y;
					return sceneY;
				},
				/** Sets a root directory.
				 * @param {String} root The root specified.
				 */
				setRoot: function(root)
				{
					this.root = root;
				},
				/** Chooses the current scene.
				 * @param {display.scene} scene The scene to be set.
				 */
				setScene: function(scene)
				{
					this.scene = scene;
				},
				/** Sets the sceneDisplayObject's width.
				 * @param {Number} width The specified width.
				 */
				setWidth: function(width)
				{
					this.w = width;
				},
				/** Sets the sceneDisplayObject's height.
				 * @param {Number} height The specified height.
				 */
				setHeight: function(height)
				{
					this.h = height;
				},
				/** Sets the sceneDisplayObject to be invisible. */
				hide: function()
				{
					this.isVisible = false;
				},
				/** Sets the sceneDisplayObject to be visible. */
				show: function()
				{
					this.isVisible = true;
				},
				
				setAlign: function(align, objects, recursive)
				{
					if(!(objects instanceof Array)) objects = [ objects ];
					if(recursive == undefined) recursive = false;
					
					var object, t, o;
					switch(align) {
						case DisplayObject.ALIGN_HORZ_CENTER:
							var t = this.getSceneX() + (this.getWidth()/2);
							for(var i = 0; i < objects.length; i++) {
								object = objects[i];
								o = object.getSceneX() + (object.getWidth()/2);
								object.x += t - o;
							}
							break;
						case DisplayObject.ALIGN_VERT_CENTER:
							var t = this.getSceneY() + (this.getHeight()/2);
							for(var i = 0; i < objects.length; i++) {
								object = objects[i];
								o = object.getSceneY() + (object.getHeight()/2);
								object.y += t - o;
							}
							break
					}
				},
				
			}
		);
		
		return SceneDisplayObject;
		
	}
);

define('minibot/display/scene/Container',
	[
		'./SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		
		var Container = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Container# */
			{
				/** Array containing the Container layers
				 * @type Array
				 */ 
				layers: null,
				/** Boolean indicating touch events attached.
				 * @type boolean
				 */
				touchChildren: true,
				/** Indicates whether or not the container is able to be resized.
				 * @type boolean
				 */
				resizable: true,
				
				scalable: true,
				
				scale: 1,
				
				/** Appends a child to the container.
				 * @param {display.DisplayObject} displayObject The display object to be added.
				 * @param {Number} layer The layer to be added.
				 * @param {Number} The position of the layer.
				 */
				initialize: function($super)
				{
					$super();
					
					this.layers = new Array();
				},
				
				addChild: function(displayObject, layer, position)
				{
					if(layer == undefined) layer = 0;
					while(this.layers.length <= layer) this.layers.push(new Array());
					if(position == undefined) position = this.layers[layer].length;
					
					//this.layers[layer].push(displayObject);
					this.layers[layer].splice(position, 0, displayObject);
					
					if(this.scalable && this.scale != 1) {
						displayObject.w *= this.scale;
						displayObject.h *= this.scale;
						displayObject.x *= this.scale;
						displayObject.y *= this.scale;
					}
					
					if(this.root != null) {
						displayObject.root = this.root;
						displayObject.scene = this.scene;
						displayObject.parent = this;
						displayObject.onAddedToScene();
					}
					
					if(this.resizable) {
						// Expand the container object dimensions to hold the object
						if(this.w < (displayObject.x + displayObject.w)) this.w = displayObject.x + displayObject.w;
						if(this.h < (displayObject.y + displayObject.h)) this.h = displayObject.y + displayObject.h;
					}
				},
				/** Removes a child from the container.
				 * @param {display.DisplayObject} displayObject The object to be removed.
				 */
				removeChild: function(displayObject)
				{
					for(var l = 0; l < this.layers.length; l++) {
						var layer = this.layers[l];
						for(var d = 0; d < layer.length; d++) {
							if(displayObject === layer[d]) {
								layer.splice(d, 1);
								displayObject.onRemovedFromScene();
								return;
							}
						}
					}
				},
				/** Removes all children from the container. */
				removeAll: function()
				{
					var layers = this.layers;
					var displayObject;
					for(var l = 0; l < layers.length; l++) {
						var layer = layers[l];
						for(var d = 0; d < layer.length; d++) {
							displayObject = layer[d]
							displayObject.onRemovedFromScene();
						}
					}
					this.layers = new Array();
				},
				/** Renders the objects within the container layers.
				 * @param {Number} dt The change in time.
				 * @param {Number} x The x position.
				 * @param {Number} y The y position.
				 */
				render: function(dt, x, y)
				{
					if(this.scene == null) return;
					if(x == undefined) x = 0;
					if(y == undefined) y = 0;
					
					var	l,
						d,
						layer,
						displayObject,
						xBounds,
						yBounds;
					
					for(l = 0; l < this.layers.length; l++) {
						layer = this.layers[l];
						for(d = 0; d < layer.length; d++) {
							displayObject = layer[d];
							
							// check if the display object is visible
							if(!displayObject.isVisible) continue;
							
							// check if the display object is outside the scene
							xBounds = this.x + x + displayObject.x;
							yBounds = this.y + y + displayObject.y;
							if(
								xBounds >= this.root.w ||
								xBounds < -1 * displayObject.w ||
								yBounds >= this.root.h ||
								yBounds < -1 * displayObject.h
							) continue;
							
							// render the display object
							displayObject.render(dt, this.x + x, this.y + y);
						}
					}
				},
				/** Sets the child objects index within the layers.
				 * @param {display.DisplayObject} displayObject The display object to be modified.
				 * @param {Number} index The specified index to be set.
				 */
				setChildIndex: function(displayObject, index)
				{
					for(var l = 0; l < this.layers.length; l++) {
						var layer = this.layers[l];
						for(var d = 0; d < layer.length; d++) {
							if(displayObject === layer[d]) {
								
								if(index >= layer.length) return;
								
								layer.splice(d, 1);
								layer.splice(index, 0, displayObject);
								
								return;
							}
						}
					}
				},
				/** Uses the event dispatcher to handle events.
				 * @param {event} event The specified event.
				 * @param {}
				 */
				dispatchEvent: function($super, event)
				{
					/*
					if(event.isTouchEvent()) {
						if(!this.touchEnabled) return false;
						if(!this.touchChildren) return $super(event);
					}
					*/
					
					var captured = false;
					var dispatched = false;
					
					var l,
						d,
						layer,
						displayObject;
					
					if(('x' in event) && ('y' in event)) {
						event.x -= this.x;
						event.y -= this.y;
						for(l = (this.layers.length - 1); l >= 0; l--) {
							layer = this.layers[l];
							for(d = (layer.length - 1); d >= 0; d--) {
								displayObject = layer[d];
								
								// skip if the object is invisible
								if(!displayObject.isVisible) continue;
								
								if(
									event.x >= displayObject.x && 
									event.x <= (displayObject.x + displayObject.w) && 
									event.y >= displayObject.y && 
									event.y <= (displayObject.y + displayObject.h)
								) {
									dispatched = displayObject.dispatchEvent(event);
									captured = true;
								}
								if(captured) break;
							}
							if(captured) break;
						}
					}
					
					if(!dispatched) {
						if(('x' in event) && ('y' in event)) {
							event.x += this.x;
							event.y += this.y;
						}
						return $super(event);
					} else {
						return true;
					}
				},
				/** Actions to be carried out upon being attached to a scene. 
				 * @param {}
				 */
				onAddedToScene: function($super)
				{
					$super();
					
					var l,
						d,
						layer,
						displayObject;
					
					for(l = 0; l < this.layers.length; l++) {
						layer = this.layers[l];
						for(d = 0; d < layer.length; d++) {
							displayObject = layer[d];
							displayObject.root = this.root;
							displayObject.scene = this.scene;
							displayObject.parent = this;
							displayObject.onAddedToScene();
						}
					}
				},
				/** Actions to be carried out upon being removed from a scene. 
				 * @param {}
				 */
				onRemovedFromScene: function($super)
				{
					$super();
					for(var l = 0; l < this.layers.length; l++) {
						var layer = this.layers[l];
						for(var d = 0; d < layer.length; d++) {
							layer[d].onRemovedFromScene();
						}
						this.layers[l] = null;
					}
					this.layers = new Array();
				},
				
				// Updated this function to scale internal components if it is scalable
				setScale: function(scale)
				{
					if(!this.scalable) return;
					
					var s = scale / this.scale;
					
					for(l = 0; l < this.layers.length; l++) {
						layer = this.layers[l];
						for(d = 0; d < layer.length; d++) {
							displayObject = layer[d];
							displayObject.w *= s;
							displayObject.h *= s;
							displayObject.x *= s;
							displayObject.y *= s;
						}
					}
					this.w *= s;
					this.h *= s;
					
					this.scale = scale;
				}
				
				/*
				,
				
				align: function(align, objects, recursive)
				{
					if(!(objects instanceof Array)) objects = [ objects ];
					if(recursive == undefined) recursive = false;
					
					var cx = this.getSceneX() + (this.getWidth()/2);
					var cy = this.getSceneY() + (this.getHeight()/2);
					var object, ox, oy;
					
					for(var i = 0; i < objects.length; i++) {
						object = objects[i];
						ox = object.getSceneX() + (object.getWidth()/2);
						oy = object.getSceneY() + (object.getHeight()/2);
						object.x += cx - ox;
						object.y += cy - oy;
					}
					
				}
				*/
			}
		);
		
		return Container;
		
	}
);

define('minibot/display/scene/Scene',
	[
		'minibot/event/EventDispatcher',
		'./Container'
	],
	function
	(
		EventDispatcher,
		Container
	)
	{
		
		var Scene = Class.create(
			/** @lends display.scene.Scene# */
			{
				/** The scene container.
				 * @type display.scene.Container
				 */
				container: null,
				/** The scene width.
				 * @type Number
				 */
				width: null,
				/** The scene height.
				 * @type Number
				 */
				height: null,
				/** The scene options
				 * @type Object
				 */
				options: null,
				
				/**
				 * Constructs a new scene instance.
				 * @class Creates a new scene within a specified container.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function(options)
				{
					
					this.options = options;
					
					this.container = new Container();
					this.container.resizable = false;
					this.container.setRoot(this.container);
					this.container.setScene(this);
					
				},
				
				// Public Methods -->
				
				hasOption: function(key)
				{
					return this.options[key] != undefined;
				},
				
				getOption: function(key)
				{
					return this.options[key];
				},
				
				getBuffer: function()
				{
		
				},
				
				/** Set the width of the scene.
				 * @param {Number} width The width desired.
				 */
				setWidth: function(width)
				{
					this.width = width;
					this.container.setWidth(width);
				},
				
				/** Returns the width of the scene.
				 * @returns {Number}
				 */
				getWidth: function()
				{
					return this.width;
				},
				
				/** Set the height of the scene.
				 * @param {Number} height The height desired.
				 */
				setHeight: function(height)
				{
					this.height = height;
					this.container.setHeight(height);
				},
				
				/** Returns the height of the scene.
				 * @returns {Number}
				 */
				getHeight: function()
				{
					return this.height;
				},
				
				/** Appends a child to the specified container.
			     @param {display.DisplayObject} displayObject The displayObject to add.
				 @param {layer} layer The layer to be added to.
				 */
				addChild: function(displayObject, layer)
				{
					if(layer == undefined || layer == null) layer = 0;
					this.container.addChild(displayObject, layer);
				},
				
				/** Removes a child from the specified container.
			     @param {display.DisplayObject} displayObject The displayObject to remove.
				 *//** Removes all children from the specified container. */
				removeChild: function(displayObject)
				{
					this.container.removeChild(displayObject);
				},
				
				/** Removes all children from the specified container. */
				removeAllChildren: function()
				{
					this.container.removeAll();
				},
				
				/** Renders the scene
				 * @param {Number} dt The change in time.
				 */
				render: function(dt)
				{
					this.container.render(dt);
				},
				
				clear: function()
				{
					// overload in subclass
				},
				
				// Graphics Methods -->
				
				drawBuffer: function()
				{
					
				},
				
				/** Draws an image.
				 * @param {resource.ImageResource} image The image to be drawn.
				 * @param {Number} sx The starting x position of the image.
				 * @param {Number} sy The starting y position of the image.
				 * @param {Number} sw The starting width of the image.
				 * @param {Number} sh The starting height of the image.
		   		 * @param {Number} dx The x position to place the image.
				 * @param {Number} dy The y position to place the image.
				 * @param {Number} dw The destination width.
				 * @param {Number} dh The destination height.
				 */
				drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh)
				{
				
				},

				/** Draws a line.
				 * @param {Number} x1 The starting x coordinate.
				 * @param {Number} x2 The ending x coordinate.
				 * @param {Number} y1 The starting y coordinate.
				 * @param {Number} y2 The ending y coordinate.
				 */
				drawLine: function(x1, y1, x2, y2)
				{
					
				},

				/** Draws a Rectangle.
				 * @param {Number} Mode Represents whether or not to fill the rectangle.
				 * @param {Number} x The starting x coordinate.
				 * @param {Number} y The starting y coordinate.
				 * @param {Number} w The width of the rectangle.
				 * @param {Number} h The height of the rectangle.
				 */
				drawRect: function(mode, x, y, w, h)
				{

				},

				/** Sets the fill color.
				 * @param {graphics.Color} color The color to be used.
				 */
				setFillColor: function(color)
				{
					
				},

				/** Sets the fill pattern.
				 * @param {graphics.Pattern} pattern The pattern to be used.
				 */
				setFillPattern: function(pattern)
				{
					
				},

				/** Sets the line color.
				 * @param {graphics.Color} color The color to be used.
				 */
				setLineColor: function(color)
				{
					
				},

				/** Sets the line style.
				 * @param {object} style The style to be used.
				 */
				setLineStyle: function(style)
				{
				
				},

				/** Sets the line width.
				 * @param {Number} width The width to be used.
				 */
				setLineWidth: function(width)
				{
				
				},

				/** Save
				 */
				save: function()
				{

				},
				
				/** Restore
				 */
				restore: function()
				{

				},
				
				/** Translate
				 * @param {Number} x 
				 * @param {Number} y 
				 */
				translate: function(x, y)
				{

				},
				
				/** Rotate
				 * @param {Number} a 
				 */
				rotate: function(a)
				{

				},
		
				// <-- Graphics Methods
				
				// Event Methods -->
				
				addEventListener: function(type, callback)
				{
					this.container.addEventListener(type, callback);
				},
				
				hasEventListener: function(type)
				{
					return this.container.addEventListener(type);
				},
				
				dispatchEvent: function(event)
				{
					return this.container.dispatchEvent(event);
				},
				
				removeEventListener: function(type, callback)
				{
					this.container.removeEventListener(type, callback);
				},
				
				removeAllEventListeners: function()
				{
					this.container.removeAllEventListeners();
				}
				
				// <-- Event Methods
				
				// <-- Public Methods
				
				
			}
		);
		
		Scene.MOUSE_EVENTS = 1;
		Scene.KEYBOARD_EVENTS = 2;
		Scene.TOUCH_EVENTS = 4;

		return Scene;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/BaseEvent',
	[],
	function()
	{
		
		var BaseEvent = Class.create(
			/** @lends event.BaseEvent# */
			{
				/** The type of event. 
				 * @type string
				 */
				type: null,
				/** The event target.
				 * @type object
				 */
				target: null,
				/** The object that is actively uses an eventListener on the Event object.
				 * @type object
				 */
				currentTarget: null,
				/** Indictes a bubbling event.
				 * @type bool
				 */
				bubbles: null,
				/** Indicates if the action associated with an event can be terminated.
				 * @type bool
				 */
				cancelable: null,
				/** The current phase of the event flow.
				 * @type object
				 */
				currentPhase: null,

				/**
				 * Constructs a new BaseEvent instance.
				 * @class An event class that can process specific events.
				 * Passes on objects to specific management events.
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
				 * Stops the default action of the event from being carried out.
				 */
				preventDefault: function()
				{
					
				}
				
			}
		);
		
		return BaseEvent;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/MouseEvent',
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
				/** The x coordinate of the MouseEvent.
				 * @type Integer
				 */
				x: null,
				/** The y coordinate of the MouseEvent.
				 * @type Integer
				 */
				y: null,
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

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/TouchEvent',
	[
		'./BaseEvent'
	],
	function
	(
		BaseEvent
	)
	{
		
		var TouchEvent = Class.create(
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
		
		TouchEvent.TOUCH_START		= "touchStart";
		TouchEvent.TOUCH_END		= "touchEnd";
		TouchEvent.TOUCH_MOVE		= "touchMove";
		
		return TouchEvent;
	
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/KeyboardEvent',
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

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/enum/Keyboard',
	[
	],
	function
	(
	)
	{
		
		var Keyboard = {
			KEY_A: 'A',
			KEY_B: 'B',
			KEY_C: 'C',
			KEY_D: 'D',
			KEY_E: 'E',
			KEY_F: 'F',
			KEY_G: 'G',
			KEY_H: 'H',
			KEY_I: 'I',
			KEY_J: 'J',
			KEY_K: 'K',
			KEY_L: 'L',
			KEY_M: 'M',
			KEY_N: 'N',
			KEY_O: 'O',
			KEY_P: 'P',
			KEY_Q: 'Q',
			KEY_R: 'R',
			KEY_S: 'S',
			KEY_T: 'T',
			KEY_U: 'U',
			KEY_V: 'V',
			KEY_W: 'W',
			KEY_X: 'X',
			KEY_Y: 'Y',
			KEY_Z: 'Z',
			
			KEY_0: 0,
			KEY_1: 1,
			KEY_2: 2,
			KEY_3: 3,
			KEY_4: 4,
			KEY_5: 5,
			KEY_6: 6,
			KEY_7: 7,
			KEY_8: 8,
			KEY_9: 9,
			
			KEY_UP:		10,
			KEY_RIGHT:	11,
			KEY_DOWN:	12,
			KEY_LEFT:	13,
			
			KEY_SPACE: ' '
			
		}
		
		return Keyboard;
	
	}
);

define('minibot/graphics/Color',
	[
		
	],
	function
	(
		
	)
	{
		
		var Color = Class.create(
			/** @lends graphics.Color# */
			{
				
				r: null,
				
				g: null,
				
				b: null,
				
				h: null,
				
				s: null,
				
				l: null,
				
				a: null,
				
				mode: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function(mode, v1, v2, v3, a)
				{
					this.type = Color.TYPE;
					this.setColor(mode, v1, v2, v3, a);
				},
				
				// Public Methods -->
				
				setColor: function(mode, v1, v2, v3, a)
				{
					this.mode = mode;
					this.a = ((a != undefined)?(a):(1.0));
					if(mode == Color.RGB) {
						this.r = v1;
						this.g = v2;
						this.b = v3;
					} else if(mode == Color.HSL) {
						this.h = v1;
						this.s = v2;
						this.l = v3;
						var rgb = Color.HslToRgb(this.h, this.s, this.l);
						this.r = Math.round(rgb[0]);
						this.g = Math.round(rgb[1]);
						this.b = Math.round(rgb[2]);
					} else {
						throw new Error("Color: unrecognized color mode.");
					}
				},
				
				getAsArray: function(mode)
				{
					if(mode == Color.RGB) {
						return [this.r, this.g, this.b, this.a];
					} else if(mode == Color.HSL) {
						return [this.h, this.s, this.l, this.a];
					} else {
						throw new Error("Color: unrecognized color mode.");
					}
				},
				
				getAsString: function(mode, spacer)
				{
					spacer = ((spacer == undefined)?(","):(spacer));
					return this.getAsArray(mode).join(spacer);
				}
				
				// <-- Public Methods
				
				
				
				
			}
		);
		
		Color.RgbToHsl = function(r, g, b)
		{
		};
		
		Color.HslToRgb = function(h, s, l)
		{
			if(s <= 0) { return [l,l,l]; }
			h = h / 256 * 6;
			s = s / 255;
			l = l / 255
			var	c = (1 - Math.abs(2 * l - 1)) * s,
				x = (1 - Math.abs(h % 2 - 1)) * c,
				m = (l - 0.5 * c),
				r = 0,
				g = 0,
				b = 0;
				
					if(h < 1)	{ r = c; g = x; b = 0 }
			else	if(h < 2)	{ r = x; g = c; b = 0 }
			else	if(h < 3)	{ r = 0; g = c; b = x }
			else	if(h < 4)	{ r = 0; g = x; b = c }
			else	if(h < 5)	{ r = x; g = 0; b = c }
			else				{ r = c; g = 0; b = x }
			
			return [(r+m)*255,(g+m)*255,(b+m)*255]
		};
		
		Color.FromHex = function(hex)
		{
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if(result) {
				return new Color(
					Color.RGB,
					parseInt(result[1], 16), // r
					parseInt(result[2], 16), // g
					parseInt(result[3], 16)  // b
				);
			} else {
				return null;
			}
			return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
			} : null;
		};
		
		Color.RGB = "rgb";
		Color.HSL = "hsl";

		
		Color.TYPE = 'color';
		
		return Color;
		
	}
);

define('minibot/display/scene/Buffer',
	[
		'./Container'
	],
	function
	(
		Container
	)
	{
		
		var Buffer = Class.create(
			Container,
			/** @lends display.scene.Buffer# */
			{
				
				bufferScene: null,
				
				initialize: function($super, scene)
				{
					
					$super();
					
					this.bufferScene = scene;
					
					this.resizable = false;
				},
				
				renderBuffer: function(x, y)
				{
					var tempScene = this.scene;
					var tempRoot = this.root;
					
					this.root = this;
					this.scene = this.bufferScene;
					this.onAddedToScene();
					
					Container.prototype.render.call(this, 0, x, y)
					
					this.root = tempRoot;
					this.scene = tempScene;
				},
				
				render: function()
				{
				
				}
				
			}
		);
		
		return Buffer;
		
	}
);

define('minibot/display/html/CanvasBuffer',
	[
		'minibot/display/scene/Buffer'
	],
	function
	(
		Buffer
	)
	{
		
		var CanvasBuffer = Class.create(
			Buffer,
			/** @lends display.html.CanvasBuffer# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.html.HtmlElement
				 * @constructs
				 */
				initialize: function($super, scene)
				{
					$super(scene);
				},
				
				setWidth: function($super, width)
				{
					$super(width);
					this.bufferScene.setWidth(width);
				},
				
				setHeight: function($super, height)
				{
					$super(height);
					this.bufferScene.setHeight(height);
				},
				
				render: function(dt, x, y)
				{
					var element = this.bufferScene.getElement();
					this.scene.drawImage(element, x*-1, y*-1, this.scene.width, this.scene.height, 0, 0, this.scene.width, this.scene.height);
				}
				
			}
		);
		
		return CanvasBuffer;
		
	}
);
define('minibot/display/html/CanvasScene',
	[
		'minibot/display/scene/Scene',
		'minibot/event/MouseEvent',
		'minibot/event/TouchEvent',
		'minibot/event/KeyboardEvent',
		'minibot/event/enum/Keyboard',
		'minibot/graphics/Color',
		'minibot/display/html/CanvasBuffer'
	],
	function
	(
		Scene,
		MouseEvent,
		TouchEvent,
		KeyboardEvent,
		Keyboard,
		Color,
		CanvasBuffer
	)
	{
		
		var CanvasScene = Class.create(
			Scene,
			/** @lends display.html.CanvasScene# */
			{
				
				element: null,
				
				context: null,
				
				ratio: null,

				enableEvents: null,

				eventTypes: null,
				
				mouseBfx: null,
				
				keyboardBfx: null,
				
				touchBfx: null,
				
				maxTouches: null,
				touchMap: null,
				touchCount: null,

				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.html.HtmlElement
				 * @constructs
				 */
				initialize: function($super, options)
				{
					if(options == undefined) options = {};

					$super(options);
					
					this.element = ((this.hasOption('element'))?(this.getOption('element')):(new Element('canvas')));
					this.enableEvents = ((this.hasOption('enableEvents'))?(this.getOption('enableEvents')):(true));
					this.eventTypes = ((this.hasOption('eventTypes'))?(this.getOption('eventTypes')):(Scene.MOUSE_EVENTS));
					this.maxTouches = ((this.hasOption('maxTouches'))?(this.getOption('maxTouches')):(1));
					
					this.setWidth((this.hasOption('width')?(this.getOption('width')):(this.element.width)));
					this.setHeight((this.hasOption('height')?(this.getOption('height')):(this.element.height)));

					this.ratio = 1;
					if(this.hasOption('ratio')) {
						this.ratio = this.getOption('ratio');
						if(this.ratio != 1) {
							this.element.style.width = this.element.width/this.ratio + "px";
							this.element.style.height = this.element.height/this.ratio + "px";
						}
					}
					
					this.context = this.element.getContext("2d");

					this.touchMap = {};
					this.touchCount = 0;
					
					if(this.enableEvents) {

						if(this.eventTypes & Scene.MOUSE_EVENTS) {
							// Mouse Event Handling
							this.mouseBfx = this.handleMouseEvent.bind(this);
							this.element.observe('mousedown', this.mouseBfx);
							this.element.observe('mouseup', this.mouseBfx);
							this.element.observe('mousemove', this.mouseBfx);
						}

						if(this.eventTypes & Scene.TOUCH_EVENTS) {
							// Mouse Event Handling
							this.touchBfx = this.handleTouchEvent.bind(this);
							this.element.observe('touchstart', this.touchBfx);
							this.element.observe('touchend', this.touchBfx);
							this.element.observe('touchmove', this.touchBfx);
						}
						
						if(this.eventTypes & Scene.KEYBOARD_EVENTS) {
							// Keyboard Event Handling
							this.keyboardBfx = this.handleKeyboardEvent.bind(this);
							document.observe('keydown', this.keyboardBfx);
							document.observe('keyup', this.keyboardBfx);
						}

					}
				},
				
				setWidth: function($super, width)
				{
					$super(width);
					this.element.width = width;
				},
				
				setHeight: function($super, height)
				{
					$super(height);
					this.element.height = height;
				},
				
				getElement: function()
				{
					return this.element;
				},
				
				clear: function()
				{
					this.setWidth(this.width);
				},
				
				drawImage: function(image, sx, sy, sw, sh, dx, dy, dw, dh)
				{
					this.context.drawImage(
						image,
						sx,
						sy,
						sw,
						sh,
						dx,
						dy,
						dw,
						dh
					);
				},
				
				drawLine: function(x1, y1, x2, y2)
				{
					this.context.beginPath();
					this.context.moveTo(x1, y1);
					this.context.lineTo(x2, y2);
					this.context.stroke();
				},
				
				drawPoly: function(mode, c, closed)
				{
					/*
					this.context.beginPath();
					this.context.moveTo(x1, y1);
					this.context.lineTo(x2, y2);
					this.context.stroke();
					*/
				},
				
				drawRect: function(mode, x, y, w, h)
				{
					this.context.fillRect(x,y,w,h); 
				},
				
				drawText: function(mode, text, style, x, y)
				{
					if(style != null) {
						this.context.font = style.getWeight() + " " + style.getSize() + "pt " + style.getFamily();
						var color = style.getColor();
						if(color) this.setFillColor(color);
						var align = style.getAlign();
						if(align) this.context.textAlign = align; 
					}
					
					this.context.fillText(text, x, y);
				},
				
				createBuffer: function()
				{
					var scene = new CanvasScene();
					var buffer = new CanvasBuffer(scene);
					return buffer;
				},
				
				drawBuffer: function(buffer)
				{
					// draws a buffer object to the scene
				},
				
				setFillColor: function(color)
				{
					this.context.fillStyle = 'rgba('+color.getAsString(Color.RGB)+')';
				},
				
				setFillPattern: function(pattern)
				{
					if(!pattern.hasPattern()) {
						var ps = pattern.sprite;
						var scene = new CanvasScene();
						scene.setWidth(ps.w);
						scene.setHeight(ps.h);
						scene.drawImage(
							ps.sprite.img,
							ps.sprite.x, //sx,
							ps.sprite.y, //sy,
							ps.sprite.w, //sw,
							ps.sprite.h, //sh,
							ps.x, //dx,
							ps.y, //dy,
							ps.w, //dw,
							ps.h //dh
						);

						pattern.setPattern(this.context.createPattern(scene.getElement(), pattern.repeat));
					}
					this.context.fillStyle = pattern.getPattern();
				},
				
				setLineColor: function(color)
				{
					
				},
				
				setLineStyle: function(style)
				{
				
				},
				
				setLineWidth: function(width)
				{
				
				},

				save: function()
				{
					this.context.save();
				},
				
				restore: function()
				{
					this.context.restore();
				},
				
				translate: function(x, y)
				{
					this.context.translate(x, y);
				},
				
				rotate: function(a)
				{
					this.context.rotate(a);
				},
				
				// <-- Public Methods
				
				handleMouseEvent: function(event)
				{
					event.preventDefault();
					
					var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
					var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
					var type;
					
					x =  (x + event.clientX) * this.ratio;
					y =  (y + event.clientY) * this.ratio;
					
					switch(event.type) {
						case 'mousedown':
							type = MouseEvent.MOUSE_DOWN;
							break;
						case 'mousemove':
							type = MouseEvent.MOUSE_MOVE;
							break;
						case 'mouseup':
							type = MouseEvent.MOUSE_UP;
							break;
						default:
							return;
					}
					
					var mouseEvent = new MouseEvent(type, false, false, x, y, this.container);
					this.dispatchEvent(mouseEvent);
				},


				handleTouchEvent: function(event)
				{
					event.preventDefault();
					
					// get the touch
					var touch = event.changedTouches[0];
					
					// If type is touch start see if we can add identifier to touches
					if(event.type == 'touchstart') {
						if(this.touchCount >= this.maxTouches) {
							return;
						} else {
							this.touchCount += 1;
							this.touchMap[touch.identifier] = true;
						}
					} else if(event.type == 'touchend') {
						if(this.touchMap[touch.identifier] != undefined) {
							delete this.touchMap[touch.identifier];
							this.touchCount -= 1;
						} else {
							return;
						}
					} else {
						if(this.touchMap[touch.identifier] == undefined)  return;
					}
					
					var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
					var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
					var type;
					
					x =  (x + touch.clientX) * this.ratio;
					y =  (y + touch.clientY) * this.ratio;
					
					switch(event.type) {
						case 'touchstart':
							type = TouchEvent.TOUCH_START;
							break;
						case 'touchmove':
							type = TouchEvent.TOUCH_MOVE;
							break;
						case 'touchend':
							type = TouchEvent.TOUCH_END;
							break;
						default:
							return;
					}
					
					var touchEvent = new TouchEvent(type, false, false, x, y, this.container);
					this.dispatchEvent(touchEvent);
				},
				
				handleKeyboardEvent: function(event)
				{
					event.preventDefault();
					
					var type;
					var key = this.getKeyFromKeyCode(event.keyCode);
					if(key == undefined) return;
					
					switch(event.type) {
						case 'keydown':
							type = KeyboardEvent.KEY_DOWN;
							break;
						case 'keyup':
							type = KeyboardEvent.KEY_UP;
							break;
					}
					
					var keyboardEvent = new KeyboardEvent(type, false, false, key);
					this.dispatchEvent(keyboardEvent);
					
				},
				
				getKeyFromKeyCode: function(keyCode)
				{
					//console.log(keyCode);
					switch(keyCode) {
						case 32:
							return Keyboard.KEY_SPACE;
						case 37:
							return Keyboard.KEY_LEFT;
						case 38:
							return Keyboard.KEY_UP;
						case 39:
							return Keyboard.KEY_RIGHT;
						case 40:
							return Keyboard.KEY_DOWN;
					}
				}
				
			}
		);
		
		return CanvasScene;
		
	}
);

define('minibot/system',
	[
		'minibot/display/html/CanvasScene'
	],
	function(
		CanvasScene
	)
	{

		(function() {
			var lastTime = 0;
			var vendors = ['webkit', 'moz'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame =
					window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
			}

			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); },
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};

			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
		}());

		var userAgent = (navigator.userAgent||navigator.vendor||window.opera).toLowerCase();
		var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0,4));

		function decorate(object, traits) {
			for (var accessor in traits) {
				object[accessor]= traits[accessor];
			}
			return object;
		}
		
		var system = {};
		
		system.onUpdate = null;
		
		system.onRender = null;
		
		system.lastTime = null;
		
		system.isRunning = false;
		
		system.isRendering = false;
		
		system.animationFrameId = null;
		
		system.handleAnimationFrame = function(time)
		{
			if(!system.isRunning) return;
			if(system.isRendering) return;
			system.isRendering = true;
			system.animationFrameId = window.requestAnimationFrame(system.handleAnimationFrame.bind(this));
			var dt = 0;
			if(system.lastTime != null) dt = time - system.lastTime;
			if(system.onUpdate != null) system.onUpdate(dt);
			if(system.onRender != null) system.onRender(dt);
			system.lastTime = time;
			system.isRendering = false;
		};
		
		// --> Public System Methods
		
		system.SetUpdateCallback = function(f)
		{
			system.onUpdate = f;
		};
		
		system.SetRenderCallback = function(f)
		{
			system.onRender = f;
		};
		
		system.Run = function()
		{
			// We can't run the system twice!
			if(system.isRunning) return;
			
			system.isRunning = true;
			system.animationFrameId = window.requestAnimationFrame(system.handleAnimationFrame.bind(system));
		};
		
		system.Stop = function()
		{
			// We can't stop the system if it isn't running
			if(!system.isRunning) return;
			
			window.cancelAnimationFrame(system.animationFrameId);
			system.isRunning = false;
		};
		
		system.CreateScene = function(options)
		{
			var scene = new CanvasScene(options);
			return scene;
		};

		// Browser | Native
		system.GetWrapperType = function()
		{
			//
			return system.WrapperType.BROWSER;
		};

		// Safari | Firefox | Chrome | Explorer | Opera | Other
		system.GetBrowserType = function()
		{
			//

		};

		// Desktop | Mobile
		system.GetPlatformType = function()
		{
			if(isMobile) {
				return system.PlatformType.MOBILE;
			} else {
				return system.PlatformType.DESKTOP;
			}
		};

		// Desktop Values = OSX | Windows | Linux
		// Mobile Values = iOS | Android
		// Unknown Values = Other
		system.GetPlatformName = function()
		{
			var name = system.PlatformName.OTHER;

			if(isMobile) {
				// Detect iOS
				if(/(ipad|iphone|ipod)/g.test( userAgent )) {
					name = system.PlatformName.IOS;
				} else if(/(android)/g.test( userAgent )) {
					name = system.PlatformName.ANDROID;
				}
			} else {
				
			}

			return name;
		};
		
		// <-- Public System Methods
		
		system.WrapperType = {
			BROWSER: "Browser",
			NATIVE: "Native"
		};
		
		system.BrowserType = {
			SAFARI: "Safari",
			FIREFOX: "Firefox",
			CHROME: "Chrome",
			EXPLORER: "Explorer",
			OPERA: "Opera"
		};
		
		system.PlatformType = {
			DESKTOP: "Desktop",
			MOBILE: "Mobile"
		};

		system.PlatformName = {
			OSX: "OSX",
			WINDOWS: "Windows",
			LINUX: "Linux",
			ANDROID: "Android",
			IOS: "iOS",
			OTHER: "Other"
		};

		return system;
	
});
/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/core/Manager',
	[],
	function()
	{
		
		var Manager = Class.create(
			/** @lends core.Manager# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} key The instance key.
				 */
				initialize: function(key)
				{
					if(Manager.instanceMap[key] != null) {
						throw new Error(Manager.MULTITON_MSG);
					}
					Manager.instanceMap[key] = this;
				}
			
			}
		);
		
		Object.extend(Manager,
			/** @lends core.Manager */
			{
				
				/**
				 * The array of instances.
				 * @type Array
				 */
				instanceMap: [],
				
				/**
				 * Error message.
				 * @type String
				 */
				MULTITON_MSG: "Manager instance for this Multiton key already constructed!",
				
				/** 
				 * Static function description.
				 */
				getInstance: function(key)
				{
					if (null == key)
						return null;	
					if(Manager.instanceMap[key] == null) {
						Manager.instanceMap[key] = new Manager(key);
					}
					return Manager.instanceMap[key];
				},
				
				/** 
				 * Static function description.
				 */
				hasCore: function(key)
				{
					return Manager.instanceMap[key] != null;
				},
				
				/** 
				 * Static function description.
				 */
				removeCore: function(key)
				{
					if(Manager.instanceMap[key] == null)
						return;
					delete Manager.instanceMap[key];
				}
			}
		);
		
		return Manager;
		
	}
);

define('minibot/display/scene/Animation',
	[
		'minibot/display/scene/SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		var Animation = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Animation# */
			{
				
				animation: null,
				
				currentFrame: 0,
				
				currentSprite: null,
				
				currentDelay: null,
				
				time: 0,
				
				loops: 0,
				
				playing: false,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param {resource.AnimationResource} animation
				 * @param {bool} play
				 * @param {int} loops
				 * @param
				 */
				initialize: function($super, animation, play, loops)
				{
					$super();
					
					this.loops = Animation.INFINITE_LOOPS;
					
					this.setAnimation(animation, play, loops);
				},
				
				setAnimation: function(animation, play, loops)
				{
					this.playing = (play == undefined || play);
					
					if(loops == undefined) {
						this.loops == Animation.INFINITE_LOOPS;
					} else {
						this.loops = loops;
					}
					
					this.currentFrame = 0;
					this.time = 0;
					
					this.animation = animation;
					this.setupFrame();
				},
				
				setupFrame: function()
				{
					if(this.animation == null) return;
					this.currentSprite = this.animation.getSprite(this.currentFrame);
					this.currentDelay = this.animation.getDelay(this.currentFrame);
					if(this.w == 0) this.w = this.currentSprite.w;
					if(this.h == 0) this.h = this.currentSprite.h;
				},
				
				stop: function()
				{
					this.playing = false;
					this.currentFrame = 0;
					this.time = 0;
					this.setupFrame();
				},
				
				play: function(loops)
				{
					this.playing = true;
					
					if(loops == undefined) {
						this.loops == Animation.INFINITE_LOOPS;
					} else {
						this.loops = loops;
					}
				},
				
				isPlaying: function()
				{
					return this.playing;
				},
				
				render: function(dt, x, y)
				{
					if(this.animation == null) return;
					
					if(this.playing) {
						this.time += dt;
						while(this.time >= this.currentDelay) {
							
							// Handle looping
							if(this.loops != Animation.INFINITE_LOOPS) {
								if(this.animation.atEnd(this.currentFrame)) {
									if(this.loops == 0) {
										this.stop();
										this.setupFrame();
										break;
									} else {
										this.loops -= 1;
									}
								}
							}
							
							this.time -= this.currentDelay;
							this.currentFrame = this.animation.nextFrame(this.currentFrame);
							this.setupFrame();
						}
					}
					
					try {
						this.scene.drawImage(
							this.currentSprite.img,
							this.currentSprite.x, //sx,
							this.currentSprite.y, //sy,
							this.currentSprite.w, //sw,
							this.currentSprite.h, //sh,
							this.x + x, //dx,
							this.y + y, //dy,
							this.w, //dw,
							this.h //dh
						);
					} catch(error) {
						console.log('Animation: Rendering Fatal Error');
					}
					
				}
				
			}
		);
		
		Animation.INFINITE_LOOPS = -1;
		
		return Animation;
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/ButtonEvent',
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

define('minibot/display/scene/Button',
	[
		'./SceneDisplayObject',
		'minibot/event/MouseEvent',
		'minibot/event/TouchEvent',
		'minibot/event/ButtonEvent'
	],
	function
	(
		SceneDisplayObject,
		MouseEvent,
		TouchEvent,
		ButtonEvent
	)
	{
		
		var Button = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Button# */
			{
				
				upState: null,
				downState: null,
				overState: null,
				currentState: null,
				
				states: null,
				
				isDown: false,
				isOver: false,
				
				mouseMoveCallback: null,
				mouseUpCallback: null,

				touchMoveCallback: null,
				touchEndCallback: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param
				 * @param {display.DisplayObject} upState The resource to display when the button is "up".
				 * @param {display.DisplayObject} downState The resource to display when the button is "down".
				 * @param {display.DisplayObject} overState The resource to display when the button is "over".
				 */
				initialize: function($super, upState, downState, overState)
				{
					$super();
					if(upState != undefined) this.upState = upState;
					if(downState != undefined) this.downState = downState;
					if(overState != undefined) this.overState = overState;
					
					this.currentState = this.upState;
					
					this.w = this.upState.w;
					this.h = this.upState.h;
					
					this.states = new Array();
					if(this.upState != null) this.states.push(this.upState);
					if(this.downState != null) this.states.push(this.downState);
					if(this.overState != null) this.states.push(this.overState);
					
					//this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
					//this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
				},
				
				/** 
				 * Function description.
				 * @access public
				 */
				render: function(dt, x, y)
				{
					this.currentState.render(dt, this.x + x, this.y + y);
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				onAddedToScene: function($super)
				{
					$super();
					this.states.each(function(displayObject) {
						displayObject.root = this.parent;
						displayObject.parent = this;
						displayObject.scene = this.scene;
						displayObject.onAddedToScene();
					}.bind(this));
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				dispatchEvent: function($super, event)
				{
					if(!this.isDown) {
						if(event.type == MouseEvent.MOUSE_DOWN) {
							this.currentState = this.downState;
							this.isDown = true;
							
							if(!this.mouseMoveCallback) {
								this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
								this.parent.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							}
							
							if(!this.mouseUpCallback) {
								this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
								this.parent.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
							}
							
						} else if(event.type == TouchEvent.TOUCH_START) {
							this.currentState = this.downState;
							this.isDown = true;

							if(!this.touchMoveCallback) {
								this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
								this.parent.addEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
							}
							
							if(!this.touchEndCallback) {
								this.touchEndCallback = this.handleTouchEnd.bindAsEventListener(this);
								this.parent.addEventListener(TouchEvent.TOUCH_END, this.touchEndCallback);
							}
							
						} else if(event.type == MouseEvent.MOUSE_MOVE) {
							this.currentState = this.overState;
							
							if(!this.mouseMoveCallback) {
								this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
								this.parent.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							}
							
						} else if(event.type == TouchEvent.TOUCH_MOVE) {
							this.currentState = this.overState;
							
							if(!this.touchMoveCallback) {
								this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
								this.parent.addEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
							}
							
						} else if(event.type == TouchEvent.TOUCH_END) {
							this.currentState = this.upState;
							
							if(this.touchMoveCallback) {
								this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
								this.touchMoveCallback = null;
							}
							
						}
					} else {
						if(event.type == MouseEvent.MOUSE_UP) {
							this.isDown = false;
							
							if(this.mouseMoveCallback) {
								this.parent.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
								this.mouseMoveCallback = null;
							}
							
							if(this.mouseUpCallback) {
								this.parent.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
								this.mouseUpCallback = null;
							}
							
							this.currentState = this.upState;
							
							this.select.bind(this).defer(event);
						} else if(event.type == TouchEvent.TOUCH_END) {
							this.isDown = false;
							
							if(this.touchMoveCallback) {
								this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
								this.touchMoveCallback = null;
							}
							
							if(this.touchUpCallback) {
								this.parent.removeEventListener(TouchEvent.TOUCH_END, this.touchEndCallback);
								this.touchEndCallback = null;
							}
							
							this.currentState = this.upState;
							
							this.select.bind(this).defer(event);
						}
					}
					return $super(event);
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleMouseMove: function(event)
				{
					
					this.isOver = this.isEventOver(event);
					
					if(this.isOver && this.isDown) {
						this.currentState = this.downState;
					} else if(this.isOver) {
						this.currentState = this.overState;
					} else if(this.isDown) {
						this.currentState = this.upState;
					} else {
						this.currentState = this.upState;
						if(this.mouseMoveCallback) {
							this.parent.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							this.mouseMoveCallback = null;
						}
					}
					
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleTouchMove: function(event)
				{
					
					this.isOver = this.isEventOver(event);
					
					if(this.isOver && this.isDown) {
						this.currentState = this.downState;
					} else if(this.isOver) {
						this.currentState = this.overState;
					} else if(this.isDown) {
						this.currentState = this.upState;
					} else {
						this.currentState = this.upState;
						if(this.touchMoveCallback) {
							this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
							this.touchMoveCallback = null;
						}
					}
					
				},
				
				isEventOver: function(event)
				{
					var sceneX = this.getSceneX();
					var sceneY = this.getSceneY();
					return (
						event.x >= sceneX && 
						event.x <= (sceneX + this.w) && 
						event.y >= sceneY && 
						event.y <= (sceneY + this.h)
					);
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleMouseUp: function(event)
				{
					this.currentState = this.upState;
					this.isDown = false;
					
					if(this.mouseMoveCallback) {
						this.parent.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
						this.mouseMoveCallback = null;
					}
					
					if(this.mouseUpCallback) {
						this.parent.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
						this.mouseUpCallback = null;
					}
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleTouchEnd: function(event)
				{
					this.currentState = this.upState;
					this.isDown = false;
					
					if(this.touchMoveCallback) {
						this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
						this.touchMoveCallback = null;
					}
					
					if(this.touchUpCallback) {
						this.parent.removeEventListener(TouchEvent.TOUCH_END, this.touchEndCallback);
						this.touchEndCallback = null;
					}
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				select: function(event)
				{
					var x = event.x;
					var y = event.y;
					var type = ButtonEvent.SELECT;
					
					var buttonEvent = new ButtonEvent(type, false, false, this);
					this.dispatchEvent(buttonEvent);
				}
				
			}
		);
		
		return Button;
		
	}
);

define('minibot/graphics/Pattern',
	[

	],
	function
	(

	)
	{
		var Pattern = Class.create(
			/** @lends graphics.Pattern# */
			{
				/** The sprite.
				 * @type resource.SpriteResource
				 */
				sprite: null,

				pattern: null,

				repeat: null,

				/**
				 * Creates a new Pattern instance.
				 * @class Creates a sprite to be rendered.
				 * @constructs
				 * @param {resource.SpriteResource} sprite The sprite to be used.
				 * @param
				 */
				initialize: function(sprite, repeat)
				{
					if(repeat == undefined) repeat = Pattern.REPEAT;

					this.repeat = repeat;
					this.type = Pattern.TYPE;
					this.sprite = sprite;
				},

				hasPattern: function() 
				{
					return this.pattern != null;
				},

				setPattern: function(pattern) 
				{
					this.pattern = pattern;
				},

				getPattern: function() 
				{
					return this.pattern;
				}

				
			}
		);
		
		Pattern.TYPE = "pattern";

		Pattern.REPEAT = 'repeat';
		Pattern.REPEAT_Y = 'repeat-y';
		Pattern.REPEAT_X = 'repeat-x';

		return Pattern;
		
	}
);
define('minibot/display/scene/Rect',
	[
		'./SceneDisplayObject',
		'minibot/graphics/Color',
		'minibot/graphics/Pattern'
	],
	function
	(
		SceneDisplayObject,
		Color,
		Pattern
	)
	{
		
		var Rect = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Rect# */
			{
				
				mode: null,
				
				fillColor: null,
				fillPattern: null,
				strokeColor: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param
				 * @param {int} width The width of the rectangle.
				 */
				initialize: function($super, width, height, mode, fill, strokeColor)
				{
					$super();
					
					this.w = width;
					this.h = height;
					
					this.mode = mode;
					
					if(fill != undefined) {
						if(fill.type == Color.TYPE) {
							this.fillColor = fill;
						} else if(fill.type = Pattern.TYPE) {
							this.fillPattern = fill;
						}
					}
					if(strokeColor != undefined) this.strokeColor = strokeColor;
					
				},
				
				render: function(dt, x, y)
				{
					if(this.fillColor != null) this.scene.setFillColor(this.fillColor);
					if(this.fillPattern != null) this.scene.setFillPattern(this.fillPattern);
					
					this.scene.drawRect(this.mode, this.x + x, this.y + y, this.w, this.h);
				}
				
			}
		);
		
		return Rect;
		
	}
);

define('minibot/display/scene/Sprite',
	[
		'minibot/display/scene/SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		var Sprite = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Sprite# */
			{
				/** The sprite object.
				 * @type resource.SpriteResource
				 */
				sprite: null,
				/** Composite object.
				 * @ type object
				 */
				composite: null,
				
				/**
				 * Creates a new Sprite instance.
				 * @class Creates a sprite to be rendered.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param {resource.SpriteResource} sprite The sprite to be used.
				 * @param
				 */
				initialize: function($super, sprite)
				{
					$super();
					this.sprite = sprite;
					this.w = sprite.w;
					this.h = sprite.h;
				},
				/** Renders the sprite.
				 * @param {Number} dt The change in time.
				 * @param {Number} x The x position to render the sprite.
				 * @param {Number} y The y position to render the sprite.
				 */
				render: function(dt, x, y)
				{
					try {
						this.scene.drawImage(
							this.sprite.img,
							this.sprite.x, //sx,
							this.sprite.y, //sy,
							this.sprite.w, //sw,
							this.sprite.h, //sh,
							this.x + x, //dx,
							this.y + y, //dy,
							this.w, //dw,
							this.h //dh
						);
					} catch(error) {
						console.log('SpriteObject: Fatal Error');
					}
				}
				
			}
		);
		
		return Sprite;
		
	}
);
define('minibot/display/scene/Text',
	[
		'minibot/display/scene/SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		
		var Text = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Text# */
			{
				
				text: '',
				
				style: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param {String} text
				 * @param {display.scene.TextStyle} style
				 * @param {String} textAlign
				 * @param {Scene 2DContext} context
				 * @param 
				 */
				initialize: function($super, text, style)
				{
					$super();
					
					this.text = text;
					
					if(style != undefined) this.style = style;
					
					/*
					if(font != undefined) this.font = font;
					if(fillStyle != undefined) this.fillStyle = fillStyle;
					if(textAlign != undefined) this.textAlign = textAlign;
					
					if(context != undefined) {
						this.setStyle(context);
						this.metrics = context.measureText(this.text);
					}
					*/
				},
				
				setStyle: function()
				{
					/*
					if(this.font != null) context.font = this.font;
					if(this.textAlign != null) context.textAlign = this.textAlign;
					if(this.fillStyle != null) context.fillStyle = this.fillStyle;
					*/
				},
				
				getText: function()
				{
					return this.text;
				},
				
				getMetrics: function()
				{
					return this.metrics;
				},
				
				setText: function(text)
				{
					this.text = text;
				},
				
				render: function(dt, x, y)
				{
					this.scene.drawText("", this.text, this.style, this.x + x, this.y + y);
				}
				
			}
		);
		
		return Text;
	}
);

define('minibot/display/scene/TextStyle',
	[
		'minibot/graphics/Color'
	],
	function
	(
		Color
	)
	{
		
		var TextStyle = Class.create(
			/** @lends display.scene.TextStyle# */
			{
				
				family: null,
				
				size: null,
				
				align: null,
				
				color: null,

				weight: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} family
				 * @param {int} size
				 * @param {String} color
				 * @param {String} align
				 * @param 
				 */
				initialize: function(family, size, color, align, weight)
				{
					
					this.family = family;
					this.size = size;
					this.color = color;
					this.align = align;
					this.weight = (weight)?(weight):('');
					
				},
				
				getFamily: function()
				{
					return this.family;
				},
				
				getSize: function()
				{
					return this.size;
				},
				
				getColor: function()
				{
					return this.color;
				},
				
				getAlign: function()
				{
					return this.align;
				},
				
				getWeight: function()
				{
					return this.weight;
				}
				
			}
		);
		
		return TextStyle;
	}
);

;
define("minibot/event/HtmlEvent", function(){});

define('minibot/display/html/HtmlElement',
	[
		'minibot/display/DisplayObject',
		'minibot/event/HtmlEvent'
	],
	function
	(
		DisplayObject,
		HtmlEvent
	)
	{
		var HtmlElement = Class.create(
			DisplayObject,
			/** @lends display.html.HtmlElement# */
			{
				
				element: null,
				children: null,
				
				isInDOM: false,
				htmlListeners: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
					
					// Determine what the element is
					if(arguments[1] != undefined) {
						if(typeof arguments[1] == "string") {
							this.element = new Element(arguments[1]);
						} else {
							this.element = arguments[1];
						}
					} else {
						this.element = new Element('div');
					}
					
					if(this.element == undefined) {
						// TODO: throw error?
					}
					
					this.htmlListeners = {};
					this.children = new Array();
					
					// Wrapping element functions
					this.writeAttribute 	= this.element.writeAttribute.bind(this.element);
					this.readAttribute 		= this.element.readAttribute.bind(this.element);
					this.hide 				= this.element.hide.bind(this.element);
					this.show 				= this.element.show.bind(this.element);
					
				},
				
				addChild: function(displayObject)
				{
					this.element.insert(displayObject.element);
					this.children.push(displayObject);
					if(this.isInDOM) {
						displayObject.onAddedToDOM();
					}
				},
				
				removeChild: function(displayObject)
				{
					// Loop through children to find child then remove
					var child;
					for(var i = 0; i < this.children.length; i++) {
						child = this.children[i];
						if(displayObject === child) {
							this.children.splice(i, 1);
							displayObject.element.remove();
							displayObject.onRemovedFromDOM();
						}
					}
				},
				
				onAddedToDOM: function($super)
				{
					this.isInDOM = true;
					
					var child;
					for(var i = 0; i < this.children.length; i++) {
						child = this.children[i];
						child.onAddedToDOM();
					}
				},
				
				isHtmlObject: function()
				{
					return true;
				},
				
				addToDOM: function(element)
				{
					element.insert(this.element);
					this.onAddedToDOM();
				},
				
				// Callback for removing from DOM
				onRemovedFromDOM: function()
				{
					// Extend this function in subclasses when needed
				},
				
				addEventListener: function($super, type, callback)
				{
					if(this.htmlListeners[type] == undefined) {
						var htmlType = null;
						
							switch(type) {
								case HtmlEvent.CLICK:
									htmlType = 'click';
									break;
								case HtmlEvent.FOCUS:
									htmlType = 'focus';
									break;
								case HtmlEvent.BLUR:
									htmlType = 'blur';
									break;
								case HtmlEvent.MOUSE_DOWN:
									htmlType = 'mousedown';
									break;
								case HtmlEvent.MOUSE_MOVE:
									htmlType = 'mousemove';
									break;
								case HtmlEvent.MOUSE_UP:
									htmlType = 'mouseup';
									break;
								case HtmlEvent.KEY_DOWN:
									htmlType = 'keydown';
									break;
								case HtmlEvent.KEY_UP:
									htmlType = 'keyup';
									break;
								case HtmlEvent.DRAG_ENTER:
									htmlType = 'dragenter';
									break;
								case HtmlEvent.DRAG_EXIT:
									htmlType = 'dragexit';
									break;
								case HtmlEvent.DRAG_OVER:
									htmlType = 'dragover';
									break;
								case HtmlEvent.DROP:
									htmlType = 'drop';
									break;
								default:
									break;
							}
							
						if(htmlType != null) {
							this.htmlListeners[type] = this.handleHtmlEvent.bindAsEventListener(this, type);
							this.element.observe(htmlType, this.htmlListeners[type]);
						}
					}
					$super(type, callback);
				},
				
				handleHtmlEvent: function(event, type)
				{
					this.dispatchEvent(new HtmlEvent(type, event));
				}
				
			}
		);
		
		return HtmlElement;
		
	}
);
/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/engine/Engine',
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
			/** @lends engine.Engine# */
			{
				
				// List of all systems
				systems: null,
				
				// List of all systems by type
				systemsByType: null,
				
				// List of all objects
				objects: null,
				
				// List of objects by type
				objectsByType: null,
				
				// The primary camera
				camera: null,
				
				// the player
				player: null,
				
				// The resource map
				resources: null,
				
				// The update order
				updateOrder: null,
				
				initialize: function($super)
				{
					$super();
					
					this.resources = {};
					
					this.systems = [];
					this.systemsByType = {};
					
					this.objects = [];
					this.objectsByType = {};
					
				},
				
				// Public Methods -->
				
				// Update/Render Methods -->
				
				update: function(dt)
				{
					
					// Update the Systems in preset order
					for(var s = 0; s < this.updateOrder.length; s++) {
						this.systemsByType[this.updateOrder[s]].update(dt);
					}
					
				},
				
				render: function(dt)
				{
					// Override this in sub class
				},
				
				renderPhysics: function(dt)
				{
					// Override this in sub class
				},
				
				setUpdateOrder: function(updateOrder)
				{
					this.updateOrder = updateOrder;
				},
				
				// <-- Update/Render Methods
				
				// Object/System Methods -->
				
				addSystem: function(sys)
				{
					// Get type
					var type = sys.getType();
					if(this.systemsByType[type] != undefined) {
						// ERROR?
						return;
					}
					
					// Add to systems
					this.systems.push(sys);
					
					// Add to systemsByType
					this.systemsByType[type] = sys;
					
					sys.setEngine(this);
					sys.onAddedToEngine();
				},
				
				removeSystem: function()
				{
					
				},
				
				addObject: function(obj)
				{
					// Add to objects
					this.objects.push(obj);
					
					// Add to objectsByType
					var type = obj.getType();
					if(this.objectsByType[type] == undefined) {
						this.objectsByType[type] = [];
					}
					this.objectsByType[type].push(obj);
					
					// Add to systems if component is available
					for(var i = 0; i < this.systems.length; i++) {
						this.systems[i].addObject(obj);
					}
					
					obj.setEngine(this);
					obj.onAddedToEngine();
				},
				
				removeObject: function()
				{
					
				},
				
				// <-- Object/System Methods
				
				// Resource Methods -->
				
				getResources: function()
				{
					return this.resources;
				},
				
				getResource: function(type, id)
				{
					if(this.resources[type] == undefined) return null;
					if(this.resources[type][id] == undefined) return null;
					return this.resources[type][id];
				},
				
				addResource: function(type, id)
				{
					if(this.resources[type] == undefined) this.resources[type] = {};
					this.resources[type][id] = null;
				},
				
				onResourcesLoaded: function()
				{
					var i;
					for(i = 0; i < this.systems.length; i++) {
						this.systems[i].onResourcesLoaded();
					}
					for(i = 0; i < this.objects.length; i++) {
						this.objects[i].onResourcesLoaded();
					}
				},
				
				// <-- Resource Methods
				
				// <-- Public Methods
				
				
				
			}
		);
		
		return Engine;
	
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/event/EngineEvent',
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
				/** Description of object.
				 * @type object
				 */
				object: null,
				/** Description of component.
				 * @type object
				 */
				component: null,
				/** Description of data.
				 * @type object
				 */
				data: null,
				
				/**
				 * Creates a new EngineEvent instance.
				 * @class Identifies an event and selects appropriate action.
				 * Analyzes event data in order to pinpoint significant events and trigger actions.
				 * @constructs
				 * @param {type} type Description of type.
				 * @param {object} object Description of object.
				 * @param {object} Description of component.
				 * @param {object} data Description of data.
				 * @param
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

define('minibot/engine/EngineComponent',
	[
		'minibot/event/EngineEvent'
	],
	function
	(
		EngineEvent
	)
	{
		var EngineComponent = Class.create(
			{
				
				type: null,
				
				object: null,
				
				system: null,
				
				eventQueue: null,
				
				initialize: function(type)
				{
					this.type = type;
					this.eventQueue = [];
				},
				
				getType: function()
				{
					return this.type;
				},
				
				setProperty: function(key, value)
				{
					this.object.setProperty(key, value);
				},
				
				getProperty: function(key)
				{
					return this.object.getProperty(key);
				},
				
				hasProperty: function(key)
				{
					return this.object.hasProperty(key);
				},
				
				setObject: function(object)
				{
					this.object = object;
				},
				
				getObject: function()
				{
					return this.object;
				},
				
				onAddedToObject: function()
				{
					//-- OVERRIDE
				},
				
				setSystem: function(system)
				{
					this.system = system;
				},
				
				getSystem: function()
				{
					return this.system;
				},
				
				onAddedToSystem: function()
				{
					//-- OVERIDE?
				},
				
				buildEvent: function(type, data)
				{
					return this.object.buildEvent(type, data, this);
				},
				
				queueEvent: function(event)
				{
					this.eventQueue.push(event);
				},
				
				flushEventQueue: function()
				{
					while(this.eventQueue.length) {
						this.dispatchEvent(this.eventQueue.pop());
					}
				},
				
				dispatchEvent: function(event)
				{
					this.object.dispatchEvent(event);
				},
				
				addEventListener: function(type, callback)
				{
					this.object.addEventListener(type, callback);
				},
				
				addResource: function(type, id)
				{
					if(this.system == null) return;
					this.system.addResource(type, id);
				},
				
				getResource: function(type, id)
				{
					if(this.system == null) return;
					return this.system.getResource(type, id);
				},
				
				onResourcesLoaded: function()
				{
					
				},
				
				update: function(dt)
				{
					//-- OVERRIDE
				}
				
			}
		);
		
		return EngineComponent;
		
	}
	
);


/*
require 'engine/object/Player'
require 'engine/component/player/PlayerPhysicsComponent'
require 'engine/component/player/PlayerInputComponent'
require 'engine/component/player/PlayerHealthComponent'

require 'engine/factory/EquipmentFactory'

PlayerFactory = {}

function PlayerFactory.Create(world, equipments)
	local player = Player()
	player:setProperty("x", 0)
	player:setProperty("y", 0)
	player:setProperty("health", 5)
	
	player:addComponent(PlayerPhysicsComponent(world))
	player:addComponent(PlayerInputComponent())
	player:addComponent(PlayerHealthComponent())
  
  -- Add equipments
  local e = {nil, nil, nil, nil, nil, nil, nil, nil}
  for i,v in ipairs(equipments) do
    e[i] = EquipmentFactory.Create(v, world)
	end
  player:setProperty("equipment", e)
  
	return player
end
*/;
define("minibot/engine/EngineFactory", function(){});

define('minibot/engine/EngineObject',
	[
		'minibot/event/EventDispatcher',
		'minibot/event/EngineEvent'
	],
	function
	(
		EventDispatcher,
		EngineEvent
	)
	{
		var EngineObject = Class.create(
			EventDispatcher,
			{
			
				type: null,
				
				components: null,
				
				data: null,
				
				engine: null,
				
				initialize: function($super, type, data)
				{
					$super();
					
					this.type = type;
					this.components = {};
					
					if(data == undefined) data = {};
					this.data = data;
				},
				
				getType: function()
				{
					return this.type;
				},

				addComponent: function(component)
				{
					var type = component.getType()
					if(this.components[type] == undefined) {
						this.components[type] = component;
						component.setObject(this);
						component.onAddedToObject();
					}
				},

				removeComponent: function(component)
				{

				},
				
				setEngine: function(engine)
				{
					this.engine = engine;
				},
				
				getEngine: function()
				{
					return this.engine;
				},

				onAddedToEngine: function()
				{
					//-- OVERRIDE
				},
				
				onResourcesLoaded: function()
				{
					for(var c in this.components) {
						this.components[c].onResourcesLoaded();
					}
				},

				getComponent: function(type)
				{
					if(this.components[type] != undefined) {
						return this.components[type];
					}
					return null;
				},

				hasComponent: function(type)
				{
					return (this.components[type] != undefined)
				},

				update: function(dt)
				{
					for(var c in this.components) {
						this.components[c].update(dt);
					}
				},

				setProperty: function(key, value)
				{
					this.data[key] = value;
				},

				getProperty: function(key)
				{
					return this.data[key];
				},

				hasProperty: function(key)
				{
					return (this.data[key] != undefined);
				},
				
				buildEvent: function(type, data, component)
				{
					if(component == undefined) component = null;
					return new EngineEvent(
						type,
						this,
						component,
						data
					);
				}
				
			}
		);
		
		return EngineObject;
		
	}
);

define('minibot/engine/EngineSystem',
	[
		
	],
	function
	(
		
	)
	{
		var EngineSystem = Class.create(
			{
				
				type: null,
				
				components: null,
				
				componentsByObject: null,
				
				engine: null,
				
				initialize: function(type)
				{
					this.type = type;
					
					this.components = [];
					
					this.componentsByObject = {};
					
				},
				
				getType: function()
				{
					return this.type;
				},
				
				addObject: function(obj)
				{
					if(obj.hasComponent(this.type)) {
						var c = obj.getComponent(this.type);
						this.components.push(c);
						this.componentsByObject[obj] = c;
						
						c.setSystem(this);
						c.onAddedToSystem();
						
						return c;
					}
					
					return null;
				},
				
				addResource: function(type, id)
				{
					if(!this.engine) return;
					this.engine.addResource(type, id);
				},
				
				getResource: function(type, id)
				{
					if(!this.engine) return;
					return this.engine.getResource(type, id);
				},
				
				removeObject: function(obj)
				{
				
				},
				
				setEngine: function(engine)
				{
					this.engine = engine;
				},
				
				getEngine: function()
				{
					return this.engine;
				},

				onAddedToEngine: function()
				{
					//-- OVERRIDE
				},
				
				onResourcesLoaded: function()
				{
					
				},
				
				update: function(dt)
				{
					//-- OVERRIDE
				},
				
				// Helper function to update all components of the system
				updateComponents: function(dt)
				{
					for(var i = 0; i < this.components.length; i++) {
						this.components[i].update(dt);
					}
				}
				
			}
		);
		
		return EngineSystem;
		
	}
	
);


define('minibot/engine/component/DisplayComponent',
	[
		'minibot/engine/EngineComponent'
	],
	function
	(
		EngineComponent
	)
	{
		
		var DisplayComponent = Class.create(
			EngineComponent,
			{
				
				scene: null,
				
				initialize: function($super, type)
				{
					$super(type);
				},
				
				update: function(dt)
				{
					
				},
				
				onAddedToSystem: function()
				{
					this.scene = this.getSystem().getScene();
				},
				
				render: function(dt, layer, x, y)
				{
					// override
				},
				
				getLayers: function()
				{
					// override
					return [];
				},
				
				isVisible: function()
				{
					// override
					return true;
				}
				
			}
		);
		
		return DisplayComponent;
		
	}
	
);

define('minibot/engine/component/PhysicsComponent',
	[
		'minibot/engine/EngineComponent'
	],
	function
	(
		EngineComponent
	)
	{
		
		var PhysicsComponent = Class.create(
			EngineComponent,
			{
				
				
			}
		);
		
		return PhysicsComponent;
		
	}
	
);


define('minibot/engine/component/InputComponent',
	[
		'minibot/engine/EngineComponent'
	],
	function
	(
		EngineComponent
	)
	{
		
		var InputComponent = Class.create(
			EngineComponent,
			{
				
				
			}
		);
		
		return InputComponent;
		
	}
	
);


define('minibot/engine/system/DisplaySystem',
	[
		'minibot/engine/EngineSystem'
	],
	function
	(
		EngineSystem
	)
	{
		
		var DisplaySystem = Class.create(
			EngineSystem,
			{
				
				scene: null,
				
				layers: null,
				
				initialize: function($super, type, scene)
				{
					$super(type);
					
					this.scene = scene;
					
					this.layers = new Array();
					
				},
				
				update: function(dt)
				{
					this.updateComponents(dt);
				},
				
				addObject: function($super, obj)
				{
					var c = $super(obj);
					if(c == null) return null;
					
					var l = c.getLayers();
					for(var i = 0; i < l.length; i++) {
						this.addToLayer(c, l[i]);
					}
				},
				
				addToLayer: function(component, layer)
				{
					while(!this.layers[layer]) {
						this.layers.push([]);
					}
					this.layers[layer].push(component);
				},

				onAddedToEngine: function()
				{
					// Setup the world?
				},
				
				getScene: function()
				{
					return this.scene;
				},
				
				getCamera: function()
				{
					return this.engine.getCamera();
				},
				
				// render the scene layer by layer, check if each component is on screen first
				render: function(dt)
				{
					
					var camera = this.getCamera();
					var cameraX = camera.getProperty("x") * -1;
					var cameraY = camera.getProperty("y") * -1;
					
					var i, j, layer, component;
					for(i = 0; i < this.layers.length; i++) {
						layer = this.layers[i];
						for(j = 0; j < layer.length; j++) {
							component = layer[j];
							if(!component.isVisible()) continue;
							component.render(dt, i, cameraX, cameraY);
						}
					}
				}
				
			}
		);
		
		return DisplaySystem;
		
	}
	
);
/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/geom/Vector2',
	[],
	function()
	{
		
		var Vector2 = Class.create(
			/** @lends geom.Vector2# */
			{
				
				x: 0,
				y: 0,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function(x, y)
				{
					this.x = x || 0;
					this.y = y || 0; 
				},
				
				reset: function (x, y)
				{
					this.x = x;
					this.y = y;
					return this;
				},
				
				toString: function(decPlaces)
				{
					decPlaces = decPlaces || 3;
					var scalar = Math.pow(10,decPlaces);
					return "[" + Math.round (this.x * scalar) / scalar + ", " + Math.round (this.y * scalar) / scalar + "]";
				},
				
				clone: function()
				{
					return new Vector2(this.x, this.y);
				},
				
				copyTo: function (v)
				{
					v.x = this.x;
					v.y = this.y;
				},
				
				copyFrom : function (v) {
					this.x = v.x;
					this.y = v.y;
				},	
				
				magnitude : function () {
					return Math.sqrt((this.x*this.x)+(this.y*this.y));
				},
				
				magnitudeSquared : function () {
					return (this.x*this.x)+(this.y*this.y);
				},
				
				normalise : function() {
					return this.normailize();
				},
				
				normalize : function () {
					
					var m = this.magnitude();
					if(m == 0) return this;
					
					this.x = this.x/m;
					this.y = this.y/m;
					
					return this;	
				},
				
				reverse : function () {
					this.x = -this.x;
					this.y = -this.y;
					
					return this;
				},
				
				plusEq : function (v) {
					this.x+=v.x;
					this.y+=v.y;
					
					return this;
				},
				
				plusNew : function (v) {
					return new Vector2(this.x+v.x, this.y+v.y);
				},
				
				minusEq : function (v) {
					this.x-=v.x;
					this.y-=v.y;
					
					return this;
				},
				
				minusNew : function (v) {
					return new Vector2(this.x-v.x, this.y-v.y);
				},	
				
				multiplyEq : function (scalar) {
					this.x*=scalar;
					this.y*=scalar;
					
					return this;
				},
				
				multiplyNew : function (scalar) {
					var returnvec = this.clone();
					return returnvec.multiplyEq(scalar);
				},
				
				divideEq : function (scalar) {
					this.x/=scalar;
					this.y/=scalar;
					return this;
				},
				
				divideNew : function (scalar) {
					var returnvec = this.clone();
					return returnvec.divideEq(scalar);
				},
				
				dot : function (v) {
					return (this.x * v.x) + (this.y * v.y) ;
				},
				
				angle : function (useRadians) {
					return Math.atan2(this.y,this.x) * (useRadians ? 1 : Vector2.TO_DEGREES);
				},
				
				rotate : function (angle, useRadians) {
					var cosRY = Math.cos(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
					var sinRY = Math.sin(angle * (useRadians ? 1 : Vector2.TO_RADIANS));
					
					Vector2.temp.copyFrom(this);
					
					this.x= (Vector2.temp.x*cosRY)-(Vector2.temp.y*sinRY);
					this.y= (Vector2.temp.x*sinRY)+(Vector2.temp.y*cosRY);
					
					return this;
				},	
				
				equals : function (v) {
					return((this.x==v.x)&&(this.y==v.x));
				},
				
				isCloseTo : function (v, tolerance) {	
					if(this.equals(v)) return true;
					
					Vector2.temp.copyFrom(this);
					Vector2.temp.minusEq(v);
					
					return(Vector2.temp.magnitudeSquared() < tolerance*tolerance);
				},
				
				rotateAroundPoint : function (point, angle, useRadians) {
					Vector2.temp.copyFrom(this);
					//trace("rotate around point "+t+" "+point+" " +angle);
					Vector2.temp.minusEq(point);
					//trace("after subtract "+t);
					Vector2.temp.rotate(angle, useRadians);
					//trace("after rotate "+t);
					Vector2.temp.plusEq(point);
					//trace("after add "+t);
					this.copyFrom(Vector2.temp);
				
				},
				
				isMagLessThan : function (distance) {
					return(this.magnitudeSquared()<distance*distance);
				},
				
				isMagGreaterThan : function (distance) {
					return(this.magnitudeSquared()>distance*distance);
				}
				
				
				// still AS3 to convert :
				// public function projectOnto(v:Vector2) : Vector2
				// {
				// var dp:Number = dot(v);
				//
				// var f:Number = dp / ( v.x*v.x + v.y*v.y );
				//
				// return new Vector2( f*v.x , f*v.y);
				// }
				//
				//
				// public function convertToNormal():void
				// {
				// var tempx:Number = x;
				// x = -y;
				// y = tempx;
				//
				//
				// }
				// public function getNormal():Vector2
				// {
				//
				// return new Vector2(-y,x);
				//
				// }
				//
				//
				//
				// public function getClosestPointOnLine ( vectorposition : Point, targetpoint : Point ) : Point
				// {
				// var m1 : Number = y / x ;
				// var m2 : Number = x / -y ;
				//
				// var b1 : Number = vectorposition.y - ( m1 * vectorposition.x ) ;
				// var b2 : Number = targetpoint.y - ( m2 * targetpoint.x ) ;
				//
				// var cx : Number = ( b2 - b1 ) / ( m1 - m2 ) ;
				// var cy : Number = m1 * cx + b1 ;
				//
				// return new Point ( cx, cy ) ;
				// }
				// 
				
			}
		);
		
		Vector2.TO_DEGREES = 180 / Math.PI;	
		Vector2.TO_RADIANS = Math.PI / 180;
		Vector2.temp = new Vector2();
		
		return Vector2;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/geom/Rectangle',
	[],
	function()
	{
		
		var Rectangle = Class.create(
			/** @lends geom.Rectangle# */
			{
				
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function(x, y, w, h)
				{
					this.x = x;
					this.y = y;
					this.w = w;
					this.h = h;
				}
				
				
			}
		);
		
		return Rectangle;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/resource/Resource',
	[],
	function()
	{
 		
		var Resource = Class.create(
			/** @lends resource.Resource# */
			{
				
				/**
				 * Create a new Resource object. 
				 * @class This is the basic Resource class.
				 * It is intended to be used as an Interface, although such types are not
				 * enforced in JavaScript.
				 * @constructs
				 * @param {String} id The id of the Resource.
				 */
				initialize: function(id)
				{
					this.id = id;
				},
				
				/**
				 * The id of the Resource.
				 * @type String
				 */
				id: null,
				
				/**
				 * Value that represents if the resource has been loaded or not.
				 * @private
				 * @type bool
				 */
				loaded: false,
				
				/**
				 * Load the Resource
				 * @param {ResourceManager} manager The ResourceManager instance.
				 * @param {Function} callback The callback function to call once loaded.
				 */
				load: function(manager, callback)
				{
					// Overload this function in the base class
					this.loaded = true;
					callback.defer();
				},
				
				/**
				 * Returns if the Resource has been loaded or not.
				 * @type bool
				 */
				isLoaded: function()
				{
					return this.loaded;
				}
				
			}
		);
		
		return Resource;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/resource/ResourceManager',
	[
		'minibot/core/Manager'
	],
	function
	(
		Manager
	)
	{
		var ResourceManager = Class.create(
			Manager,
			/** @lends resource.ResourceManager# */
			{
				
				typeOrder: null,
				typeCount: null,
				
				typeMap: null,
				
				resourceMap: null,
				
				resourceCount: 0,
				loadedCount: 0,
				typeIndex: null,
				typeLoadedCount: 0,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends core.Manager
				 * @constructs
				 * @param {String} key The instance key.
				 * @param 
				 */
				initialize: function($super, key)
				{
					$super(key);
					this.typeOrder = [];
					this.typeCount = [];
					this.typeMap = {};
					this.resourceMap = {};
				},
				
				addType: function(type, className)
				{
					this.typeOrder.push(type);
					this.typeCount.push(0);
					this.typeMap[type] = className;
					this.resourceMap[type] = {};
				},
				
				addResource: function(type, id, data)
				{
					if(this.typeMap[type] == undefined) return;
					var className = this.typeMap[type];
					var resource = new className(id, data);
					this.resourceMap[type][id] = resource;
					this.resourceCount += 1;
					
					for(var i = 0; i < this.typeOrder.length; i++) {
						if(type == this.typeOrder[i]) {
							this.typeCount[i] += 1;
							break;
						}
					}
					
				},
				
				loadAll: function(progressCallback, completeCallback)
				{
					this.progressCallback = progressCallback;
					this.completeCallback = completeCallback;
					
					this.typeIndex = null;
					this.loadNextType();
					
				},
				
				loadNextType: function()
				{
					if(this.typeIndex == null) {
						this.typeIndex = 0;
					} else {
						this.typeIndex += 1;
					}
					
					if(this.typeIndex >= this.typeOrder.length) {
						this.completeCallback.bind(this).defer();
						return;
					}
					
					this.typeLoadedCount = 0;
					
					var type = this.typeOrder[this.typeIndex];
					var resources;
					var id;
					var count = 0;
					resources = this.resourceMap[type];
					
					for(id in resources) {
						this.loadResource(type, id);
						count++;
					}
					
					if(count == 0) {
						this.loadNextType();
					}
				},
				
				loadResource: function(type, id)
				{
					var resource = this.resourceMap[type][id];
					if(resource.isLoaded()) {
						this.handleResourceLoaded();
					} else {
						resource.load(this, this.handleResourceLoaded.bind(this));
					}
				},
				
				handleResourceLoaded: function()
				{
					this.typeLoadedCount += 1;
					var progress = Number(1 / this.resourceCount);
					this.progressCallback(progress);
					
					if(this.typeLoadedCount >= this.typeCount[this.typeIndex]) {
						this.loadNextType.bind(this).defer();
					}
				},
				
				getResource: function(type, id)
				{
					if(this.resourceMap[type] == undefined) return null;
					if(this.resourceMap[type][id] == undefined) return null;
					
					return this.resourceMap[type][id];
				}
				
			}
			
		);
		
		Object.extend(
			ResourceManager,
			/** @lends core.Manager */
			{
				getInstance: function(key)
				{
					if (!Manager.hasCore(key)) {
						new ResourceManager(key);
					}
					var retVal = Manager.getInstance(key);
					return retVal;
				}
			}
		);
		
		return ResourceManager;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/resource/ImageResource',
	[
		'minibot/resource/Resource'
	],
	function
	(
		Resource
	)
	{
		
		var ImageResource = Class.create(
			Resource,
			/** @lends resource.ImageResource# */
			{
				
				/**
				 * The src URL.
				 * @type String
				 */
				src: null,
				
				/**
				 * The Image object.
				 * @type Image
				 */
				img: null,
				
				/**
				 * Create a new ImageResource object. 
				 * @class The base ImageResource object.
				 * It is intended to be used as an Interface, although such types are not
				 * @extends resource.Resource
				 * @constructs
				 * @param {String} id The id of the Resource.
				 * @param {Object} data The data associated with the Resource.
				 * @param 
				 */
				initialize: function($super, id, data)
				{
					$super(id);
					if(data.src != undefined) this.src = data.src;
				},
				
				load: function(manager, callback)
				{
					this.loaded = true;
					if(this.src != null) {
						this.img = new Image();
						this.img.addEventListener("load", this.handleLoadImageSuccess.bindAsEventListener(this, callback), false);
						this.img.addEventListener("error", this.handleLoadImageFailure.bindAsEventListener(this, callback), false);
						this.img.src = this.src;
					} else {
						callback();
					}
				},
				
				handleLoadImageSuccess: function(event, callback)
				{
					callback();
				},
				
				handleLoadImageFailure: function(event, callback)
				{
					// TODO: Adjust error reporting
					console.log('ImageResource: Failed to load image.');
					callback();
				}
				
			}
		);
		
		ImageResource.TYPE = 1;
		
		return ImageResource;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/resource/SpriteResource',
	[
		'minibot/resource/Resource',
		'minibot/resource/ImageResource'
	],
	function
	(
		Resource,
		ImageResource
	)
	{
		
		var SpriteResource = Class.create(
			Resource,
			/** @lends resource.SpriteResource# */
			{
				imageId: null,
				
				imageResource: null,
				
				img: null,
				
				x: 0,
				y: 0,
				w: -1,
				h: -1,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends resource.Resource
				 * @constructs
				 * @param {String} id The id of the Resource.
				 * @param {Object} data The data associated with the Resource.
				 * @param 
				 */
				initialize: function($super, id, data)
				{
					$super(id);
					
					if(data != undefined) {
						if(data.image_id != undefined) this.imageId = data.image_id;
						else if(data.imageId != undefined) this.imageId = data.imageId;
						
						if(data.x != undefined) this.x = data.x;
						if(data.y != undefined) this.y = data.y;
						if(data.w != undefined) this.w = data.w;
						if(data.h != undefined) this.h = data.h;
					}
				},
				
				load: function(manager, callback)
				{
					try {
						this.imageResource = manager.getResource(
							ImageResource.TYPE,
							this.imageId
						);
						
						this.img = this.imageResource.img;
						
						if(this.w == -1) this.w = this.img.width;
						if(this.h == -1) this.h = this.img.height;
						
						this.loaded = true;
					} catch(e) {
						console.log("ERROR");
					}
					
					callback();
				}
			}
		);
		
		SpriteResource.TYPE = 2;
		
		return SpriteResource;
		
	}
);

/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define('minibot/resource/AnimationResource',
	[
		'minibot/resource/Resource',
		'minibot/resource/SpriteResource'
	],
	function
	(
		Resource,
		SpriteResource
	)
	{
		var AnimationResource = Class.create(
			Resource,
			/** @lends resource.AnimationResource# */
			{
				
				numberOfFrames: 0,
				
				sprites: null,
				
				spriteIds: null,
				
				delays: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends resource.Resource
				 * @constructs
				 * @param {String} id The id of the Resource.
				 * @param {Object} data The data associated with the Resource.
				 * @param 
				 */
				initialize: function($super, id, data)
				{
					$super(id);
					
					
					this.spriteIds = [];
					this.delays = [];
					if(data.frames != undefined) {

						for(var i = 0; i < data.frames.length; i++) {
							this.spriteIds.push(data.frames[i].sprite_id);
							this.delays.push(data.frames[i].delay);
						}
					}
					
					this.numberOfFrames = this.spriteIds.length;
					
					this.sprites = [];
				},
				
				load: function(manager, callback)
				{
					for(var i = 0; i < this.spriteIds.length; i++) {
						var sprite = manager.getResource(
							SpriteResource.TYPE,
							this.spriteIds[i]
						);
						this.sprites.push(sprite)
					}
					
					this.loaded = true;
					callback();
				},
				
				addFrame: function(sprite, delay)
				{
					this.sprites.push_back(sprite);
					this.delays.push_back(delay);
					this.numberOfFrames++;
				},
				
				getSprite: function(index)
				{
					return this.sprites[index];
				},
				
				getDelay: function(index)
				{
					return this.delays[index];
				},
				
				nextFrame: function(index)
				{
					return (index + 1) % this.numberOfFrames;
				},
				
				atEnd: function(index)
				{
					return (index + 1) == this.numberOfFrames;
				}
				
			}
		);
		
		AnimationResource.TYPE = 3;
		
		return AnimationResource;
	}
);


define('minibot',['require','minibot/system','minibot/core/Manager','minibot/display/DisplayObject','minibot/display/scene/SceneDisplayObject','minibot/display/scene/Animation','minibot/display/scene/Button','minibot/display/scene/Container','minibot/display/scene/Rect','minibot/display/scene/Sprite','minibot/display/scene/Scene','minibot/display/scene/Text','minibot/display/scene/TextStyle','minibot/display/html/HtmlElement','minibot/display/html/CanvasScene','minibot/engine/Engine','minibot/engine/EngineComponent','minibot/engine/EngineFactory','minibot/engine/EngineObject','minibot/engine/EngineSystem','minibot/engine/component/DisplayComponent','minibot/engine/component/PhysicsComponent','minibot/engine/component/InputComponent','minibot/engine/system/DisplaySystem','minibot/event/EventDispatcher','minibot/event/BaseEvent','minibot/event/MouseEvent','minibot/event/TouchEvent','minibot/event/ButtonEvent','minibot/event/EngineEvent','minibot/event/KeyboardEvent','minibot/event/enum/Keyboard','minibot/geom/Vector2','minibot/geom/Rectangle','minibot/graphics/Color','minibot/graphics/Pattern','minibot/resource/Resource','minibot/resource/ResourceManager','minibot/resource/AnimationResource','minibot/resource/ImageResource','minibot/resource/SpriteResource','minibot/system'],function(require) {
	
	/** @namespace Namespace description. */
	var minibot = {};
	
	var core, display, engine, event, geom, graphics, resource, system;
	
	//minibot.utils = require('minibot/utils');
	minibot.system = require('minibot/system');
	
	/** @namespace Core namespace */
	core = {};
	core.Manager = require('minibot/core/Manager');
	
	/** @namespace Display namespace */
	display = {};
	display.DisplayObject = require('minibot/display/DisplayObject');
	
	/** @namespace Display.Scene namespace */
	display.scene = {};
	display.scene.SceneDisplayObject = require('minibot/display/scene/SceneDisplayObject');
	display.scene.Animation = require('minibot/display/scene/Animation');
	display.scene.Button = require('minibot/display/scene/Button');
	display.scene.Container = require('minibot/display/scene/Container');
	//display.scene.Mask = require('minibot/display/scene/Mask');
	display.scene.Rect = require('minibot/display/scene/Rect');
	//display.scene.RoundedRect = require('minibot/display/scene/RoundedRect');
	display.scene.Sprite = require('minibot/display/scene/Sprite');
	display.scene.Scene = require('minibot/display/scene/Scene');
	display.scene.Text = require('minibot/display/scene/Text');
	display.scene.TextStyle = require('minibot/display/scene/TextStyle');
	
	/** @namespace Display.Html namespace */
	display.html = {};
	display.html.HtmlElement = require('minibot/display/html/HtmlElement');
	display.html.CanvasScene = require('minibot/display/html/CanvasScene');
	
	/** @namespace Engine namespace */
	engine = {};
	engine.Engine = require('minibot/engine/Engine');
	engine.EngineComponent = require('minibot/engine/EngineComponent');
	engine.EngineFactory = require('minibot/engine/EngineFactory');
	engine.EngineObject = require('minibot/engine/EngineObject');
	engine.EngineSystem = require('minibot/engine/EngineSystem');
	
	engine.component = {};
	engine.component.DisplayComponent = require('minibot/engine/component/DisplayComponent');
	engine.component.PhysicsComponent = require('minibot/engine/component/PhysicsComponent');
	engine.component.InputComponent = require('minibot/engine/component/InputComponent');
	
	engine.system = {};
	engine.system.DisplaySystem = require('minibot/engine/system/DisplaySystem');
	
	/** @namespace Event namespace */
	event = {};
	event.EventDispatcher = require('minibot/event/EventDispatcher');
	event.BaseEvent = require('minibot/event/BaseEvent');
	event.MouseEvent = require('minibot/event/MouseEvent');
	event.TouchEvent = require('minibot/event/TouchEvent');
	event.ButtonEvent = require('minibot/event/ButtonEvent');
	event.EngineEvent = require('minibot/event/EngineEvent');
	event.KeyboardEvent = require('minibot/event/KeyboardEvent');
	
	event.enum = {};
	event.enum.Keyboard = require('minibot/event/enum/Keyboard');
	
	/** @namespace Geom namespace */
	geom = {};
	geom.Vector2 = require('minibot/geom/Vector2');
	geom.Rectangle = require('minibot/geom/Rectangle');
	
	/** @namespace Graphics namespace */
	graphics = {};
	graphics.Color = require('minibot/graphics/Color');
	graphics.Pattern = require('minibot/graphics/Pattern');
	
	/** @namespace Resource namespace */
	resource = {};
	resource.Resource = require('minibot/resource/Resource');
	resource.ResourceManager = require('minibot/resource/ResourceManager');
	resource.AnimationResource = require('minibot/resource/AnimationResource');
	resource.ImageResource = require('minibot/resource/ImageResource');
	resource.SpriteResource = require('minibot/resource/SpriteResource');
	
	/** @namespace System namespace */
	system = {};
	system = require('minibot/system');
	
	minibot.core = core;
	minibot.display = display;
	minibot.engine = engine;
	minibot.event = event;
	minibot.geom = geom;
	minibot.graphics = graphics;
	minibot.resource = resource;
	minibot.system = system;
	
	return minibot;

});
    //The modules for your project will be inlined above
    //this snippet. Ask almond to synchronously require the
    //module value for 'main' here and return it as the
    //value to use for the public API for the built file.
    return require('minibot');
}));