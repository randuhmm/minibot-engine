
define(function(require) {

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
		
		system.animationFrameId = null;
		
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
			
		};
		
		system.Stop = function()
		{
			
		}
		
		system.CreateScene = function(width, height)
		{
			
		}
		
		// <-- Public System Methods
		
		return system;
	
});