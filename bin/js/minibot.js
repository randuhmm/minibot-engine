

define('minibot/utils',['prototype'],
function(p)
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
	
});
define('minibot/core/Manager',
['minibot/utils'],
function(utils)
{
	return utils.define(
		{
			name: 'minibot.core.Manager'
		},
		{
			
			initialize: function(key)
			{
				if(minibot.core.Manager.instanceMap[key] != null) {
					throw new Error(minibot.core.Manager.MULTITON_MSG);
				}
				minibot.core.Manager.instanceMap[key] = this;
			}
		
		},
		{
			instanceMap: [],

			MULTITON_MSG: "minibot.core.Manager instance for this Multiton key already constructed!",

			getInstance: function(key)
			{
				if (null == key)
					return null;
					
				if(minibot.core.Manager.instanceMap[key] == null)
				{
					minibot.core.Manager.instanceMap[key] = new minibot.core.Manager(key);
				}
			
				return minibot.core.Manager.instanceMap[key];
			},
			
			hasCore: function(key)
			{
				return minibot.core.Manager.instanceMap[key] != null;
			},
			
			removeCore: function(key)
			{
				if(minibot.core.Manager.instanceMap[key] == null)
					return;
				
				delete minibot.core.Manager.instanceMap[key];
			}
		}
	);
});

