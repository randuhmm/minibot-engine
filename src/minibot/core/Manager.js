

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
    if(Manager.instanceMap[key] != null) {
      throw new Error(Manager.MULTITON_MSG);
    }
    Manager.instanceMap[key] = this;
  }

}

export default Manager


