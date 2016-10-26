
var minibot = require('minibot');
var CanvasScene = minibot.display.html.CanvasScene;

var BaseDemo = function(element, options)
{
  if(options === null || options === undefined) {
    options = {};
  }
  this.element = element;
  this.canvasElement = document.createElement('canvas');
  this.canvasElement.setAttribute('width', '640');
  this.canvasElement.setAttribute('height', '320');
  this.canvasElement.innerHTML =
    '<p>' +
      '<b>Error:</b> You are using a browser that does not support the <i>&lt;canvas&gt;</i> tag.' +
      'Please view this page using a browser that supports this feature. Thanks!' +
    '</p>';
  options['element'] = this.canvasElement;
  this.scene = new CanvasScene(options);
  this.element.appendChild(this.canvasElement);
}

BaseDemo.prototype.run = function()
{
  minibot.system.SetUpdateCallback(this.update.bind(this));
  minibot.system.SetRenderCallback(this.render.bind(this));
  minibot.system.Run();
};

BaseDemo.prototype.destroy = function()
{
  this.canvasElement.remove();
  minibot.system.Stop();
  minibot.system.SetRenderCallback(null);
};

BaseDemo.prototype.update = function(dt)
{
  // Override in subclass
};

BaseDemo.prototype.render = function(dt)
{
  // Override in subclass
};

export default BaseDemo;
