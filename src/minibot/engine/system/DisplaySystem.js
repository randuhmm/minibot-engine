
import EngineSystem from 'minibot/engine/EngineSystem';

class DisplaySystem extends EngineSystem
{

  constructor(type)
  {
    super(type);
    this.scene = null;
    this.layers = new Array();
  }

  update(dt)
  {
    this.updateComponents(dt);
  }

  addObject(obj)
  {
    var c = super.addObject(obj);
    if(c == null) return null;

    var l = c.getLayers();
    for(var i = 0; i < l.length; i++) {
      this.addToLayer(c, l[i]);
    }
  }

  addToLayer(component, layer)
  {
    while(!this.layers[layer]) {
      this.layers.push([]);
    }
    this.layers[layer].push(component);
  }

  onAddedToEngine()
  {
    // Setup the world?
  }

  getScene()
  {
    return this.engine.getScene();
  }

  getCamera()
  {
    return this.engine.getCamera();
  }

  // render the scene layer by layer, check if each component is on screen first
  render(dt)
  {

    var x = 0;
    var y = 0;
    var camera = this.getCamera();
    if(camera != null) {
      var x = camera.getProperty("x") * -1;
      var y = camera.getProperty("y") * -1;
    }

    var i, j, layer, component;
    for(i = 0; i < this.layers.length; i++) {
      layer = this.layers[i];
      for(j = 0; j < layer.length; j++) {
        component = layer[j];
        if(!component.isVisible()) continue;
        component.render(dt, i, x, y);
      }
    }
  }

}

export default DisplaySystem


