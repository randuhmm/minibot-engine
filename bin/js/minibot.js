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

define('minibot/utils',
	[],
	function()
	{

		function decorate(object, traits)
		{   
			for (var accessor in traits) {
				object[accessor]= traits[accessor];
			}    
			
			return object;
		}
		
		function declare(qualifiedName, object, scope)
		{
			var nodes= qualifiedName.split('.')
			,   node= scope || window
			,   lastNode
			,   newNode
			,   nodeName;
			
			for (var i= 0, n= nodes.length; i < n; i++) {
				lastNode= node;
				nodeName= nodes[i];
				
				node= (null == node[nodeName] ? node[nodeName] = {} : node[nodeName]);
			}
			
			if (null == object)
				return node;
								
			return lastNode[nodeName]= object;
		}
		
		function define(classInfo, traits, staticTraits)
		{
			if (!classInfo) {
				classInfo= {};
			}
			
			var className= classInfo.name
			,   classParent= classInfo.parent
			,   doExtend= 'function' === typeof classParent
			,   classConstructor
			,   classScope= classInfo.scope || null
			,   prototype
			
			if ('parent' in classInfo && !doExtend) {
				throw new TypeError('Class parent must be Function');
			}
			
			if(doExtend) {
				classConstructor = Class.create(classParent, traits);
			} else {
				classConstructor = Class.create(traits);
			}
			
			if (staticTraits) {
				decorate(classConstructor, staticTraits)
			}
			
			if (className)
			{
				if ('string' !== typeof className)
				{
					throw new TypeError('Class name must be primitive string');
				}
					
				declare(className, classConstructor, classScope);
			}    
			
			return classConstructor;   
		}
		
		(function() {
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
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
		
		return {
			define: define,
			declare: declare,
			decorate: decorate
		};
		
	}
);
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
				
				listeners: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function()
				{
					this.listeners = {};
				},
				
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
				
				hasEventListener: function(type)
				{
					return (this.listeners[type] != undefined);
				},
				
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
						return true;
					}
				},
				
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
				
				removeAllEventListeners: function()
				{
					// TODO
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
					// override
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
				
				x: 0,
				
				y: 0,
				
				w: 0,
				
				h: 0,
				
				root: null,
				
				scene: null,
				
				isVisible: true,
				
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
				},
				
				render: function(dt, x, y)
				{
					// This function must be overloaded in the sub class
				},
				
				onAddedToScene: function()
				{
					// This callback is triggered when a scene object is added to a scene
				},
				
				onRemovedFromScene: function()
				{
					// This callback is triggered when a scene object is removed from a scene
				},
				
				getSceneX: function()
				{
					var sceneX = 0;
					if(this.parent != null) {
						sceneX += this.parent.getSceneX();
					}
					sceneX += this.x;
					return sceneX;
				},
				
				getSceneY: function()
				{
					var sceneY = 0;
					if(this.parent != null) {
						sceneY += this.parent.getSceneY();
					}
					sceneY += this.y;
					return sceneY;
				},
				
				setRoot: function(root)
				{
					this.root = root;
				},
				
				setScene: function(scene)
				{
					this.scene = scene;
				},
				
				setWidth: function(width)
				{
					this.w = width;
				},
				
				setHeight: function(height)
				{
					this.h = height;
				},
				
				hide: function()
				{
					this.isVisible = false;
				},
				
				show: function()
				{
					this.isVisible = true;
				}
				
			}
		);
		
		return SceneDisplayObject;
		
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
					bubbles,
					cancelable,
					localX,
					localY,
					displayObject
				)
				{
					$super(type, bubbles, cancelable);
				}
				
			}
		);
		
		MouseEvent.CLICK			= "click";
		MouseEvent.MOUSE_DOWN		= "mouseDown";
		MouseEvent.MOUSE_UP			= "mouseUp";
		MouseEvent.MOUSE_MOVE		= "mouseMove";
		
		return MouseEvent;
	
	}
);

