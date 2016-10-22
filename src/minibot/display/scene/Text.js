
import SceneDisplayObject from 'minibot/display/scene/SceneDisplayObject';

class Text extends SceneDisplayObject
/** @lends display.scene.Text# */
{

  // text: '',

  // style: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param {String} text
   * @param {display.scene.TextStyle} style
   * @param {String} textAlign
   * @param {Scene 2DContext} context
   * @param
   */
  constructor(text, style)
  {
    super();

    this.text = text;

    if(style != undefined) this.style = style;

    /*
    if(font != undefined) this.font = font;
    if(fillStyle != undefined) this.fillStyle = fillStyle;
    if(textAlign != undefined) this.textAlign = textAlign;

    if(context != undefined) {
      this.setStyle(context);
      this.metrics = context.measureText(this.text);
    }
    */
  }

  setStyle()
  {
    /*
    if(this.font != null) context.font = this.font;
    if(this.textAlign != null) context.textAlign = this.textAlign;
    if(this.fillStyle != null) context.fillStyle = this.fillStyle;
    */
  }

  getText()
  {
    return this.text;
  }

  getMetrics()
  {
    return this.metrics;
  }

  setText(text)
  {
    this.text = text;
  }

  render(dt, x, y)
  {
    this.scene.drawText("", this.text, this.style, this.x + x, this.y + y);
  }

}

export default Text


