
import Resource from 'minibot/resource/Resource';

class ImageResource extends Resource
/** @lends resource.ImageResource# */
{
  
  /**
   * The src URL.
   * @type String
   */
  // src: null,
  
  /**
   * The Image object.
   * @type Image
   */
  // img: null,
  
  /**
   * Create a new ImageResource object. 
   * @class The base ImageResource object.
   * It is intended to be used as an Interface, although such types are not
   * @extends resource.Resource
   * @constructs
   * @param {String} id The id of the Resource.
   * @param {Object} data The data associated with the Resource.
   * @param 
   */
  constructor(id, data)
  {
    $super(id);
    if(data.src != undefined) this.src = data.src;
  }
  
  load(manager, callback)
  {
    this.loaded = true;
    if(this.src != null) {
      this.img = new Image();
      this.img.addEventListener("load", this.handleLoadImageSuccess.bindAsEventListener(this, callback), false);
      this.img.addEventListener("error", this.handleLoadImageFailure.bindAsEventListener(this, callback), false);
      this.img.src = this.src;
    } else {
      callback();
    }
  }
  
  handleLoadImageSuccess(event, callback)
  {
    callback();
  }
  
  handleLoadImageFailure(event, callback)
  {
    // TODO: Adjust error reporting
    console.log('ImageResource: Failed to load image.');
    callback();
  }
  
}

export default ImageResource