define('minibot/event/EventDispatcher',
['minibot/utils'],
function(utils)
{
	return utils.define(
		{
			name: 'minibot.event.EventDispatcher'
		},
		{
			
			listeners: null,
			
			target: null,
			
			initialize: function(target)
			{
				if(target == undefined || target == null) {
					target = this;
				}
				
				this.target = target;
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
});

define('minibot/display/DisplayObject',
	[
		'minibot/utils', 
		'minibot/event/EventDispatcher'
	],
	function
	(
		utils, 
		EventDispatcher
	)
	{
		
		var $static = {
			ResourceManager: null
		};
		
		var DisplayObject;
		DisplayObject = utils.define(
			{
				name: 'minibot.display.DisplayObject',
				parent: EventDispatcher
			},
			{
				
				parent: null,
				
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
				
			},
			$static
		);
		
		DisplayObject.AddResource = function(klass, type, id)
		{
			if(klass.RESOURCES == undefined) klass.RESOURCES = {};
			if(klass.RESOURCES[type] == undefined) klass.RESOURCES[type] = {};
			klass.RESOURCES[type][id] = null;
		};
		
		DisplayObject.AddObject = function(klass, object)
		{
			if(klass.OBJECTS == undefined) klass.OBJECTS = [];
			klass.OBJECTS.push(object);
		};
		
		DisplayObject.GetResource = function(klass, type, id)
		{
			if(klass.RESOURCES == undefined) return null;
			if(klass.RESOURCES[type] == undefined) return null;
			if(klass.RESOURCES[type][id] == undefined) return null;
			return klass.RESOURCES[type][id];
		};
		
		return DisplayObject;
		
	}
);

define('minibot/display/canvas/CanvasDisplayObject',
['minibot/utils', 'minibot/display/DisplayObject'],
function(utils, DisplayObject)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.display.canvas.CanvasDisplayObject',
			parent: DisplayObject
		},
		// Members
		{
			
			x: 0,
			y: 0,
			w: 0,
			h: 0,
			
			root: null,
			canvas: null,
			
			isVisible: true,
			touchEnabled: true,
			
			initialize: function($super)
			{
				$super();
			},
			
			isCanvasObject: function()
			{
				return true;
			},
			
			render: function(dt, context, x, y)
			{
				// This function must be overloaded in the sub class
			},
			
			onAddedToCanvas: function()
			{
				// This callback is triggered when a canvas object is added to a canvas element
			},
			
			
			onRemovedFromCanvas: function()
			{
				// This callback is triggered when a canvas object is removed from a canvas element
			},
			
			getCanvasX: function()
			{
				var canvasX = 0;
				if(this.parent != null) {
					canvasX += this.parent.getCanvasX();
				}
				canvasX += this.x;
				return canvasX;
			},
			
			getCanvasY: function()
			{
				var canvasY = 0;
				if(this.parent != null) {
					canvasY += this.parent.getCanvasY();
				}
				canvasY += this.y;
				return canvasY;
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
});


define('minibot/display/canvas/Animation',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	var Animation = utils.define(
		// Class Info
		{
			parent: CanvasDisplayObject
		},
		// Members
		{
			
			animation: null,
			
			currentFrame: 0,
			
			currentSprite: null,
			
			currentDelay: null,
			
			time: 0,
			
			loops: 0,
			
			playing: false,
			
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
			
			render: function(dt, context, x, y)
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
				
				context.drawImage(
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
			}
			
		},
		// Statics
		{
			INFINITE_LOOPS: -1
		}
	);
	return Animation;
});

define('minibot/event/BaseEvent',
['minibot/utils'],
function(utils)
{
	return utils.define(
		{
			name: 'minibot.event.BaseEvent'
		},
		{
			
			type: null,
			
			data: null,
			
			initialize: function(type, data)
			{
				this.type = type;
				this.data = data;
			},
			
			isTouchEvent: function()
			{
				return false;
			}
			
		}
	);
});

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


define('minibot/display/canvas/Button',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject', 'minibot/event/UIEvent'],
function(utils, CanvasDisplayObject, UIEvent)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.display.canvas.Button',
			parent: CanvasDisplayObject
		},
		// Members
		{
			
			upState: null,
			downState: null,
			overState: null,
			currentState: null,
			
			states: null,
			
			isDown: false,
			isOver: false,
			
			touchMoveCallback: null,
			touchEndCallback: null,
			
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
				
				this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
				this.touchEndCallback = this.handleTouchEnd.bindAsEventListener(this);
			},
			
			onAddedToCanvas: function($super)
			{
				$super();
				this.states.each(function(displayObject) {
					displayObject.root = this.root;
					displayObject.parent = this;
					displayObject.onAddedToCanvas();
				}.bind(this));
			},
			
			render: function(dt, context, x, y)
			{
				this.currentState.render(dt, context, this.x + x, this.y + y);
				//context.strokeStyle = '#000000';
				//context.strokeRect(this.x + x, this.y + y, this.w, this.h);
			},
			
			dispatchEvent: function($super, event)
			{
				if(!this.isDown) {
					if(event.type == UIEvent.TOUCH_START) {
						this.currentState = this.downState;
						this.isDown = true;
						this.root.addEventListener(UIEvent.TOUCH_MOVE, this.touchMoveCallback);
						this.root.addEventListener(UIEvent.TOUCH_END, this.touchEndCallback);
					}
					if(event.type == UIEvent.TOUCH_END) return;
				} else {
					if(event.type == UIEvent.TOUCH_END) {
						this.currentState = this.upState;
						this.isDown = false;
						this.root.removeEventListener(UIEvent.TOUCH_MOVE, this.touchMoveCallback);
						this.root.removeEventListener(UIEvent.TOUCH_END, this.touchEndCallback);
					}
				}
				return $super(event);
			},
			
			handleTouchMove: function(event)
			{
				var canvasX = this.getCanvasX();
				var canvasY = this.getCanvasY();
				if(
					event.x >= canvasX && 
					event.x <= (canvasX + this.w) && 
					event.y >= canvasY && 
					event.y <= (canvasY + this.h)
				) {
					this.currentState = this.downState;
					this.isOver = true;
				} else {
					this.currentState = this.upState;
					this.isOver = false;
				}
			},
			
			handleTouchEnd: function(event)
			{
				console.log("handleTouchEnd");
				this.currentState = this.upState;
				this.isDown = false;
				this.root.removeEventListener(UIEvent.TOUCH_MOVE, this.touchMoveCallback);
				this.root.removeEventListener(UIEvent.TOUCH_END, this.touchEndCallback);
			}
			
		}
	)
});

