
import EngineEvent from 'minibot/event/EngineEvent';

class EngineComponent
{
  
  // type: null,
  
  // object: null,
  
  // system: null,
  
  // eventQueue: null,
  
  constructor(type)
  {
    this.type = type;
    this.eventQueue = [];
  }
  
  getType()
  {
    return this.type;
  }
  
  setProperty(key, value)
  {
    this.object.setProperty(key, value);
  }
  
  getProperty(key)
  {
    return this.object.getProperty(key);
  }
  
  hasProperty(key)
  {
    return this.object.hasProperty(key);
  }
  
  setObject(object)
  {
    this.object = object;
  }
  
  getObject()
  {
    return this.object;
  }
  
  onAddedToObject()
  {
    //-- OVERRIDE
  }
  
  onComponentsAdded()
  {
    //-- OVERRIDE
  }
  
  setSystem(system)
  {
    this.system = system;
  }
  
  getSystem()
  {
    return this.system;
  }
  
  onAddedToSystem()
  {
    //-- OVERIDE?
  }
  
  buildEvent(type, data)
  {
    return this.object.buildEvent(type, data, this);
  }
  
  queueEvent(event)
  {
    this.eventQueue.push(event);
  }
  
  flushEventQueue()
  {
    while(this.eventQueue.length) {
      this.dispatchEvent(this.eventQueue.pop());
    }
  }
  
  dispatchEvent(event)
  {
    this.object.dispatchEvent(event);
  }
  
  addEventListener(type, callback)
  {
    this.object.addEventListener(type, callback);
  }
  
  addResource(type, id)
  {
    if(this.system == null) return;
    this.system.addResource(type, id);
  }
  
  getResource(type, id)
  {
    if(this.system == null) return;
    return this.system.getResource(type, id);
  }
  
  onResourcesLoaded()
  {
    
  }
  
  update(dt)
  {
    //-- OVERRIDE
  }
  
}

export default EngineComponent


