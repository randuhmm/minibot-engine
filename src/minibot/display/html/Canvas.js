
import HtmlElement from 'minibot/display/html/HtmlElement';
import Container from 'minibot/display/canvas/Container';
import UIEvent from 'minibot/event/UIEvent';
import SpriteResource from 'minibot/resource/SpriteResource';

class Canvas extends HtmlElement
/** @lends display.html.Canvas# */
{

  // scale: 1,
  // context: null,
  // container: null,
  // overlay: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.html.HtmlElement
   * @constructs
   */
  constructor(element, scale, overlay)
  {
    if(element == undefined || element == null) element = new Element('canvas');
    super(element);

    if(scale != undefined) this.scale = scale;
    if(overlay != undefined) this.overlay = overlay;

    this.context = this.element.getContext("2d");

    this.container = new Container();
    this.container.resizable = false;
    this.container.w = this.w = this.element.width;
    this.container.h = this.h = this.element.height;
    this.container.root = this.container;
    this.container.canvas = this;

    var topElement = element;
    if(overlay != undefined) topElement = overlay;

    if(Canvas.TOUCH_EVENTS) {
      topElement.observe('touchstart', this.handleUIEvent.bind(this));
      topElement.observe('touchend', this.handleUIEvent.bind(this));
      topElement.observe('touchmove', this.handleUIEvent.bind(this));
    } else {
      topElement.observe('mousedown', this.handleUIEvent.bind(this));
      topElement.observe('mouseup', this.handleUIEvent.bind(this));
      topElement.observe('mousemove', this.handleUIEvent.bind(this));
    }
  }

  asSpriteResource(sx, sy, sw, sh)
  {
    var resource = new SpriteResource();
    if(sx == undefined) sx = 0;
    if(sy == undefined) sy = 0;
    if(sw == undefined) sw = this.w;
    if(sh == undefined) sh = this.h;

    resource.img = this.element;
    resource.x = sx;
    resource.y = sy;
    resource.w = sw;
    resource.h = sh;

    return resource;
  }

  addChild(displayObject, layer)
  {
    if(layer == undefined || layer == null) layer = 0;
    this.container.addChild(displayObject, layer);
    //var event = new DisplayEvent(DisplayEvent.ADDED_TO_CANVAS, {});
    //displayObject.dispatchEvent(event);
  }

  removeChild(displayObject)
  {
    this.container.removeChild(displayObject);
  }

  removeAllChildren()
  {
    this.container.removeAll();
  }

  addToHtmlOverlay(element)
  {
    if(this.overlay == undefined) return;

    this.overlay.insert(element);
  }

  setHeight(height)
  {
    this.h = height;
    this.element.height = height;
    this.container.h = height;
  }

  setWidth(width)
  {
    this.w = width;
    this.element.width = width;
    this.container.w = width;
  }

  clear()
  {
    this.element.width = this.w;
  }

  render(dt)
  {
    /*
    if(CanvasObject.LastTime == null) {
      CanvasObject.LastTime = time;
    } else {
      CanvasObject.LastTime = CanvasObject.ThisTime;
    }
    CanvasObject.ThisTime = time;
    */
    //CanvasObject.DT = dt;

    // Render to the buffer
    //this.bufferElement.width = this.element.width;
    this.container.render(dt, this.context);

    // Copy the buffer to the canvas
    //this.element.width = this.element.width;
    //this.context.drawImage(this.bufferElement, 0, 0, this.element.width, this.element.height);

  }

  handleUIEvent(event)
  {
    event.preventDefault();

    var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
    var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
    var type;

    if(Canvas.TOUCH_EVENTS) {
      x += event.changedTouches[0].clientX;
      y += event.changedTouches[0].clientY;
    } else {
      x += event.clientX;
      y += event.clientY;
    }

    //x += event.clientX;
    //y += event.clientY;

    x = x * this.scale;
    y = y * this.scale;

    switch(event.type) {
      case 'touchstart':
      case 'mousedown':
        type = UIEvent.TOUCH_START;
        break;
      case 'touchmove':
      case 'mousemove':
        //return;
        type = UIEvent.TOUCH_MOVE;
        break;
      case 'touchend':
      case 'mouseup':
        type = UIEvent.TOUCH_END;
        break;
      default:
        return;
    }

    var uIEvent = new UIEvent(type, {}, x, y);
    this.container.dispatchEvent(uIEvent);
  }

}

export default Canvas


