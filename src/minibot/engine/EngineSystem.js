

class EngineSystem
{
  
  // type: null,
  
  // components: null,
  
  // componentsByObject: null,
  
  // engine: null,
  
  constructor(type)
  {
    this.type = type;
    
    this.components = [];
    
    this.componentsByObject = {};
    
  }
  
  getType()
  {
    return this.type;
  }
  
  addObject(obj)
  {
    if(obj.hasComponent(this.type)) {
      var c = obj.getComponent(this.type);
      this.components.push(c);
      this.componentsByObject[obj] = c;
      
      c.setSystem(this);
      c.onAddedToSystem();
      
      return c;
    }
    
    return null;
  }
  
  addResource(type, id)
  {
    if(!this.engine) return;
    this.engine.addResource(type, id);
  }
  
  getResource(type, id)
  {
    if(!this.engine) return;
    return this.engine.getResource(type, id);
  }
  
  removeObject(obj)
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
    
  }
  
  update(dt)
  {
    //-- OVERRIDE
  }
  
  // Helper function to update all components of the system
  updateComponents(dt)
  {
    for(var i = 0; i < this.components.length; i++) {
      this.components[i].update(dt);
    }
  }
  
}

export default EngineSystem


