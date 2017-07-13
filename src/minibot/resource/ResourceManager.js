import Manager from 'minibot/core/Manager';
import * as Utils from 'minibot/core/Utils';


class ResourceManager extends Manager
/** @lends resource.ResourceManager# */
{

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends core.Manager
   * @constructs
   * @param {String} key The instance key.
   * @param
   */
  constructor(key)
  {
    super(key);

    this.resourceCount = 0;
    this.loadedCount = 0;
    this.typeIndex = null;
    this.typeLoadedCount = 0;

    this.typeOrder = [];
    this.typeCount = [];
    this.typeMap = {};
    this.resourceMap = {};
  }

  addType(type, className)
  {
    if(type in this.typeMap) return;
    this.typeOrder.push(type);
    this.typeCount.push(0);
    this.typeMap[type] = className;
    this.resourceMap[type] = {};
  }

  addResource(type, id, data)
  {
    if(this.typeMap[type] == undefined) return;
    if(id in this.resourceMap[type]) return;
    var className = this.typeMap[type];
    var resource = new className(id, data);
    this.resourceMap[type][id] = resource;
    this.resourceCount += 1;

    for(var i = 0; i < this.typeOrder.length; i++) {
      if(type == this.typeOrder[i]) {
        this.typeCount[i] += 1;
        break;
      }
    }

  }

  loadAll(progressCallback, completeCallback)
  {
    this.progressCallback = progressCallback;
    this.completeCallback = completeCallback;

    this.typeIndex = null;
    this.loadNextType();

  }

  loadNextType()
  {
    if(this.typeIndex == null) {
      this.typeIndex = 0;
    } else {
      this.typeIndex += 1;
    }

    if(this.typeIndex >= this.typeOrder.length) {
      Utils.Defer(this.completeCallback, this);
      return;
    }

    this.typeLoadedCount = 0;

    var type = this.typeOrder[this.typeIndex];
    var resources;
    var id;
    var count = 0;
    resources = this.resourceMap[type];

    for(id in resources) {
      this.loadResource(type, id);
      count++;
    }

    if(count == 0) {
      this.loadNextType();
    }
  }

  loadResource(type, id)
  {
    var resource = this.resourceMap[type][id];
    if(resource.isLoaded()) {
      this.handleResourceLoaded();
    } else {
      resource.load(this, Utils.Bind(this.handleResourceLoaded, this));
    }
  }

  handleResourceLoaded()
  {
    this.typeLoadedCount += 1;
    var progress = Number(1 / this.resourceCount);
    this.progressCallback(progress);

    if(this.typeLoadedCount >= this.typeCount[this.typeIndex]) {
      Utils.Defer(this.loadNextType, this);
    }
  }

  getResource(type, id)
  {
    if(this.resourceMap[type] == undefined) return null;
    if(this.resourceMap[type][id] == undefined) return null;

    return this.resourceMap[type][id];
  }

}

ResourceManager.getInstance = function(key)
{
  if(!Manager.hasCore(key)) {
    new ResourceManager(key);
  }
  var retVal = Manager.getInstance(key);
  return retVal;
};


export default ResourceManager;


