
import DisplayObject from 'minibot/display/DisplayObject';

class CanvasDisplayObject extends DisplayObject
/** @lends display.canvas.CanvasDisplayObject# */
{
  
  // x: 0,
  // y: 0,
  // w: 0,
  // h: 0,
  
  // root: null,
  // canvas: null,
  
  // isVisible: true,
  // touchEnabled: true,
  
  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.DisplayObject
   * @constructs
   * @param 
   */
  constructor()
  {
    $super();
  }
  
  isCanvasObject()
  {
    return true;
  }
  
  render(dt, context, x, y)
  {
    // This function must be overloaded in the sub class
  }
  
  onAddedToCanvas()
  {
    // This callback is triggered when a canvas object is added to a canvas element
  }
  
  
  onRemovedFromCanvas()
  {
    // This callback is triggered when a canvas object is removed from a canvas element
  }
  
  getCanvasX()
  {
    var canvasX = 0;
    if(this.parent != null) {
      canvasX += this.parent.getCanvasX();
    }
    canvasX += this.x;
    return canvasX;
  }
  
  getCanvasY()
  {
    var canvasY = 0;
    if(this.parent != null) {
      canvasY += this.parent.getCanvasY();
    }
    canvasY += this.y;
    return canvasY;
  }
  
  hide()
  {
    this.isVisible = false;
  }
  
  show()
  {
    this.isVisible = true;
  }
  
}

export default CanvasDisplayObject


