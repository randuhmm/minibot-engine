
import BaseEvent from './BaseEvent';

class TouchEvent extends BaseEvent
/** @lends event.MouseEvent# */
{

  // x: null,

  // y: null,

  // displayObject: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} type
   * @param {Boolean} bubbles
   * @param {Boolean} cancelable
   * @param {Number} x
   * @param {Number} y
   * @param {display.DisplayObject} displayObject
   * @param
   */
  constructor(
    type,
    bubbles,
    cancelable,
    x,
    y,
    displayObject
  )
  {
    super(type, bubbles, cancelable);
    this.x = x;
    this.y = y;
    this.displayObject = displayObject;
  }

}

export default TouchEvent

