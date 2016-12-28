
import EventDispatcher from 'minibot/event/EventDispatcher';
import EngineEvent from 'minibot/event/EngineEvent';

class EngineObject extends EventDispatcher
{

  // type: null,

  // components: null,

  // data: null,

  // engine: null,

  constructor(type, data)
  {
    super();

    this.type = type;
    this.components = {};

    if(data == undefined) data = {};
    this.data = data;
  }

  getType()
  {
    return this.type;
  }

  addComponent(component)
  {
    var type = component.getType()
    if(this.components[type] == undefined) {
      this.components[type] = component;
      component.setObject(this);
      component.onAddedToObject();
    }
  }

  removeComponent(component)
  {

  }

  setEngine(engine)
  {
    this.engine = engine;
  }

  getEngine()
  {
    return this.engine;
  }

  onAddedToEngine()
  {
    //-- OVERRIDE
  }

  onResourcesLoaded()
  {
    for(var c in this.components) {
      this.components[c].onResourcesLoaded();
    }
  }

  getComponent(type)
  {
    if(this.components[type] != undefined) {
      return this.components[type];
    }
    return null;
  }

  hasComponent(type)
  {
    return (this.components[type] != undefined)
  }

  update(dt)
  {
    for(var c in this.components) {
      this.components[c].update(dt);
    }
  }

  setProperty(key, value)
  {
    this.data[key] = value;
  }

  getProperty(key)
  {
    return this.data[key];
  }

  hasProperty(key)
  {
    return (this.data[key] != undefined);
  }

  buildEvent(type, data, component)
  {
    if(component == undefined) component = null;
    return new EngineEvent(
      type,
      this,
      component,
      data
    );
  }

}

export default EngineObject


