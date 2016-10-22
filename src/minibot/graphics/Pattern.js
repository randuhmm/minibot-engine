

class Pattern
/** @lends graphics.Pattern# */
{
  /** The sprite.
   * @type resource.SpriteResource
   */
  // sprite: null,

  // pattern: null,

  // repeat: null,

  /**
   * Creates a new Pattern instance.
   * @class Creates a sprite to be rendered.
   * @constructs
   * @param {resource.SpriteResource} sprite The sprite to be used.
   * @param
   */
  constructor(sprite, repeat)
  {
    if(repeat == undefined) repeat = Pattern.REPEAT;

    this.repeat = repeat;
    this.type = Pattern.TYPE;
    this.sprite = sprite;
  }

  hasPattern()
  {
    return this.pattern != null;
  }

  setPattern(pattern)
  {
    this.pattern = pattern;
  }

  getPattern()
  {
    return this.pattern;
  }

}

export default Pattern