define('minibot/display/canvas/Container',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.display.canvas.Container',
			parent: CanvasDisplayObject
		},
		// Members
		{
			
			layers: null,
			touchChildren: true,
			resizable: true,
			
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
					displayObject.canvas = this.canvas;
					displayObject.parent = this;
					displayObject.onAddedToCanvas();
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
							displayObject.onRemovedFromCanvas();
						}
					}
				}
			},
			
			render: function(dt, context, x, y)
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
						
						// check if the display object is off the canvas
						xBounds = this.x + x + displayObject.x;
						yBounds = this.y + y + displayObject.y;
						if(
							xBounds >= this.root.w ||
							xBounds < -1 * displayObject.w ||
							yBounds >= this.root.h ||
							yBounds < -1 * displayObject.h
						) continue;
						
						// render the display object
						displayObject.render(dt, context, this.x + x, this.y + y);
					}
				}
				
				/*
				if(context != undefined)
					context.strokeRect(this.x + x, this.y + y, this.w, this.h);	
				else
					console.log('undefined context??');
				*/
			},
			
			dispatchEvent: function($super, event)
			{
				if(event.isTouchEvent()) {
					if(!this.touchEnabled) return false;
					if(!this.touchChildren) return $super(event);
				}
				
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
			
			onAddedToCanvas: function($super)
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
						displayObject.canvas = this.canvas;
						displayObject.parent = this;
						displayObject.onAddedToCanvas();
					}
				}
			},
			
			onRemovedFromCanvas: function($super)
			{
				$super();
				for(var l = 0; l < this.layers.length; l++) {
					var layer = this.layers[l];
					for(var d = 0; d < layer.length; d++) {
						layer[d].onRemovedFromCanvas();
					}
					this.layers[l] = null;
				}
				this.layers = new Array();
			}
			
		}
	);
});

define('minibot/display/canvas/Mask',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Mask',
			parent: CanvasDisplayObject
		},
		{
			
			base: null,
			mask: null,
			
			maskCanvas: null,
			maskContext: null,
			
			initialize: function($super, base, mask)
			{
				$super();
				
				this.base = base;
				this.mask = mask;
				
				// Setup the mask canvas
				this.maskCanvas = new Element('canvas');
				this.maskCanvas.width = this.base.w + this.base.x;
				this.maskCanvas.height = this.base.h + this.base.y;
				this.maskContext = this.maskCanvas.getContext('2d');
				
				// Draw the mask pixels to the canvas
				this.mask.render(0, this.maskContext, this.base.x, this.base.y);
				
				this.maskContext.globalCompositeOperation = 'source-in';
				
				this.base.render(0, this.maskContext, 0, 0);
				
				this.w = this.maskCanvas.width;
				this.h = this.maskCanvas.height;
				
			},
			
			render: function(dt, context, x, y)
			{
				context.drawImage(
					this.maskCanvas,
					0, //sx,
					0, //sy,
					this.maskCanvas.width, //sw,
					this.maskCanvas.height, //sh,
					this.x + x, //dx,
					this.y + y, //dy,
					this.w, //dw,
					this.h //dh
				)
			}
			
		}
	);
});

define('minibot/display/canvas/Rect',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Rect',
			parent: CanvasDisplayObject
		},
		{		
			fillStyle: null,
			strokeStyle: null,
			
			initialize: function($super, width, height, fillStyle, strokeStyle)
			{
				$super();
				
				if(fillStyle != undefined) this.fillStyle = fillStyle;
				if(strokeStyle != undefined) this.strokeStyle = strokeStyle;
				
				this.w = width;
				this.h = height;
			},
			
			render: function(dt, context, x, y)
			{
				if(this.fillStyle != undefined) {
					context.fillStyle = this.fillStyle;
					context.fillRect(this.x + x, this.y + y, this.w, this.h);
				}
			}
			
		}
	);
});

define('minibot/display/canvas/RoundedRect',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Rect',
			parent: CanvasDisplayObject
		},
		{
			
			radius: null,
			fillStyle: null,
			strokeStyle: null,
			
			initialize: function($super, width, height, radius, fillStyle, strokeStyle)
			{
				$super();
				
				if(fillStyle != undefined) this.fillStyle = fillStyle;
				if(strokeStyle != undefined) this.strokeStyle = strokeStyle;
				
				this.w = width;
				this.h = height;
				
				if( typeof radius === 'string' ) {
					this.radius = [10, 10, 10, 10];
				} else {
					this.radius = radius;
				}
			},
			
			render: function(dt, context, x, y)
			{
				
				var r = this.radius;
				var w = this.w;
				var h = this.h;
				x += this.x;
				y += this.y;
				
				context.beginPath();
				
				
				context.moveTo(x + r[0], y);
				
				context.lineTo(x + w - r[1], y);
				if(r[1] != 0) context.quadraticCurveTo(x + w, y, x + w, y + r[1]);
				
				context.lineTo(x + w, y + h - r[2]);
				if(r[2] != 0) context.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
				
				context.lineTo(x + r[3], y + h);
				if(r[3] != 0) context.quadraticCurveTo(x, y + h, x, y + h - r[3]);
				
				context.lineTo(x, y + r[0]);
				if(r[0] != 0) context.quadraticCurveTo(x, y, x + r[0], y);
				
				context.closePath();
				
				if(this.fillStyle != undefined) {
					context.fillStyle = this.fillStyle;
					context.fill();
				}
				
			}
			
		}
	);
});

