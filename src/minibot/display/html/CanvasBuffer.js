
import Buffer from 'minibot/display/scene/Buffer';

class CanvasBuffer extends Buffer
/** @lends display.html.CanvasBuffer# */
{

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.html.HtmlElement
   * @constructs
   */
  constructor(scene)
  {
    super(scene);
  }

  setWidth(width)
  {
    super.setWidth(width);
    this.bufferScene.setWidth(width);
  }

  setHeight(height)
  {
    super.setWidth(height);
    this.bufferScene.setHeight(height);
  }

  render(dt, x, y)
  {
    var element = this.bufferScene.getElement();
    this.scene.drawImage(element, x*-1, y*-1, this.scene.width, this.scene.height, 0, 0, this.scene.width, this.scene.height);
  }

}

export default CanvasBuffer


