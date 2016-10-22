
import BaseEvent from './BaseEvent';

class KeyboardEvent extends BaseEvent
/** @lends event.MouseEvent# */
{

  // key: null,

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
    key
  )
  {
    super(type, bubbles, cancelable);
    this.key = key;
  }

}

export default KeyboardEvent

