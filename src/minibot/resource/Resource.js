import {Defer} from 'minibot/core/Utils'


class Resource
/** @lends resource.Resource# */
{

  /**
   * Create a new Resource object.
   * @class This is the basic Resource class.
   * It is intended to be used as an Interface, although such types are not
   * enforced in JavaScript.
   * @constructs
   * @param {String} id The id of the Resource.
   */
  constructor(id) {
    this.id = id;
    this.loaded = false;
  }

  /**
   * Load the Resource
   * @param {ResourceManager} manager The ResourceManager instance.
   * @param {Function} callback The callback function to call once loaded.
   */
  load(manager, callback) {
    // Overload this function in the base class
    this.loaded = true;
    Defer(callback, this);
  }

  /**
   * Returns if the Resource has been loaded or not.
   * @type bool
   */
  isLoaded() {
    return this.loaded;
  }

}

export default Resource
