
import CanvasDisplayObject from 'minibot/display/canvas/CanvasDisplayObject';

class Sprite extends CanvasDisplayObject
/** @lends display.canvas.Sprite# */
{
  
  // sprite: null,
  
  // composite: null,
  
  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.canvas.CanvasDisplayObject
   * @constructs
   * @param {resource.SpriteResource} sprite
   * @param
   */
  constructor(sprite)
  {
    $super();
    this.sprite = sprite;
    this.w = sprite.w;
    this.h = sprite.h;
  }
  
  render(dt, context, x, y)
  {
    try {
      context.drawImage(
        this.sprite.img,
        this.sprite.x, //sx,
        this.sprite.y, //sy,
        this.sprite.w, //sw,
        this.sprite.h, //sh,
        this.x + x, //dx,
        this.y + y, //dy,
        this.w, //dw,
        this.h //dh
      );
    } catch(error) {
      console.log('SpriteObject: Fatal Error');
    }
  }
  
}

export default Sprite


