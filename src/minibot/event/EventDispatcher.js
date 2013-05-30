/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
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
