
import CanvasDisplayObject from 'minibot/display/canvas/CanvasDisplayObject';

class Text extends CanvasDisplayObject
/** @lends display.canvas.Text# */
{
  
  // text: '',
  
  // font: null,
  
  // fillStyle: null,
  
  // textAlign: null,
  
  // metrics: null,
  
  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.canvas.CanvasDisplayObject
   * @constructs
   * @param {String} text
   * @param {String} font
   * @param {String} fillStyle
   * @param {String} textAlign
   * @param {Canvas 2DContext} context
   * @param 
   */
  constructor(text, font, fillStyle, textAlign, context)
  {
    $super();
    
    this.text = text;
    
    if(font != undefined) this.font = font;
    if(fillStyle != undefined) this.fillStyle = fillStyle;
    if(textAlign != undefined) this.textAlign = textAlign;
    
    if(context != undefined) {
      this.setStyle(context);
      this.metrics = context.measureText(this.text);
    }
  }
  
  setStyle(context)
  {
    if(this.font != null) context.font = this.font;
    if(this.textAlign != null) context.textAlign = this.textAlign;
    if(this.fillStyle != null) context.fillStyle = this.fillStyle;
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
  
  render(dt, context, x, y)
  {
    //context.font = 'bold 24px/30px Arial, san-serif';
    //context.fillStyle = '#FFFFFF';
    this.setStyle(context);
    context.fillText(this.text, this.x + x, this.y + y);
  }
  
}

export default Text


