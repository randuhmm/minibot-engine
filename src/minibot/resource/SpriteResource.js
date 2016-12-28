
import Resource from 'minibot/resource/Resource';
import ImageResource from 'minibot/resource/ImageResource';

class SpriteResource extends Resource
/** @lends resource.SpriteResource# */
{

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends resource.Resource
   * @constructs
   * @param {String} id The id of the Resource.
   * @param {Object} data The data associated with the Resource.
   * @param
   */
  constructor(id, data)
  {
    super(id);

    this.imageId = null;
    this.imageResource = null;
    this.img = null;
    this.x = 0;
    this.y = 0;
    this.w = -1;
    this.h = -1;

    if(data != undefined) {
      if(data.image_id != undefined) this.imageId = data.image_id;
      else if(data.imageId != undefined) this.imageId = data.imageId;

      if(data.x != undefined) this.x = data.x;
      if(data.y != undefined) this.y = data.y;
      if(data.w != undefined) this.w = data.w;
      if(data.h != undefined) this.h = data.h;
    }
  }

  load(manager, callback)
  {
    try {
      this.imageResource = manager.getResource(
        ImageResource.TYPE,
        this.imageId
      );

      this.img = this.imageResource.img;

      if(this.w == -1) this.w = this.img.width;
      if(this.h == -1) this.h = this.img.height;

      this.loaded = true;
    } catch(e) {
      console.log("ERROR");
    }

    callback();
  }
}

SpriteResource.TYPE = 2;

export default SpriteResource


