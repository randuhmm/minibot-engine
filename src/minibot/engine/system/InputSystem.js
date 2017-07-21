
import EngineSystem from 'minibot/engine/EngineSystem';
import EngineEvent from 'minibot/event/EngineEvent';
import {BindAsEventListener} from 'minibot/core/Utils';


class InputSystem extends EngineSystem
{

  constructor(type)
  {
    super(type);
    this.inputQueue = [];
    this.inputHandlers = {};
  }

  onAddedToEngine()
  {
    this.addEventListener(EngineEvent.INPUT, BindAsEventListener(this.handleInput, this));
  }  

  update(dt)
  {
    while(this.inputQueue.length) {
      var q = this.inputQueue.shift();
      while(this.inputQueue.length && this.inputQueue[0].type == q.type) {
        q = this.inputQueue.shift();
      }
      var c = this.inputHandlers[q.type];
      if(c != null) {
        c.input(q.type, q.data);
      }
    }
  }

  handleInput(event)
  {
    this.inputQueue.push(event.data);
  }

  addInputHandler(component, type)
  {
    if(this.inputHandlers[type] != null) {
      // THROW AN ERROR HERE or change to array type...
      alert('hey fix this so it can use multiple handlers');
    } else {
      this.inputHandlers[type] = component;
    }
  }

  removeInputHandler(component, type)
  {

  }
 
}

export default InputSystem


