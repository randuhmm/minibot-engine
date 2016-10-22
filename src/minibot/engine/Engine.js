
import EventDispatcher from 'minibot/event/EventDispatcher';

class Engine extends EventDispatcher
/** @lends engine.Engine# */
{
  
  // List of all systems
  // systems: null,
  
  // List of all systems by type
  // systemsByType: null,
  
  // List of all objects
  // objects: null,
  
  // List of objects by type
  // objectsByType: null,
  
  // The primary camera
  // camera: null,
  
  // the player
  // player: null,
  
  // The resource map
  // resources: null,
  
  // The update order
  // updateOrder: null,
  
  constructor()
  {
    $super();
    
    this.resources = {};
    
    this.systems = [];
    this.systemsByType = {};
    
    this.objects = [];
    this.objectsByType = {};
    
  }
  
  // Public Methods -->
  
  // Update/Render Methods -->
  
  update(dt)
  {
    
    // Update the Systems in preset order
    for(var s = 0; s < this.updateOrder.length; s++) {
      this.systemsByType[this.updateOrder[s]].update(dt);
    }
    
  }
  
  render(dt)
  {
    // Override this in sub class
  }
  
  renderPhysics(dt)
  {
    // Override this in sub class
  }
  
  setUpdateOrder(updateOrder)
  {
    this.updateOrder = updateOrder;
  }
  
  // <-- Update/Render Methods
  
  // Object/System Methods -->
  
  addSystem(sys)
  {
    // Get type
    var type = sys.getType();
    if(this.systemsByType[type] != undefined) {
      // ERROR?
      return;
    }
    
    // Add to systems
    this.systems.push(sys);
    
    // Add to systemsByType
    this.systemsByType[type] = sys;
    
    sys.setEngine(this);
    sys.onAddedToEngine();
  }
  
  removeSystem()
  {
    
  }
  
  addObject(obj)
  {
    // Add to objects
    this.objects.push(obj);
    
    // Add to objectsByType
    var type = obj.getType();
    if(this.objectsByType[type] == undefined) {
      this.objectsByType[type] = [];
    }
    this.objectsByType[type].push(obj);
    
    // Add to systems if component is available
    for(var i = 0; i < this.systems.length; i++) {
      this.systems[i].addObject(obj);
    }
    
    obj.setEngine(this);
    obj.onAddedToEngine();
  }
  
  removeObject()
  {
    
  }
  
  // <-- Object/System Methods
  
  // Resource Methods -->
  
  getResources()
  {
    return this.resources;
  }
  
  getResource(type, id)
  {
    if(this.resources[type] == undefined) return null;
    if(this.resources[type][id] == undefined) return null;
    return this.resources[type][id];
  }
  
  addResource(type, id)
  {
    if(this.resources[type] == undefined) this.resources[type] = {};
    this.resources[type][id] = null;
  }
  
  onResourcesLoaded()
  {
    var i;
    for(i = 0; i < this.systems.length; i++) {
      this.systems[i].onResourcesLoaded();
    }
    for(i = 0; i < this.objects.length; i++) {
      this.objects[i].onResourcesLoaded();
    }
  }
  
  // <-- Resource Methods
  
  // <-- Public Methods
  
  
  
}

export default Engine