define('minibot/display/scene/Button',
	[
		'./SceneDisplayObject',
		'minibot/event/MouseEvent'
	],
	function
	(
		SceneDisplayObject,
		MouseEvent
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
					
					this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
					this.mouseUpCallback = this.handleMouseEnd.bindAsEventListener(this);
				},
				
				/** 
				 * Function description.
				 * @access public
				 */
				render: function(dt, context, x, y)
				{
					this.currentState.render(dt, context, this.x + x, this.y + y);
				},
				
				/** 
				 * Function description.
				 * @access protected
				 */
				onAddedToScene: function($super)
				{
					$super();
					this.states.each(function(displayObject) {
						displayObject.root = this.root;
						displayObject.parent = this;
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
							console.log("button down");
							this.currentState = this.downState;
							this.isDown = true;
							this.root.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							this.root.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
						}
						if(event.type == MouseEvent.MOUSE_UP) return;
					} else {
						if(event.type == MouseEvent.MOUSE_UP) {
							this.currentState = this.upState;
							this.isDown = false;
							this.root.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
							this.root.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
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
					var sceneX = this.getSceneX();
					var sceneY = this.getSceneY();
					if(
						event.x >= sceneX && 
						event.x <= (sceneX + this.w) && 
						event.y >= sceneY && 
						event.y <= (sceneY + this.h)
					) {
						this.currentState = this.downState;
						this.isOver = true;
					} else {
						this.currentState = this.upState;
						this.isOver = false;
					}
				},
				
				/** 
				 * Function description.
				 * @access private
				 */
				handleMouseUp: function(event)
				{
					this.currentState = this.upState;
					this.isDown = false;
					this.root.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
					this.root.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
				}
				
			}
		);
		
		return Button;
		
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
				
				layers: null,
				
				touchChildren: true,
				
				resizable: true,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param 
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
				
				render: function(dt, x, y)
				{
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
				}
				
			}
		);
		
		return Container;
		
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
				
				sprite: null,
				
				composite: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param {resource.SpriteResource} sprite
				 * @param
				 */
				initialize: function($super, sprite)
				{
					$super();
					this.sprite = sprite;
					this.w = sprite.w;
					this.h = sprite.h;
				},
				
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
define('minibot/event/HtmlEvent',
['minibot/utils', 'minibot/event/BaseEvent'],
function(utils, BaseEvent)
{
	return utils.define(
		{
			name: 'minibot.event.HtmlEvent',
			parent: BaseEvent
		},
		{
			
			initialize: function($super, type, event)
			{
				$super(type, event);
			}
			
		},
		{
			CLICK:			"HtmlEvent_Click",
			MOUSE_UP:		"HtmlEvent_MouseUp",
			MOUSE_DOWN:		"HtmlEvent_MouseDown",
			MOUSE_MOVE:		"HtmlEvent_MouseMove",
			
			KEY_DOWN:		"HtmlEvent_KeyDown",
			KEY_UP:			"HtmlEvent_KeyUp",
			
			FOCUS:			"HtmlEvent_Focus",
			BLUR:			"HtmlEvent_Blur",
			
			DRAG_ENTER:		"HtmlEvent_DragEnter",
			DRAG_EXIT:		"HtmlEvent_DragExit",
			DRAG_OVER:		"HtmlEvent_DragOver",
			DROP:			"HtmlEvent_Drop"
		}
	)
});


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
			EventDispatcher,
			/** @lends display.scene.Scene# */
			{
				
				container: null,
				
				width: null,
				
				height: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
					
					this.container = new Container();
					this.container.resizable = false;
					this.container.setRoot(this.container);
					this.container.setScene(this);
				},
				
				// Public Methods -->
				
				setWidth: function(width)
				{
					this.width = width;
					this.container.setWidth(width);
				},
				
				getWidth: function()
				{
					return this.width;
				},
				
				setHeight: function(height)
				{
					this.height = height;
					this.container.setHeight(height);
				},
				
				getHeight: function()
				{
					return this.height;
				},
				
				drawImage: function(image, sx, sy, sw, sh, dx, dy)
				{
				
				},
				
				drawLine: function(x1, y1, x2, y2)
				{
					
				},
				
				fillRect: function(x, y, w, h)
				{
					
				},
				
				addChild: function(displayObject, layer)
				{
					if(layer == undefined || layer == null) layer = 0;
					this.container.addChild(displayObject, layer);
				},
				
				removeChild: function(displayObject)
				{
					this.container.removeChild(displayObject);
				},
				
				removeAllChildren: function()
				{
					this.container.removeAll();
				},
				
				render: function(dt)
				{
					this.container.render(dt);
				}
				
				// <-- Public Methods
				
				
			}
		);
		
		return Scene;
		
	}
);

