define(
	[],
	function()
	{
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
		
		
		var GameLoop = {};
		
		GameLoop.onUpdate = null;
		
		GameLoop.onRender = null;
		
		GameLoop.lastTime = null;
		
		GameLoop.isRunning = false;
		
		GameLoop.animationFrameId = null;
		
		GameLoop.handleAnimationFrame = function(time)
		{
			if(!GameLoop.isRunning) return;
			GameLoop.animationFrameId = window.requestAnimationFrame(GameLoop.handleAnimationFrame.bind(this));
			var dt = 0;
			if(GameLoop.lastTime != null) dt = time - GameLoop.lastTime;
			if(GameLoop.onUpdate != null) GameLoop.onUpdate(dt);
			if(GameLoop.onRender != null) GameLoop.onRender(dt);
			GameLoop.lastTime = time;
		};
		
		GameLoop.setUpdateCallback = function(f)
		{
			GameLoop.onUpdate = f;
		};
		
		GameLoop.setRenderCallback = function(f)
		{
			GameLoop.onRender = f;
		};
		
		GameLoop.run = function()
		{
			// We can't run the GameLoop twice!
			if(GameLoop.isRunning) return;
			
			GameLoop.isRunning = true;
			GameLoop.animationFrameId = window.requestAnimationFrame(GameLoop.handleAnimationFrame.bind(GameLoop));
		};
		
		GameLoop.stop = function()
		{
			// We can't stop the GameLoop if it isnt running
			if(!GameLoop.isRunning) return;
			
			window.cancelAnimationFrame(GameLoop.animationFrameId);
			GameLoop.isRunning = false;
		}
		
		return GameLoop;
		
	}
);