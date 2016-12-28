

class Manager
/** @lends core.Manager# */
{

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} key The instance key.
   */
  constructor(key)
  {
    if(key in Manager.instanceMap) {
      throw new Error(Manager.MULTITON_MSG);
    }
    Manager.instanceMap[key] = this;
  }

}


Manager.instanceMap = [];

Manager.MULTITON_MSG = "Manager instance for this Multiton key already constructed!";

Manager.getInstance = function(key)
{
  if(null === key) return null;
  if(Manager.instanceMap[key] === null) {
    Manager.instanceMap[key] = new Manager(key);
  }
  return Manager.instanceMap[key];
};

Manager.hasCore = function(key)
{
  return key in Manager.instanceMap;
};

Manager.removeCore = function(key)
{
  if(Manager.instanceMap[key] === null)
    return;
  delete Manager.instanceMap[key];
};


export default Manager;


