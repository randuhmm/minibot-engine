
import EventDispatcher from 'minibot/event/EventDispatcher';

class Engine extends EventDispatcher
/** @lends engine.Engine# */
{

  constructor(systems, updateOrder)
  {
    super();
    // List of all systems
    this.systems = [];
    // List of all systems by type
    this.systemsByType = {};
    // List of all objects
    this.objects = [];
    // List of objects by type
    this.objectsByType = {};
    // The resource map
    this.resources = {};
    // The update order
    this.updateOrder = updateOrder;
    // The primary camera
    this.camera = null;
    // the player
    this.player = null;
    // the scene
    this.scene = null;
    // the scene
    this.viewport = null;

    // Add the systems
    for(var i = 0; i < systems.length; i++) {
      this.addSystem(systems[i]);
    }

    // Initialize the systems
    for(var i = 0; i < this.systems.length; i++) {
      this.systems[i].onInitialized();
    }
  }

  // Public Methods -->

  // Update/Render Methods -->

  start()
  {
    if(this.running) return;
    this.running = true;
  }

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

  setScene(scene)
  {
    this.scene = scene;
  }

  getScene(scene)
  {
    return this.scene;
  }

  setCamera(camera)
  {
    this.camera = camera;
  }

  getCamera(camera)
  {
    return this.camera;
  }

  setViewport(viewport)
  {
    this.viewport = viewport;
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

  getSystem(type)
  {
    return this.systemsByType[type];
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
    var i = this.objects.indexOf(obj);
    if(i != -1) this.objects.splice(i, 1);

    var type = obj.getType();
    var arr = this.objectsByType[type];
    i = arr.indexOf(obj);
    if(i != -1) arr.splice(i, 1);

    for(var i = 0; i < this.systems.length; i++) {
      this.systems[i].removeObject(obj);
    }

    // TODO: Add Removed Hook?
    //obj.onRemovedFromEngine(this);
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


