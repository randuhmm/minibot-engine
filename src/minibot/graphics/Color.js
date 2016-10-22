

class Color
/** @lends graphics.Color# */
{
  
  // r: null,
  
  // g: null,
  
  // b: null,
  
  // h: null,
  
  // s: null,
  
  // l: null,
  
  // a: null,
  
  // mode: null,
  
  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.canvas.CanvasDisplayObject
   * @constructs
   * @param 
   */
  constructor(mode, v1, v2, v3, a)
  {
    this.type = Color.TYPE;
    this.setColor(mode, v1, v2, v3, a);
  }
  
  // Public Methods -->
  
  setColor(mode, v1, v2, v3, a)
  {
    this.mode = mode;
    this.a = ((a != undefined)?(a):(1.0));
    if(mode == Color.RGB) {
      this.r = v1;
      this.g = v2;
      this.b = v3;
    } else if(mode == Color.HSL) {
      this.h = v1;
      this.s = v2;
      this.l = v3;
      var rgb = Color.HslToRgb(this.h, this.s, this.l);
      this.r = Math.round(rgb[0]);
      this.g = Math.round(rgb[1]);
      this.b = Math.round(rgb[2]);
    } else {
      throw new Error("Color: unrecognized color mode.");
    }
  }
  
  getAsArray(mode)
  {
    if(mode == Color.RGB) {
      return [this.r, this.g, this.b, this.a];
    } else if(mode == Color.HSL) {
      return [this.h, this.s, this.l, this.a];
    } else {
      throw new Error("Color: unrecognized color mode.");
    }
  }
  
  getAsString(mode, spacer)
  {
    spacer = ((spacer == undefined)?(","):(spacer));
    return this.getAsArray(mode).join(spacer);
  }
  
  // <-- Public Methods
  
  
  
  
}

export default Color


