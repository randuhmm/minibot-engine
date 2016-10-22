
import EventDispatcher from 'minibot/event/EventDispatcher';
import Container from './Container';

class Scene
/** @lends display.scene.Scene# */
{
  /** The scene container.
   * @type display.scene.Container
   */
  // container: null,
  /** The scene width.
   * @type Number
   */
  // width: null,
  /** The scene height.
   * @type Number
   */
  // height: null,
  /** The scene options
   * @type Object
   */
  // options: null,
  
  /**
   * Constructs a new scene instance.
   * @class Creates a new scene within a specified container.
   * @extends display.canvas.CanvasDisplayObject
   * @constructs
   * @param 
   */
  constructor(options)
  {
    
    this.options = options;
    
    this.container = new Container();
    this.container.resizable = false;
    this.container.setRoot(this.container);
    this.container.setScene(this);
    
  }
  
  // Public Methods -->
  
  hasOption(key)
  {
    return this.options[key] != undefined;
  }
  
  getOption(key)
  {
    return this.options[key];
  }
  
  getBuffer()
  {

  }
  
  /** Set the width of the scene.
   * @param {Number} width The width desired.
   */
  setWidth(width)
  {
    this.width = width;
    this.container.setWidth(width);
  }
  
  /** Returns the width of the scene.
   * @returns {Number}
   */
  getWidth()
  {
    return this.width;
  }
  
  /** Set the height of the scene.
   * @param {Number} height The height desired.
   */
  setHeight(height)
  {
    this.height = height;
    this.container.setHeight(height);
  }
  
  /** Returns the height of the scene.
   * @returns {Number}
   */
  getHeight()
  {
    return this.height;
  }
  
  /** Appends a child to the specified container.
     @param {display.DisplayObject} displayObject The displayObject to add.
   @param {layer} layer The layer to be added to.
   */
  addChild(displayObject, layer)
  {
    if(layer == undefined || layer == null) layer = 0;
    this.container.addChild(displayObject, layer);
  }
  
  /** Removes a child from the specified container.
     @param {display.DisplayObject} displayObject The displayObject to remove.
   *//** Removes all children from the specified container. */
  removeChild(displayObject)
  {
    this.container.removeChild(displayObject);
  }
  
  /** Removes all children from the specified container. */
  removeAllChildren()
  {
    this.container.removeAll();
  }
  
  /** Renders the scene
   * @param {Number} dt The change in time.
   */
  render(dt)
  {
    this.container.render(dt);
  }
  
  clear()
  {
    // overload in subclass
  }
  
  // Graphics Methods -->
  
  drawBuffer()
  {
    
  }
  
  /** Draws an image.
   * @param {resource.ImageResource} image The image to be drawn.
   * @param {Number} sx The starting x position of the image.
   * @param {Number} sy The starting y position of the image.
   * @param {Number} sw The starting width of the image.
   * @param {Number} sh The starting height of the image.
       * @param {Number} dx The x position to place the image.
   * @param {Number} dy The y position to place the image.
   * @param {Number} dw The destination width.
   * @param {Number} dh The destination height.
   */
  drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  {
  
  }

  /** Draws a line.
   * @param {Number} x1 The starting x coordinate.
   * @param {Number} x2 The ending x coordinate.
   * @param {Number} y1 The starting y coordinate.
   * @param {Number} y2 The ending y coordinate.
   */
  drawLine(x1, y1, x2, y2)
  {
    
  }

  /** Draws a Rectangle.
   * @param {Number} Mode Represents whether or not to fill the rectangle.
   * @param {Number} x The starting x coordinate.
   * @param {Number} y The starting y coordinate.
   * @param {Number} w The width of the rectangle.
   * @param {Number} h The height of the rectangle.
   */
  drawRect(mode, x, y, w, h)
  {

  }

  /** Sets the fill color.
   * @param {graphics.Color} color The color to be used.
   */
  setFillColor(color)
  {
    
  }

  /** Sets the fill pattern.
   * @param {graphics.Pattern} pattern The pattern to be used.
   */
  setFillPattern(pattern)
  {
    
  }

  /** Sets the line color.
   * @param {graphics.Color} color The color to be used.
   */
  setLineColor(color)
  {
    
  }

  /** Sets the line style.
   * @param {object} style The style to be used.
   */
  setLineStyle(style)
  {
  
  }

  /** Sets the line width.
   * @param {Number} width The width to be used.
   */
  setLineWidth(width)
  {
  
  }

  /** Save
   */
  save()
  {

  }
  
  /** Restore
   */
  restore()
  {

  }
  
  /** Translate
   * @param {Number} x 
   * @param {Number} y 
   */
  translate(x, y)
  {

  }
  
  /** Rotate
   * @param {Number} a 
   */
  rotate(a)
  {

  }

  // <-- Graphics Methods
  
  // Event Methods -->
  
  addEventListener(type, callback)
  {
    this.container.addEventListener(type, callback);
  }
  
  hasEventListener(type)
  {
    return this.container.addEventListener(type);
  }
  
  dispatchEvent(event)
  {
    return this.container.dispatchEvent(event);
  }
  
  removeEventListener(type, callback)
  {
    this.container.removeEventListener(type, callback);
  }
  
  removeAllEventListeners()
  {
    this.container.removeAllEventListeners();
  }
  
  // <-- Event Methods
  
  // <-- Public Methods
  
  
}

export default Scene


