

class EventDispatcher
/** @lends event.EventDispatcher# */
{

  /**
   * Creates a new EventDispatcher instance.
   * @class Relegates and dispatches events to a target.
   * Events can be attached to targets in order to keep the flow of processes running as intended.
   * @constructs
   */
  constructor()
  {
    this.listeners = {};
  }
  /**
   * Registers an eventListener to a target.
   * @param {type} type The data type of event the specified listener is looking for.
   * @param {object} callback The listener object that recieves the specified type.
   */
  addEventListener(type, callback)
  {
    var callbacks;
    if(this.listeners[type] == undefined) {
      callbacks = new Array();
      this.listeners[type] = callbacks;
    } else {
      callbacks = this.listeners[type];
    }
    callbacks.push(callback);
  }
  /**
   * Returns whether or not the EventDispatcher has an event listener for the specified type.
   * @param {type} type The data type of the event the specified listener is looking for.
   * @returns {boolean} A value indicating whether or not an event listener for the specified type is available.
   */
  hasEventListener(type)
  {
    return (this.listeners[type] != undefined);
  }
  /**
   * Sends the event to the EventDispatcher to be sent into the event flow.
   * @param {event} event The event to be sent into the event flow.
   * @returns {boolean} A value indicating whether or not the event was successfully dispatched.
   */
  dispatchEvent(event)
  {
    var callbacks;
    if(this.listeners[event.type] == undefined) {
      return false;
    } else {
      callbacks = this.listeners[event.type];
    }
    event.target = this;
    for(var i = 0; i < callbacks.length; i++) {
      var callback = callbacks[i];
      callback(event);
    }
    return true;
  }
  /**
   * Gets rid of an eventListener.
   * @param {type} type The type of data the specified listener is looking for.
   * @param {object} callback The listener object that recieves the specified type.
   */
  removeEventListener(type, callback)
  {
    var callbacks;
    if(this.listeners[type] == undefined) {
      return;
    } else {
      callbacks = this.listeners[type];
    }
    var i = callbacks.indexOf(callback);
    if(i == -1) return;
    callbacks.splice(i, 1);

    // Remove the callbacks array from the map if empty
    if(callbacks.length == 0) {
      delete this.listeners[type];
    }
  }
  /**
   * Gets rid of all eventListeners on the map.
   */
  removeAllEventListeners()
  {
    this.listeners = {};
  }

}

export default EventDispatcher


