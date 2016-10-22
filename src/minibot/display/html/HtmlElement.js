
import DisplayObject from 'minibot/display/DisplayObject';
import HtmlEvent from 'minibot/event/HtmlEvent';

class HtmlElement extends DisplayObject
/** @lends display.html.HtmlElement# */
{

  // element: null,
  // children: null,

  // isInDOM: false,
  // htmlListeners: null,

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
    super();

    // Determine what the element is
    if(arguments[1] != undefined) {
      if(typeof arguments[1] == "string") {
        this.element = new Element(arguments[1]);
      } else {
        this.element = arguments[1];
      }
    } else {
      this.element = new Element('div');
    }

    if(this.element == undefined) {
      // TODO: throw error?
    }

    this.htmlListeners = {};
    this.children = new Array();

    // Wrapping element functions
    this.writeAttribute   = this.element.writeAttribute.bind(this.element);
    this.readAttribute     = this.element.readAttribute.bind(this.element);
    this.hide         = this.element.hide.bind(this.element);
    this.show         = this.element.show.bind(this.element);

  }

  addChild(displayObject)
  {
    this.element.insert(displayObject.element);
    this.children.push(displayObject);
    if(this.isInDOM) {
      displayObject.onAddedToDOM();
    }
  }

  removeChild(displayObject)
  {
    // Loop through children to find child then remove
    var child;
    for(var i = 0; i < this.children.length; i++) {
      child = this.children[i];
      if(displayObject === child) {
        this.children.splice(i, 1);
        displayObject.element.remove();
        displayObject.onRemovedFromDOM();
      }
    }
  }

  onAddedToDOM()
  {
    this.isInDOM = true;

    var child;
    for(var i = 0; i < this.children.length; i++) {
      child = this.children[i];
      child.onAddedToDOM();
    }
  }

  isHtmlObject()
  {
    return true;
  }

  addToDOM(element)
  {
    element.insert(this.element);
    this.onAddedToDOM();
  }

  // Callback for removing from DOM
  onRemovedFromDOM()
  {
    // Extend this function in subclasses when needed
  }

  addEventListener(type, callback)
  {
    if(this.htmlListeners[type] == undefined) {
      var htmlType = null;

        switch(type) {
          case HtmlEvent.CLICK:
            htmlType = 'click';
            break;
          case HtmlEvent.FOCUS:
            htmlType = 'focus';
            break;
          case HtmlEvent.BLUR:
            htmlType = 'blur';
            break;
          case HtmlEvent.MOUSE_DOWN:
            htmlType = 'mousedown';
            break;
          case HtmlEvent.MOUSE_MOVE:
            htmlType = 'mousemove';
            break;
          case HtmlEvent.MOUSE_UP:
            htmlType = 'mouseup';
            break;
          case HtmlEvent.KEY_DOWN:
            htmlType = 'keydown';
            break;
          case HtmlEvent.KEY_UP:
            htmlType = 'keyup';
            break;
          case HtmlEvent.DRAG_ENTER:
            htmlType = 'dragenter';
            break;
          case HtmlEvent.DRAG_EXIT:
            htmlType = 'dragexit';
            break;
          case HtmlEvent.DRAG_OVER:
            htmlType = 'dragover';
            break;
          case HtmlEvent.DROP:
            htmlType = 'drop';
            break;
          default:
            break;
        }

      if(htmlType != null) {
        this.htmlListeners[type] = this.handleHtmlEvent.bindAsEventListener(this, type);
        this.element.observe(htmlType, this.htmlListeners[type]);
      }
    }
    super.addEventListener(type, callback);
  }

  handleHtmlEvent(event, type)
  {
    this.dispatchEvent(new HtmlEvent(type, event));
  }

}

export default HtmlElement


