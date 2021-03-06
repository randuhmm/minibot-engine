
import BaseEvent from './BaseEvent';

class MouseEvent extends BaseEvent
/** @lends event.MouseEvent# */
{
  /** The x coordinate of the MouseEvent.
   * @type Integer
   */
  // x: null,
  /** The y coordinate of the MouseEvent.
   * @type Integer
   */
  // y: null,
  /** The object upon which the mouse is displayed.
   * @type display.DisplayObject
   */
  // displayObject: null,

  /**
   * Constructs a MouseEvent instance.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} type The type of event.
   * @param {Boolean} bubbles Indicates a bubbling event.
   * @param {Boolean} cancelable Indicates whether the event action can be terminated.
   * @param {Number} x The x coordinate of the MouseEvent.
   * @param {Number} y The y coordinate of the MouseEvent.
   * @param {display.DisplayObject} displayObject The object upon which the mouse is displayed.
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

MouseEvent.CLICK        = "mouseClick";
MouseEvent.MOUSE_DOWN   = "mouseDown";
MouseEvent.MOUSE_UP     = "mouseUp";
MouseEvent.MOUSE_MOVE   = "mouseMove";

export default MouseEvent


