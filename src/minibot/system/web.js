
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
		
		system.handleAnimationFrame = function(time)
		{
			if(!system.isRunning) return;
			system.animationFrameId = window.requestAnimationFrame(system.handleAnimationFrame.bind(this));
			var dt = 0;
			if(system.lastTime != null) dt = time - system.lastTime;
			if(system.onUpdate != null) system.onUpdate(dt);
			if(system.onRender != null) system.onRender(dt);
			system.lastTime = time;
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
		
		system.CreateScene = function(width, height)
		{
			var scene = new CanvasScene();
		};
		
		// <-- Public System Methods
		
		return system;
	
});