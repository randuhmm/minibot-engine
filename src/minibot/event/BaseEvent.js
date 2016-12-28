

class BaseEvent
/** @lends event.BaseEvent# */
{

  /**
   * Constructs a new BaseEvent instance.
   * @class An event class that can process specific events.
   * Passes on objects to specific management events.
   * @constructs
   * @param {String} type The type of event.
   * @param {Boolean} bubbles Flags if the event bubbles after the capture phase.
   * @param {Boolean} cancelable Flags if the event is able to cancel at any point in the event cycle.
   */
  constructor(type, bubbles, cancelable)
  {
    /** The type of event.
     * @type string
     */
    this.type = type;
    /** The event target.
     * @type object
     */
    this.target = null;
    /** The object that is actively uses an eventListener on the Event object.
     * @type object
     */
    this.currentTarget = null;
    /** Indictes a bubbling event.
     * @type bool
     */
    this.bubbles = ((bubbles == undefined)?(false):(bubbles));
    /** Indicates if the action associated with an event can be terminated.
     * @type bool
     */
    this.cancelable = ((cancelable == undefined)?(false):(cancelable));
    /** The current phase of the event flow.
     * @type object
     */
    this.currentPhase = null;
  }

  /**
   * Stops the default action of the event from being carried out.
   */
  preventDefault()
  {

  }

}


export default BaseEvent