define('minibot/display/canvas/Sprite',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Sprite',
			parent: CanvasDisplayObject
		},
		{
			
			sprite: null,
			
			initialize: function($super, sprite)
			{
				$super();
				this.sprite = sprite;
				this.w = sprite.w;
				this.h = sprite.h;
			},
			
			render: function(dt, context, x, y)
			{
				try {
					context.drawImage(
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
});

define('minibot/display/canvas/Text',
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Text',
			parent: CanvasDisplayObject
		},
		{
			
			text: '',
			
			font: null,
			
			fillStyle: null,
			
			textAlign: null,
			
			metrics: null,
			
			initialize: function($super, text, font, fillStyle, textAlign, context)
			{
				$super();
				
				this.text = text;
				
				if(font != undefined) this.font = font;
				if(fillStyle != undefined) this.fillStyle = fillStyle;
				if(textAlign != undefined) this.textAlign = textAlign;
				
				if(context != undefined) {
					this.setStyle(context);
					this.metrics = context.measureText(this.text);
				}
			},
			
			setStyle: function(context)
			{
				if(this.font != null) context.font = this.font;
				if(this.textAlign != null) context.textAlign = this.textAlign;
				if(this.fillStyle != null) context.fillStyle = this.fillStyle;
			},
			
			getText: function()
			{
				return this.text;
			},
			
			setText: function(text)
			{
				this.text = text;
			},
			
			render: function(dt, context, x, y)
			{
				//context.font = 'bold 24px/30px Arial, san-serif';
				//context.fillStyle = '#FFFFFF';
				this.setStyle(context);
				context.fillText(this.text, this.x + x, this.y + y);
			}
			
		}
	);
});

define('minibot/display/canvas/TextInput',[
	'minibot/utils',
	'minibot/display/canvas/CanvasDisplayObject',
	'minibot/event/UIEvent'
],
function(
	utils, 
	CanvasDisplayObject,
	UIEvent
)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.TextInput',
			parent: CanvasDisplayObject
		},
		{
			
			input: null,
			
			inputX: null,
			inputY: null,
			inputW: null,
			inputH: null,
			
			initialize: function($super, value, style)
			{
				$super();
				
				this.input = new Element('input', {type: 'text'});
				
				if(value != undefined) this.input.value = value;
				if(style != undefined) this.input.setStyle(style);
				
				this.input.observe('focus', this.handleInputFocus.bindAsEventListener(this));
				this.input.observe('blur', this.handleInputBlur.bindAsEventListener(this));
			},
			
			setValue: function(value)
			{
				this.input.value = value;
			},
			
			setType: function(type)
			{
				this.input.type = type;
			},
			
			getValue: function()
			{
				return this.input.value;
			},
			
			getType: function()
			{
				return this.input.type;
			},
			
			onAddedToCanvas: function($super)
			{
				$super();
				
				console.log('added text');
				this.canvas.addToHtmlOverlay(this.input);
			},
			
			onRemovedFromCanvas: function($super)
			{
				$super();
				
				this.input.remove();
			},
			
			render: function($super, dt, context, x, y)
			{
				
				if(this.inputX != (this.x + x)) {
					this.inputX = (this.x + x);
					this.input.style.left = (this.inputX / this.canvas.scale) + "px";
				}
				
				if(this.inputY != (this.y + y)) {
					this.inputY = (this.y + y);
					this.input.style.top = (this.inputY / this.canvas.scale) + "px";
				}
				
				if(this.inputW != (this.w)) {
					this.inputW = (this.w);
					this.input.style.width = (this.inputW / this.canvas.scale) + "px";
				}
				
				if(this.inputH != (this.h)) {
					this.inputH = (this.h);
					this.input.style.height = (this.inputH / this.canvas.scale) + "px";
				}
				
				context.strokeRect(this.x + x, this.y + y, this.w, this.h);
				
				$super();
				
			},
			
			dispatchEvent: function($super, event)
			{
				console.log("TextInput::dispatchEvent");
				if(event.type == UIEvent.TOUCH_START) {
					this.input.focus();
				}
				return $super(event);
			},
			
			handleInputFocus: function(event)
			{
				var x = 0;
				var y = 0;
				
				var uIEvent = new UIEvent(UIEvent.FOCUS, {}, x, y);
				this.dispatchEvent(uIEvent);
			},
			
			handleInputBlur: function(event)
			{
				var x = 0;
				var y = 0;
				
				var uIEvent = new UIEvent(UIEvent.BLUR, {}, x, y);
				this.dispatchEvent(uIEvent);
			}
			
		}
	);
});

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
			BLUR:			"HtmlEvent_Blur"
		}
	)
});


