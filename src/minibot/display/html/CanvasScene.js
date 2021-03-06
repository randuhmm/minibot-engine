
import Scene from 'minibot/display/scene/Scene';
import {Bind, BindAsEventListener} from 'minibot/core/Utils';
import MouseEvent from 'minibot/event/MouseEvent';
import TouchEvent from 'minibot/event/TouchEvent';
import KeyboardEvent from 'minibot/event/KeyboardEvent';
import Keyboard from 'minibot/event/enum/Keyboard';
import Color from 'minibot/graphics/Color';
import CanvasBuffer from 'minibot/display/html/CanvasBuffer';


class CanvasScene extends Scene
/** @lends display.html.CanvasScene# */
{

  // element: null,

  // context: null,

  // ratio: null,

  // enableEvents: null,

  // eventTypes: null,

  // mouseBfx: null,

  // keyboardBfx: null,

  // touchBfx: null,

  // maxTouches: null,
  // touchMap: null,
  // touchCount: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.html.HtmlElement
   * @constructs
   */
  constructor(options)
  {
    if(options == undefined) options = {};

    super(options);

    this.element = ((this.hasOption('element'))?(this.getOption('element')):(new Element('canvas')));
    this.enableEvents = ((this.hasOption('enableEvents'))?(this.getOption('enableEvents')):(true));
    this.eventTypes = ((this.hasOption('eventTypes'))?(this.getOption('eventTypes')):(Scene.MOUSE_EVENTS));
    this.maxTouches = ((this.hasOption('maxTouches'))?(this.getOption('maxTouches')):(1));

    this.setWidth((this.hasOption('width')?(this.getOption('width')):(this.element.width)));
    this.setHeight((this.hasOption('height')?(this.getOption('height')):(this.element.height)));

    this.ratio = 1;
    if(this.hasOption('ratio')) {
      this.ratio = this.getOption('ratio');
      if(this.ratio != 1) {
        this.element.style.width = this.element.width/this.ratio + "px";
        this.element.style.height = this.element.height/this.ratio + "px";
      }
    }

    this.context = this.element.getContext("2d");

    this.touchMap = {};
    this.touchCount = 0;

    if(this.enableEvents) {

      if(this.eventTypes & Scene.MOUSE_EVENTS) {
        // Mouse Event Handling
        this.mouseBfx = BindAsEventListener(this.handleMouseEvent, this);
        this.element.onmousedown = this.mouseBfx;
        this.element.onmouseup = this.mouseBfx;
        this.element.onmousemove  = this.mouseBfx;
      }

      if(this.eventTypes & Scene.TOUCH_EVENTS) {
        // Mouse Event Handling
        this.touchBfx = BindAsEventListener(this.handleTouchEvent, this);
        this.element.ontouchstart = this.touchBfx;
        this.element.ontouchend = this.touchBfx;
        this.element.ontouchmove = this.touchBfx;
      }

      if(this.eventTypes & Scene.KEYBOARD_EVENTS) {
        // Keyboard Event Handling
        this.keyboardBfx = BindAsEventListener(this.handleKeyboardEvent, this);
        document.onkeydown = this.keyboardBfx;
        document.onkeyup = this.keyboardBfx;
      }

    }
  }

  setWidth(width)
  {
    super.setWidth(width);
    this.element.width = width;
  }

  setHeight(height)
  {
    super.setHeight(height);
    this.element.height = height;
  }

  getElement()
  {
    return this.element;
  }

  clear()
  {
    this.setWidth(this.width);
  }

  drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  {
    this.context.drawImage(
      image,
      sx,
      sy,
      sw,
      sh,
      dx,
      dy,
      dw,
      dh
    );
  }

  drawLine(x1, y1, x2, y2)
  {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  drawPoly(mode, c, closed)
  {
    /*
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    */
  }

  drawRect(mode, x, y, w, h)
  {
    this.context.fillRect(x,y,w,h);
  }

  drawText(mode, text, style, x, y)
  {
    if(style != null) {
      this.context.font = style.getWeight() + " " + style.getSize() + "pt " + style.getFamily();
      var color = style.getColor();
      if(color) this.setFillColor(color);
      var align = style.getAlign();
      if(align) this.context.textAlign = align;
    }

    this.context.fillText(text, x, y);
  }

  createBuffer()
  {
    var scene = new CanvasScene();
    var buffer = new CanvasBuffer(scene);
    return buffer;
  }

  drawBuffer(buffer)
  {
    // draws a buffer object to the scene
  }

  setFillColor(color)
  {
    this.context.fillStyle = 'rgba('+color.getAsString(Color.RGB)+')';
  }

  setFillPattern(pattern)
  {
    if(!pattern.hasPattern()) {
      var ps = pattern.sprite;
      var scene = new CanvasScene();
      scene.setWidth(ps.w);
      scene.setHeight(ps.h);
      scene.drawImage(
        ps.sprite.img,
        ps.sprite.x, //sx,
        ps.sprite.y, //sy,
        ps.sprite.w, //sw,
        ps.sprite.h, //sh,
        ps.x, //dx,
        ps.y, //dy,
        ps.w, //dw,
        ps.h //dh
      );

      pattern.setPattern(this.context.createPattern(scene.getElement(), pattern.repeat));
    }
    this.context.fillStyle = pattern.getPattern();
  }

  setLineColor(color)
  {

  }

  setLineStyle(style)
  {

  }

  setLineWidth(width)
  {

  }

  save()
  {
    this.context.save();
  }

  restore()
  {
    this.context.restore();
  }

  translate(x, y)
  {
    this.context.translate(x, y);
  }

  rotate(a)
  {
    this.context.rotate(a);
  }

  // <-- Public Methods

  handleMouseEvent(event)
  {
    event.preventDefault();

    var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
    var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
    var type;

    x =  (x + event.clientX) * this.ratio;
    y =  (y + event.clientY) * this.ratio;

    switch(event.type) {
      case 'mousedown':
        type = MouseEvent.MOUSE_DOWN;
        break;
      case 'mousemove':
        type = MouseEvent.MOUSE_MOVE;
        break;
      case 'mouseup':
        type = MouseEvent.MOUSE_UP;
        break;
      default:
        return;
    }

    var mouseEvent = new MouseEvent(type, false, false, x, y, this.container);
    this.dispatchEvent(mouseEvent);
  }


  handleTouchEvent(event)
  {
    event.preventDefault();

    // get the touch
    var touch = event.changedTouches[0];

    // If type is touch start see if we can add identifier to touches
    if(event.type == 'touchstart') {
      if(this.touchCount >= this.maxTouches) {
        return;
      } else {
        this.touchCount += 1;
        this.touchMap[touch.identifier] = true;
      }
    } else if(event.type == 'touchend') {
      if(this.touchMap[touch.identifier] != undefined) {
        delete this.touchMap[touch.identifier];
        this.touchCount -= 1;
      } else {
        return;
      }
    } else {
      if(this.touchMap[touch.identifier] == undefined)  return;
    }

    var x = (event.currentTarget.offsetLeft * -1) + (event.currentTarget.offsetParent.offsetLeft * -1);
    var y = (event.currentTarget.offsetTop * -1) + (event.currentTarget.offsetParent.offsetTop * -1);
    var type;

    x =  (x + touch.clientX) * this.ratio;
    y =  (y + touch.clientY) * this.ratio;

    switch(event.type) {
      case 'touchstart':
        type = TouchEvent.TOUCH_START;
        break;
      case 'touchmove':
        type = TouchEvent.TOUCH_MOVE;
        break;
      case 'touchend':
        type = TouchEvent.TOUCH_END;
        break;
      default:
        return;
    }

    var touchEvent = new TouchEvent(type, false, false, x, y, this.container);
    this.dispatchEvent(touchEvent);
  }

  handleKeyboardEvent(event)
  {
    event.preventDefault();

    var type;
    var key = this.getKeyFromKeyCode(event.keyCode);
    if(key == undefined) return;

    switch(event.type) {
      case 'keydown':
        type = KeyboardEvent.KEY_DOWN;
        break;
      case 'keyup':
        type = KeyboardEvent.KEY_UP;
        break;
    }

    var keyboardEvent = new KeyboardEvent(type, false, false, key);
    this.dispatchEvent(keyboardEvent);

  }

  getKeyFromKeyCode(keyCode)
  {
    //console.log(keyCode);
    switch(keyCode) {
      case 32:
        return Keyboard.KEY_SPACE;
      case 37:
        return Keyboard.KEY_LEFT;
      case 38:
        return Keyboard.KEY_UP;
      case 39:
        return Keyboard.KEY_RIGHT;
      case 40:
        return Keyboard.KEY_DOWN;
    }
  }

}

export default CanvasScene


