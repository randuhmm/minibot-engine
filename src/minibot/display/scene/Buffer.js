
import Container from './Container';

class Buffer extends Container
/** @lends display.scene.Buffer# */
{

  // bufferScene: null,

  constructor(scene)
  {
    super();

    this.bufferScene = scene;

    this.resizable = false;
  }

  renderBuffer(x, y)
  {
    var tempScene = this.scene;
    var tempRoot = this.root;

    this.root = this;
    this.scene = this.bufferScene;
    this.onAddedToScene();

    super.render(0, x, y)

    this.root = tempRoot;
    this.scene = tempScene;
  }

  render()
  {

  }

}

export default Buffer