define('minibot/display/html/CanvasScene',
	[
		'minibot/display/scene/Scene',
		'minibot/event/MouseEvent'
	],
	function
	(
		Scene,
		MouseEvent
	)
	{
		
		var CanvasScene = Class.create(
			Scene,
			/** @lends display.html.CanvasScene# */
			{
				
				element: null,
				
				context: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.html.HtmlElement
				 * @constructs
				 */
				initialize: function($super, element)
				{
					$super();
					
					this.element = ((element == undefined)?(new Element('canvas')):(element));
					
					this.context = this.element.getContext("2d");
					
					this.element.observe('mousedown', this.handleMouseEvent.bind(this));
					this.element.observe('mouseup', this.handleMouseEvent.bind(this));
					this.element.observe('mousemove', this.handleMouseEvent.bind(this));
					
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
				
				// <-- Public Methods
				
				handleMouseEvent: function(event)
				{
					event.preventDefault();
					
					var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
					var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
					var type;
					
					x += event.clientX;
					y += event.clientY;
					
					//x = x * this.scale;
					//y = y * this.scale;
					
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
					this.container.dispatchEvent(mouseEvent);
				}
				
			}
		);
		
		return CanvasScene;
		
	}
);
define('minibot/event/UIEvent',
['minibot/utils', 'minibot/event/BaseEvent'],
function(utils, BaseEvent)
{
	return utils.define(
		{
			name: 'minibot.event.UIEvent',
			parent: BaseEvent
		},
		{
			
			canvasX: null,
			canvasY: null,
			
			x: null,
			y: null,
			
			initialize: function($super, type, data, x, y)
			{
				this.canvasX = x;
				this.canvasY = y;
				this.x = x;
				this.y = y;
				$super(type, data);
			},
			
			isTouchEvent: function()
			{
				return true;
			}
			
		},
		{
			TOUCH_START: "uIEvent_TouchStart",
			TOUCH_MOVE: "uIEvent_TouchMove",
			TOUCH_END: "uIEvent_TouchEnd",
			
			FOCUS: "uIEvent_Focus",
			BLUR: "uIEvent_Blur",
		}
	)
});


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
				
				normalise : function () {
					
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
		'minibot/utils',
		'minibot/core/Manager'
	],
	function
	(
		utils,
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
					resources = this.resourceMap[type];
					for(id in resources) {
						this.loadResource(type, id);
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


define('minibot',['require','minibot/utils','minibot/core/Manager','minibot/display/DisplayObject','minibot/display/scene/SceneDisplayObject','minibot/display/scene/Button','minibot/display/scene/Container','minibot/display/scene/Sprite','minibot/display/html/HtmlElement','minibot/display/html/CanvasScene','minibot/event/EventDispatcher','minibot/event/BaseEvent','minibot/event/UIEvent','minibot/geom/Vector2','minibot/resource/Resource','minibot/resource/ResourceManager','minibot/resource/AnimationResource','minibot/resource/ImageResource','minibot/resource/SpriteResource'],function(require) {
	
	/** @namespace Namespace description. */
	var minibot = {};
	
	var core, display, event, geom, resource;
	
	minibot.utils = require('minibot/utils');
	
	/** @namespace Core namespace */
	core = {};
	core.Manager = require('minibot/core/Manager');
	
	/** @namespace Display namespace */
	display = {};
	display.DisplayObject = require('minibot/display/DisplayObject');
	
	/** @namespace Display.Scene namespace */
	display.scene = {};
	display.scene.SceneDisplayObject = require('minibot/display/scene/SceneDisplayObject');
	//display.scene.Animation = require('minibot/display/scene/Animation');
	display.scene.Button = require('minibot/display/scene/Button');
	display.scene.Container = require('minibot/display/scene/Container');
	//display.scene.Mask = require('minibot/display/scene/Mask');
	//display.scene.Rect = require('minibot/display/scene/Rect');
	//display.scene.RoundedRect = require('minibot/display/scene/RoundedRect');
	display.scene.Sprite = require('minibot/display/scene/Sprite');
	//display.scene.Text = require('minibot/display/scene/Text');
	
	/** @namespace Display.Html namespace */
	display.html = {};
	display.html.HtmlElement = require('minibot/display/html/HtmlElement');
	display.html.CanvasScene = require('minibot/display/html/CanvasScene');
	
	/** @namespace Event namespace */
	event = {};
	event.EventDispatcher = require('minibot/event/EventDispatcher');
	event.BaseEvent = require('minibot/event/BaseEvent');
	event.UIEvent = require('minibot/event/UIEvent');
	
	/** @namespace Geom namespace */
	geom = {};
	geom.Vector2 = require('minibot/geom/Vector2');
	
	/** @namespace Resource namespace */
	resource = {};
	resource.Resource = require('minibot/resource/Resource');
	resource.ResourceManager = require('minibot/resource/ResourceManager');
	resource.AnimationResource = require('minibot/resource/AnimationResource');
	resource.ImageResource = require('minibot/resource/ImageResource');
	resource.SpriteResource = require('minibot/resource/SpriteResource');
	
	minibot.core = core;
	minibot.display = display;
	minibot.event = event;
	minibot.geom = geom;
	minibot.resource = resource;
	
	return minibot;

});
    //The modules for your project will be inlined above
    //this snippet. Ask almond to synchronously require the
    //module value for 'main' here and return it as the
    //value to use for the public API for the built file.
    return require('minibot');
}));