
import EngineComponent from 'minibot/engine/EngineComponent';

class DisplayComponent extends EngineComponent
{

  // scene: null,

  constructor(type)
  {
    super(type);
  }

  update(dt)
  {

  }

  onAddedToSystem()
  {
    this.scene = this.getSystem().getScene();
  }

  render(dt, layer, x, y)
  {
    // override
  }

  getLayers()
  {
    // override
    return this.layers;
  }

  setLayers(layers)
  {
    // override
    this.layers = layers;
  }

  isVisible()
  {
    // override
    return true;
  }

}

export default DisplayComponent