define('minibot/display/html/HtmlElement',[
	'minibot/utils',
	'minibot/display/DisplayObject',
	'minibot/event/HtmlEvent'
],
function(
	utils,
	DisplayObject,
	HtmlEvent
)
{
	return utils.define(
		{
			parent: DisplayObject
		},
		{
			
			element: null,
			children: null,
			
			isInDOM: false,
			htmlListeners: null,
			
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
});
define('minibot/resource/Resource',
['minibot/utils'],
function(utils)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.resource.Resource'
		},
		// Members
		{
			
			id: null,
			
			loaded: false,
			
			initialize: function(id)
			{
				this.id = id;
			},
			
			load: function(manager, callback)
			{
				// Overload this function in the base class
				this.loaded = true;
				callback.defer();
			},
			
			isLoaded: function()
			{
				return this.loaded;
			}
			
		}
	);
});

define('minibot/resource/ResourceType',
['minibot/utils'],
function(utils)
{
	return utils.declare(
		'minibot.resource.ResourceType',
		{
			IMAGE:		1,
			SPRITE:		2,
			ANIMATION:	3,
			SOUND:		4
		}
	);
});

define('minibot/resource/SpriteResource',
['minibot/utils', 'minibot/resource/Resource', 'minibot/resource/ResourceType'],
function(utils, Resource, ResourceType)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.resource.SpriteResource',
			parent: Resource
		},
		// Members
		{
			
			imageId: null,
			
			imageResource: null,
			
			img: null,
			
			x: 0,
			y: 0,
			w: -1,
			h: -1,
			
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
				this.imageResource = manager.getResource(
					ResourceType.IMAGE,
					this.imageId
				);
				
				this.img = this.imageResource.img;
				
				if(this.w == -1) this.w = this.img.width;
				if(this.h == -1) this.h = this.img.height;
				
				this.loaded = true;
				callback();
			}
			
		}
	);
});

