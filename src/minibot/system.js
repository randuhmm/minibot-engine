define(
	[
		'./utils'
	],
	function
	(
		
	)
	{
		
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
		
		system.setUpdateCallback = function(f)
		{
			system.onUpdate = f;
		};
		
		system.setRenderCallback = function(f)
		{
			system.onRender = f;
		};
		
		system.run = function()
		{
			// We can't run the system twice!
			if(system.isRunning) return;
			
			system.isRunning = true;
			system.animationFrameId = window.requestAnimationFrame(system.handleAnimationFrame.bind(system));
		};
		
		system.stop = function()
		{
			// We can't stop the system if it isnt running
			if(!system.isRunning) return;
			
			window.cancelAnimationFrame(system.animationFrameId);
			system.isRunning = false;
		}
		
		return system;
	}
);