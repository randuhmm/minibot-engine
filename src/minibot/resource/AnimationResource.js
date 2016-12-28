
import Resource from 'minibot/resource/Resource';
import SpriteResource from 'minibot/resource/SpriteResource';

class AnimationResource extends Resource
/** @lends resource.AnimationResource# */
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

    this.spriteIds = [];
    this.delays = [];
    if(data.frames != undefined) {
      for(var i = 0; i < data.frames.length; i++) {
        this.spriteIds.push(data.frames[i].sprite_id);
        this.delays.push(data.frames[i].delay);
      }
    }

    this.numberOfFrames = this.spriteIds.length;

    this.sprites = [];
  }

  load(manager, callback)
  {
    for(var i = 0; i < this.spriteIds.length; i++) {
      var sprite = manager.getResource(
        SpriteResource.TYPE,
        this.spriteIds[i]
      );
      this.sprites.push(sprite)
    }

    this.loaded = true;
    callback();
  }

  addFrame(sprite, delay)
  {
    this.sprites.push_back(sprite);
    this.delays.push_back(delay);
    this.numberOfFrames++;
  }

  getSprite(index)
  {
    return this.sprites[index];
  }

  getDelay(index)
  {
    return this.delays[index];
  }

  nextFrame(index)
  {
    return (index + 1) % this.numberOfFrames;
  }

  atEnd(index)
  {
    return (index + 1) == this.numberOfFrames;
  }

}

AnimationResource.TYPE = 3;

export default AnimationResource;