define('minibot/display/html/Canvas',
['minibot/utils', 'minibot/display/html/HtmlElement', 'minibot/display/canvas/Container', 'minibot/event/UIEvent', 'minibot/resource/SpriteResource'],
function(utils, HtmlElement, Container, UIEvent, SpriteResource)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.display.html.Canvas',
			parent: HtmlElement
		},
		// Members
		{
			
			scale: 1,
			context: null,
			container: null,
			overlay: null,
			
			initialize: function($super, element, scale, overlay)
			{
				if(element == undefined || element == null) element = new Element('canvas');
				$super(element);
				
				if(scale != undefined) this.scale = scale;
				if(overlay != undefined) this.overlay = overlay;
				
				this.context = this.element.getContext("2d");
				
				this.container = new Container();
				this.container.resizable = false;
				this.container.w = this.element.width;
				this.container.h = this.element.height;
				this.container.root = this.container;
				this.container.canvas = this;
				
				var topElement = element;
				if(overlay != undefined) topElement = overlay;
				
				if('createTouch' in document) {
					topElement.observe('touchstart', this.handleUIEvent.bind(this));
					topElement.observe('touchend', this.handleUIEvent.bind(this));
					topElement.observe('touchmove', this.handleUIEvent.bind(this));
				} else {
					topElement.observe('mousedown', this.handleUIEvent.bind(this));
					topElement.observe('mouseup', this.handleUIEvent.bind(this));
					topElement.observe('mousemove', this.handleUIEvent.bind(this));
				}
			},
			
			asSpriteResource: function(sx, sy, sw, sh)
			{
				var resource = new SpriteResource();
				if(sx == undefined) sx = 0;
				if(sy == undefined) sy = 0;
				if(sw == undefined) sw = this.w;
				if(sh == undefined) sh = this.h;
				
				resource.img = this.element;
				resource.x = sx;
				resource.y = sy;
				resource.w = sw;
				resource.h = sh;
				
				return resource;
			},
			
			addChild: function(displayObject, layer)
			{
				if(layer == undefined || layer == null) layer = 0;
				this.container.addChild(displayObject, layer);
				//var event = new DisplayEvent(DisplayEvent.ADDED_TO_CANVAS, {});
				//displayObject.dispatchEvent(event);
			},
			
			removeChild: function(displayObject)
			{
				this.container.removeChild(displayObject);
			},
			
			removeAllChildren: function()
			{
				this.container.layers = [];
			},
			
			addToHtmlOverlay: function(element)
			{
				if(this.overlay == undefined) return;
				
				this.overlay.insert(element);
			},
			
			setHeight: function(height)
			{
				this.h = height;
				this.element.height = height;
				this.container.h = height;
			},
			
			setWidth: function(width)
			{
				this.w = width;
				this.element.width = width;
				this.container.w = width;
			},
			
			clear: function()
			{
				this.element.width = this.element.width;
			},
			
			render: function(dt)
			{
				/*
				if(CanvasObject.LastTime == null) {
					CanvasObject.LastTime = time;
				} else {
					CanvasObject.LastTime = CanvasObject.ThisTime;
				}
				CanvasObject.ThisTime = time;
				*/
				//CanvasObject.DT = dt;
				
				// Render to the buffer
				//this.bufferElement.width = this.element.width;
				this.container.render(dt, this.context);
				
				// Copy the buffer to the canvas
				//this.element.width = this.element.width;
				//this.context.drawImage(this.bufferElement, 0, 0, this.element.width, this.element.height);
				
			},
			
			handleUIEvent: function(event)
			{
				event.preventDefault();
				
				var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
				var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
				var type;
				
				if('createTouch' in document) {
					x += event.changedTouches[0].clientX;
					y += event.changedTouches[0].clientY;
				} else {
					x += event.clientX;
					y += event.clientY;
				}
				
				x = x * this.scale;
				y = y * this.scale;
				
				switch(event.type) {
					case 'touchstart':
					case 'mousedown':
						type = UIEvent.TOUCH_START;
						break;
					case 'touchmove':
					case 'mousemove':
						//return;
						type = UIEvent.TOUCH_MOVE;
						break;
					case 'touchend':
					case 'mouseup':
						type = UIEvent.TOUCH_END;
						break;
					default:
						return;
				}
				
				var uIEvent = new UIEvent(type, {}, x, y);
				this.container.dispatchEvent(uIEvent);
			}
			
		}
	);
});
define('minibot/resource/ResourceManager',[
	'minibot/utils',
	'minibot/core/Manager'
],
function(
	utils,
	Manager
)
{
	var ResourceManager = utils.define(
		// Class Info
		{
			name: 'minibot.resource.ResourceManager',
			parent: Manager
		},
		// Members
		{
			
			typeOrder: null,
			typeCount: null,
			
			typeMap: null,
			
			resourceMap: null,
			
			resourceCount: 0,
			loadedCount: 0,
			typeIndex: null,
			typeLoadedCount: 0,
			
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
	
	ResourceManager.getInstance = function(key)
	{
		if (!Manager.hasCore(key)) {
			new ResourceManager(key);
		}
		var retVal = Manager.getInstance(key);
		return retVal;
	};
	
	return ResourceManager;
	
});

define('minibot/resource/AnimationResource',
['minibot/utils', 'minibot/resource/Resource'],
function(utils, Resource)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.resource.AnimationResource',
			parent: Resource
		},
		// Members
		{
			
			numberOfFrames: 0,
			
			sprites: null,
			
			spriteIds: null,
			
			delays: null,
			
			initialize: function($super, id, data)
			{
				$super(id);
				
				
				if(data.frames != undefined) this.spriteIds = data.frames;
				if(data.delays != undefined) this.delays = data.delays;
				
				this.numberOfFrames = this.spriteIds.length;
				
				this.sprites = [];
			},
			
			load: function(manager, callback)
			{
				for(var i = 0; i < this.spriteIds.length; i++) {
					var sprite = manager.getResource(
						this.spriteIds[i],
						mb.resource.ResourceType.SPRITE
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
});

define('minibot/resource/ImageResource',
['minibot/utils', 'minibot/resource/Resource'],
function(utils, Resource)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.resource.ImageResource',
			parent: Resource
		},
		// Members
		{
			
			src: null,
			
			img: null,
			
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
				console.log('ImageResource: Failed to load image.');
				callback();
			}
			
		}
	);
});

