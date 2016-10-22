

class BaseEvent
/** @lends event.BaseEvent# */
{
  /** The type of event. 
   * @type string
   */
  // type: null,
  /** The event target.
   * @type object
   */
  // target: null,
  /** The object that is actively uses an eventListener on the Event object.
   * @type object
   */
  // currentTarget: null,
  /** Indictes a bubbling event.
   * @type bool
   */
  // bubbles: null,
  /** Indicates if the action associated with an event can be terminated.
   * @type bool
   */
  // cancelable: null,
  /** The current phase of the event flow.
   * @type object
   */
  // currentPhase: null,

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
    this.type = type;
    
    this.bubbles = ((bubbles == undefined)?(false):(bubbles));
    this.cancelable = ((cancelable == undefined)?(false):(cancelable));
  }
  
  /**
   * Stops the default action of the event from being carried out.
   */
  preventDefault()
  {
    
  }
  
}

export default BaseEvent


