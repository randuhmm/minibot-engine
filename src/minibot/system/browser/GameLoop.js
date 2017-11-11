

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

export default GameLoop;
