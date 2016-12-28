
import SceneDisplayObject from 'minibot/display/scene/SceneDisplayObject';

class Sprite extends SceneDisplayObject
/** @lends display.scene.Sprite# */
{
  /** The sprite object.
   * @type resource.SpriteResource
   */
  // sprite: null,
  /** Composite object.
   * @ type object
   */
  // composite: null,

  /**
   * Creates a new Sprite instance.
   * @class Creates a sprite to be rendered.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param {resource.SpriteResource} sprite The sprite to be used.
   * @param
   */
  constructor(sprite)
  {
    super();
    this.sprite = sprite;
    this.w = sprite.w;
    this.h = sprite.h;
  }
  /** Renders the sprite.
   * @param {Number} dt The change in time.
   * @param {Number} x The x position to render the sprite.
   * @param {Number} y The y position to render the sprite.
   */
  render(dt, x, y)
  {
    try {
      this.scene.drawImage(
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


