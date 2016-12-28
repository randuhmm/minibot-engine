
import EngineSystem from 'minibot/engine/EngineSystem';

class DisplaySystem extends EngineSystem
{

  // scene: null,

  // layers: null,

  constructor(type, scene)
  {
    super(type);

    this.scene = scene;

    this.layers = new Array();

  }

  update(dt)
  {
    this.updateComponents(dt);
  }

  addObject(obj)
  {
    var c = $super(obj);
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
    return this.scene;
  }

  getCamera()
  {
    return this.engine.getCamera();
  }

  // render the scene layer by layer, check if each component is on screen first
  render(dt)
  {

    var camera = this.getCamera();
    var cameraX = camera.getProperty("x") * -1;
    var cameraY = camera.getProperty("y") * -1;

    var i, j, layer, component;
    for(i = 0; i < this.layers.length; i++) {
      layer = this.layers[i];
      for(j = 0; j < layer.length; j++) {
        component = layer[j];
        if(!component.isVisible()) continue;
        component.render(dt, i, cameraX, cameraY);
      }
    }
  }

}

export default DisplaySystem


