
import Color from 'minibot/graphics/Color';

class TextStyle
/** @lends display.scene.TextStyle# */
{

  // family: null,

  // size: null,

  // align: null,

  // color: null,

  // weight: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} family
   * @param {int} size
   * @param {String} color
   * @param {String} align
   * @param
   */
  constructor(family, size, color, align, weight)
  {

    this.family = family;
    this.size = size;
    this.color = color;
    this.align = align;
    this.weight = (weight)?(weight):('');

  }

  getFamily()
  {
    return this.family;
  }

  getSize()
  {
    return this.size;
  }

  getColor()
  {
    return this.color;
  }

  getAlign()
  {
    return this.align;
  }

  getWeight()
  {
    return this.weight;
  }

}

export default TextStyle


