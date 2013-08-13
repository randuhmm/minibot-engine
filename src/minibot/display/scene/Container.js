define(
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
