
import BaseEvent from './BaseEvent';

class EngineEvent extends BaseEvent
/** @lends event.EngineEvent# */
{
  /** Description of object.
   * @type object
   */
  // object: null,
  /** Description of component.
   * @type object
   */
  // component: null,
  /** Description of data.
   * @type object
   */
  // data: null,

  /**
   * Creates a new EngineEvent instance.
   * @class Identifies an event and selects appropriate action.
   * Analyzes event data in order to pinpoint significant events and trigger actions.
   * @constructs
   * @param {type} type Description of type.
   * @param {object} object Description of object.
   * @param {object} Description of component.
   * @param {object} data Description of data.
   * @param
   */
  constructor(
    $super,
    type,
    object,
    component,
    data
  )
  {
    super(type, false, false);
    this.object = object;
    this.component = component;
    this.data = data;
  }

}

export default EngineEvent