define('minibot/resource/SoundResource',
['minibot/utils', 'minibot/resource/Resource'],
function(utils, Resource)
{
	return utils.define(
		// Class Info
		{
			name: 'minibot.resource.SoundResource',
			parent: Resource
		},
		// Members
		{
			
			id: null,
			
			src: null,
			
			isSfx: false,
			
			initialize: function(id, src, isSfx)
			{
				this.id = id;
				this.src = src;
				
				if(isSfx != undefined) this.isSfx = isSfx;
			}
			
		}
	);
});


define('minibot',['require','prototype','minibot/utils','minibot/core/Manager','minibot/display/DisplayObject','minibot/display/canvas/CanvasDisplayObject','minibot/display/canvas/Animation','minibot/display/canvas/Button','minibot/display/canvas/Container','minibot/display/canvas/Mask','minibot/display/canvas/Rect','minibot/display/canvas/RoundedRect','minibot/display/canvas/Sprite','minibot/display/canvas/Text','minibot/display/canvas/TextInput','minibot/display/html/HtmlElement','minibot/display/html/Canvas','minibot/event/EventDispatcher','minibot/event/BaseEvent','minibot/event/UIEvent','minibot/resource/Resource','minibot/resource/ResourceType','minibot/resource/ResourceManager','minibot/resource/AnimationResource','minibot/resource/ImageResource','minibot/resource/SoundResource','minibot/resource/SpriteResource'],function(require) {
	
	var minibot = {};
	
	require('prototype');
	
	minibot.utils = require('minibot/utils');
	
	// Core Module
	minibot.core = {};
	minibot.core.Manager = require('minibot/core/Manager');
	
	// Display Module 
	minibot.display = {};
	minibot.display.canvas = {};
	minibot.display.html = {};
	
	minibot.display.DisplayObject = require('minibot/display/DisplayObject');
	
	minibot.display.canvas.CanvasDisplayObject = require('minibot/display/canvas/CanvasDisplayObject');
	minibot.display.canvas.Animation = require('minibot/display/canvas/Animation');
	minibot.display.canvas.Button = require('minibot/display/canvas/Button');
	minibot.display.canvas.Container = require('minibot/display/canvas/Container');
	minibot.display.canvas.Mask = require('minibot/display/canvas/Mask');
	minibot.display.canvas.Rect = require('minibot/display/canvas/Rect');
	minibot.display.canvas.RoundedRect = require('minibot/display/canvas/RoundedRect');
	minibot.display.canvas.Sprite = require('minibot/display/canvas/Sprite');
	minibot.display.canvas.Text = require('minibot/display/canvas/Text');
	minibot.display.canvas.TextInput = require('minibot/display/canvas/TextInput');
	
	minibot.display.html.HtmlElement = require('minibot/display/html/HtmlElement');
	minibot.display.html.Canvas = require('minibot/display/html/Canvas');
	//minibot.display.html.Container = require('minibot/display/html/Container');
	
	// Event Module 
	minibot.event = {};
	minibot.event.EventDispatcher = require('minibot/event/EventDispatcher');
	minibot.event.BaseEvent = require('minibot/event/BaseEvent');
	minibot.event.UIEvent = require('minibot/event/UIEvent');
	
	// Resource Module 
	minibot.resource = {};
	minibot.resource.Resource = require('minibot/resource/Resource');
	minibot.resource.ResourceType = require('minibot/resource/ResourceType');
	minibot.resource.ResourceManager = require('minibot/resource/ResourceManager');
	minibot.resource.AnimationResource = require('minibot/resource/AnimationResource');
	minibot.resource.ImageResource = require('minibot/resource/ImageResource');
	minibot.resource.SoundResource = require('minibot/resource/SoundResource');
	minibot.resource.SpriteResource = require('minibot/resource/SpriteResource');
	
	return minibot;

});
