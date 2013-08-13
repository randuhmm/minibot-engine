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
		
		system.handleAnimationFrame = function(time)
		{
			window.requestAnimationFrame(this.handleAnimationFrame.bind(this));
			var dt = 0;
			if(this.lastTime != null) dt = time - this.lastTime;
			if(this.onUpdate != null) this.onUpdate(dt);
			if(this.onRender != null) this.onRender(dt);
			this.lastTime = time;
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
			window.requestAnimationFrame(this.handleAnimationFrame.bind(this));
		};
		
		return system;
	}
);