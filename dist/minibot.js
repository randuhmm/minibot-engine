require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager
/** @lends core.Manager# */
=

/**
 * Description of constructor.
 * @class Short description of class.
 * Long Description of class.
 * @constructs
 * @param {String} key The instance key.
 */
function Manager(key) {
  _classCallCheck(this, Manager);

  if (Manager.instanceMap[key] != null) {
    throw new Error(Manager.MULTITON_MSG);
  }
  Manager.instanceMap[key] = this;
};

exports.default = Manager;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventDispatcher = require('minibot/event/EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a new DisplayObject instance.
 * @class
 * @constructs
 * @name DisplayObject
 * @extends event.EventDispatcher
 */
var DisplayObject = function DisplayObject() {
  _EventDispatcher2.default.call(this);
};

DisplayObject.prototype = Object.create(_EventDispatcher2.default.prototype);
DisplayObject.prototype.constructor = DisplayObject;
DisplayObject.subclasses = [];

/**
 * The object that contains this DisplayObject.
 * @memberof DisplayObject.prototype
 * @type object
 */
DisplayObject.prototype.parent = null;

/**
 * Actions to be performed upon being added to a parent object.
 * @memberof DisplayObject.prototype
 */
DisplayObject.prototype.onAddedToParent = function () {
  // override
};

/**
 * Adds a resource to the map.
 * @param {} klass The class of the resource.
 * @param {type} type The type of the resource.
 * @param {Integer} id The id of the resource.
 */
DisplayObject.AddResource = function (klass, type, id) {
  if (klass.RESOURCES == undefined) klass.RESOURCES = {};
  if (klass.RESOURCES[type] == undefined) klass.RESOURCES[type] = {};
  klass.RESOURCES[type][id] = null;
};

/**
 * Adds an object to the map.
 * @param {} klass The class of the object.
 * @param {object} object
 */
DisplayObject.AddObject = function (klass, object) {
  if (klass.OBJECTS == undefined) klass.OBJECTS = [];
  klass.OBJECTS.push(object);
};

/**
 * Returns a resource of specified type and id.
 * @param {} klass The class of the resource.
 * @param {type} type The type of the resource.
 * @param {Integer} id The type of the resource.
 * @returns {resource} The resource. A result of null means the resource is not on the map.
 */
DisplayObject.GetResource = function (klass, type, id) {
  if (klass.RESOURCES == undefined) return null;
  if (klass.RESOURCES[type] == undefined) return null;
  if (klass.RESOURCES[type][id] == undefined) return null;
  return klass.RESOURCES[type][id];
};

DisplayObject.ALIGN_HORZ_CENTER = 1;

DisplayObject.ALIGN_VERT_CENTER = 2;

exports.default = DisplayObject;

},{"minibot/event/EventDispatcher":19}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Buffer2 = require('minibot/display/scene/Buffer');

var _Buffer3 = _interopRequireDefault(_Buffer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasBuffer = function (_Buffer) {
  _inherits(CanvasBuffer, _Buffer);

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.html.HtmlElement
   * @constructs
   */
  function CanvasBuffer(scene) {
    _classCallCheck(this, CanvasBuffer);

    return _possibleConstructorReturn(this, (CanvasBuffer.__proto__ || Object.getPrototypeOf(CanvasBuffer)).call(this, scene));
  }

  _createClass(CanvasBuffer, [{
    key: 'setWidth',
    value: function setWidth(width) {
      _get(CanvasBuffer.prototype.__proto__ || Object.getPrototypeOf(CanvasBuffer.prototype), 'setWidth', this).call(this, width);
      this.bufferScene.setWidth(width);
    }
  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      _get(CanvasBuffer.prototype.__proto__ || Object.getPrototypeOf(CanvasBuffer.prototype), 'setWidth', this).call(this, height);
      this.bufferScene.setHeight(height);
    }
  }, {
    key: 'render',
    value: function render(dt, x, y) {
      var element = this.bufferScene.getElement();
      this.scene.drawImage(element, x * -1, y * -1, this.scene.width, this.scene.height, 0, 0, this.scene.width, this.scene.height);
    }
  }]);

  return CanvasBuffer;
}(_Buffer3.default
/** @lends display.html.CanvasBuffer# */
);

exports.default = CanvasBuffer;

},{"minibot/display/scene/Buffer":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Scene2 = require('minibot/display/scene/Scene');

var _Scene3 = _interopRequireDefault(_Scene2);

var _MouseEvent = require('minibot/event/MouseEvent');

var _MouseEvent2 = _interopRequireDefault(_MouseEvent);

var _TouchEvent = require('minibot/event/TouchEvent');

var _TouchEvent2 = _interopRequireDefault(_TouchEvent);

var _KeyboardEvent = require('minibot/event/KeyboardEvent');

var _KeyboardEvent2 = _interopRequireDefault(_KeyboardEvent);

var _Keyboard = require('minibot/event/enum/Keyboard');

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Color = require('minibot/graphics/Color');

var _Color2 = _interopRequireDefault(_Color);

var _CanvasBuffer = require('minibot/display/html/CanvasBuffer');

var _CanvasBuffer2 = _interopRequireDefault(_CanvasBuffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CanvasScene = function (_Scene) {
  _inherits(CanvasScene, _Scene);

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
  function CanvasScene(options) {
    _classCallCheck(this, CanvasScene);

    if (options == undefined) options = {};

    var _this = _possibleConstructorReturn(this, (CanvasScene.__proto__ || Object.getPrototypeOf(CanvasScene)).call(this, options));

    _this.element = _this.hasOption('element') ? _this.getOption('element') : new Element('canvas');
    _this.enableEvents = _this.hasOption('enableEvents') ? _this.getOption('enableEvents') : true;
    _this.eventTypes = _this.hasOption('eventTypes') ? _this.getOption('eventTypes') : _Scene3.default
    /** @lends display.html.CanvasScene# */
    .MOUSE_EVENTS;
    _this.maxTouches = _this.hasOption('maxTouches') ? _this.getOption('maxTouches') : 1;

    _this.setWidth(_this.hasOption('width') ? _this.getOption('width') : _this.element.width);
    _this.setHeight(_this.hasOption('height') ? _this.getOption('height') : _this.element.height);

    _this.ratio = 1;
    if (_this.hasOption('ratio')) {
      _this.ratio = _this.getOption('ratio');
      if (_this.ratio != 1) {
        _this.element.style.width = _this.element.width / _this.ratio + "px";
        _this.element.style.height = _this.element.height / _this.ratio + "px";
      }
    }

    _this.context = _this.element.getContext("2d");

    _this.touchMap = {};
    _this.touchCount = 0;

    if (_this.enableEvents) {

      if (_this.eventTypes & _Scene3.default.MOUSE_EVENTS) {
        // Mouse Event Handling
        _this.mouseBfx = _this.handleMouseEvent.bind(_this);
        _this.element.observe('mousedown', _this.mouseBfx);
        _this.element.observe('mouseup', _this.mouseBfx);
        _this.element.observe('mousemove', _this.mouseBfx);
      }

      if (_this.eventTypes & _Scene3.default.TOUCH_EVENTS) {
        // Mouse Event Handling
        _this.touchBfx = _this.handleTouchEvent.bind(_this);
        _this.element.observe('touchstart', _this.touchBfx);
        _this.element.observe('touchend', _this.touchBfx);
        _this.element.observe('touchmove', _this.touchBfx);
      }

      if (_this.eventTypes & _Scene3.default.KEYBOARD_EVENTS) {
        // Keyboard Event Handling
        _this.keyboardBfx = _this.handleKeyboardEvent.bind(_this);
        document.observe('keydown', _this.keyboardBfx);
        document.observe('keyup', _this.keyboardBfx);
      }
    }
    return _this;
  }

  _createClass(CanvasScene, [{
    key: 'setWidth',
    value: function setWidth(width) {
      _get(CanvasScene.prototype.__proto__ || Object.getPrototypeOf(CanvasScene.prototype), 'setWidth', this).call(this, width);
      this.element.width = width;
    }
  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      _get(CanvasScene.prototype.__proto__ || Object.getPrototypeOf(CanvasScene.prototype), 'setHeight', this).call(this, height);
      this.element.height = height;
    }
  }, {
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.setWidth(this.width);
    }
  }, {
    key: 'drawImage',
    value: function drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
      this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }, {
    key: 'drawLine',
    value: function drawLine(x1, y1, x2, y2) {
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
    }
  }, {
    key: 'drawPoly',
    value: function drawPoly(mode, c, closed) {
      /*
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.stroke();
      */
    }
  }, {
    key: 'drawRect',
    value: function drawRect(mode, x, y, w, h) {
      this.context.fillRect(x, y, w, h);
    }
  }, {
    key: 'drawText',
    value: function drawText(mode, text, style, x, y) {
      if (style != null) {
        this.context.font = style.getWeight() + " " + style.getSize() + "pt " + style.getFamily();
        var color = style.getColor();
        if (color) this.setFillColor(color);
        var align = style.getAlign();
        if (align) this.context.textAlign = align;
      }

      this.context.fillText(text, x, y);
    }
  }, {
    key: 'createBuffer',
    value: function createBuffer() {
      var scene = new CanvasScene();
      var buffer = new _CanvasBuffer2.default(scene);
      return buffer;
    }
  }, {
    key: 'drawBuffer',
    value: function drawBuffer(buffer) {
      // draws a buffer object to the scene
    }
  }, {
    key: 'setFillColor',
    value: function setFillColor(color) {
      this.context.fillStyle = 'rgba(' + color.getAsString(_Color2.default.RGB) + ')';
    }
  }, {
    key: 'setFillPattern',
    value: function setFillPattern(pattern) {
      if (!pattern.hasPattern()) {
        var ps = pattern.sprite;
        var scene = new CanvasScene();
        scene.setWidth(ps.w);
        scene.setHeight(ps.h);
        scene.drawImage(ps.sprite.img, ps.sprite.x, //sx,
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
  }, {
    key: 'setLineColor',
    value: function setLineColor(color) {}
  }, {
    key: 'setLineStyle',
    value: function setLineStyle(style) {}
  }, {
    key: 'setLineWidth',
    value: function setLineWidth(width) {}
  }, {
    key: 'save',
    value: function save() {
      this.context.save();
    }
  }, {
    key: 'restore',
    value: function restore() {
      this.context.restore();
    }
  }, {
    key: 'translate',
    value: function translate(x, y) {
      this.context.translate(x, y);
    }
  }, {
    key: 'rotate',
    value: function rotate(a) {
      this.context.rotate(a);
    }

    // <-- Public Methods

  }, {
    key: 'handleMouseEvent',
    value: function handleMouseEvent(event) {
      event.preventDefault();

      var x = event.currentTarget.offsetLeft * -1 + event.currentTarget.offsetParent.offsetLeft * -1;
      var y = event.currentTarget.offsetTop * -1 + event.currentTarget.offsetParent.offsetTop * -1;
      var type;

      x = (x + event.clientX) * this.ratio;
      y = (y + event.clientY) * this.ratio;

      switch (event.type) {
        case 'mousedown':
          type = _MouseEvent2.default.MOUSE_DOWN;
          break;
        case 'mousemove':
          type = _MouseEvent2.default.MOUSE_MOVE;
          break;
        case 'mouseup':
          type = _MouseEvent2.default.MOUSE_UP;
          break;
        default:
          return;
      }

      var mouseEvent = new _MouseEvent2.default(type, false, false, x, y, this.container);
      this.dispatchEvent(mouseEvent);
    }
  }, {
    key: 'handleTouchEvent',
    value: function handleTouchEvent(event) {
      event.preventDefault();

      // get the touch
      var touch = event.changedTouches[0];

      // If type is touch start see if we can add identifier to touches
      if (event.type == 'touchstart') {
        if (this.touchCount >= this.maxTouches) {
          return;
        } else {
          this.touchCount += 1;
          this.touchMap[touch.identifier] = true;
        }
      } else if (event.type == 'touchend') {
        if (this.touchMap[touch.identifier] != undefined) {
          delete this.touchMap[touch.identifier];
          this.touchCount -= 1;
        } else {
          return;
        }
      } else {
        if (this.touchMap[touch.identifier] == undefined) return;
      }

      var x = event.currentTarget.offsetLeft * -1 + event.currentTarget.offsetParent.offsetLeft * -1;
      var y = event.currentTarget.offsetTop * -1 + event.currentTarget.offsetParent.offsetTop * -1;
      var type;

      x = (x + touch.clientX) * this.ratio;
      y = (y + touch.clientY) * this.ratio;

      switch (event.type) {
        case 'touchstart':
          type = _TouchEvent2.default.TOUCH_START;
          break;
        case 'touchmove':
          type = _TouchEvent2.default.TOUCH_MOVE;
          break;
        case 'touchend':
          type = _TouchEvent2.default.TOUCH_END;
          break;
        default:
          return;
      }

      var touchEvent = new _TouchEvent2.default(type, false, false, x, y, this.container);
      this.dispatchEvent(touchEvent);
    }
  }, {
    key: 'handleKeyboardEvent',
    value: function handleKeyboardEvent(event) {
      event.preventDefault();

      var type;
      var key = this.getKeyFromKeyCode(event.keyCode);
      if (key == undefined) return;

      switch (event.type) {
        case 'keydown':
          type = _KeyboardEvent2.default.KEY_DOWN;
          break;
        case 'keyup':
          type = _KeyboardEvent2.default.KEY_UP;
          break;
      }

      var keyboardEvent = new _KeyboardEvent2.default(type, false, false, key);
      this.dispatchEvent(keyboardEvent);
    }
  }, {
    key: 'getKeyFromKeyCode',
    value: function getKeyFromKeyCode(keyCode) {
      //console.log(keyCode);
      switch (keyCode) {
        case 32:
          return _Keyboard2.default.KEY_SPACE;
        case 37:
          return _Keyboard2.default.KEY_LEFT;
        case 38:
          return _Keyboard2.default.KEY_UP;
        case 39:
          return _Keyboard2.default.KEY_RIGHT;
        case 40:
          return _Keyboard2.default.KEY_DOWN;
      }
    }
  }]);

  return CanvasScene;
}(_Scene3.default);

exports.default = CanvasScene;

},{"minibot/display/html/CanvasBuffer":3,"minibot/display/scene/Scene":11,"minibot/event/KeyboardEvent":21,"minibot/event/MouseEvent":22,"minibot/event/TouchEvent":23,"minibot/event/enum/Keyboard":24,"minibot/graphics/Color":25}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _DisplayObject2 = require('minibot/display/DisplayObject');

var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

var _HtmlEvent = require('minibot/event/HtmlEvent');

var _HtmlEvent2 = _interopRequireDefault(_HtmlEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HtmlElement = function (_DisplayObject) {
  _inherits(HtmlElement, _DisplayObject);

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
  function HtmlElement() {
    _classCallCheck(this, HtmlElement);

    // Determine what the element is
    var _this = _possibleConstructorReturn(this, (HtmlElement.__proto__ || Object.getPrototypeOf(HtmlElement)).call(this));

    if (arguments[1] != undefined) {
      if (typeof arguments[1] == "string") {
        _this.element = new Element(arguments[1]);
      } else {
        _this.element = arguments[1];
      }
    } else {
      _this.element = new Element('div');
    }

    if (_this.element == undefined) {
      // TODO: throw error?
    }

    _this.htmlListeners = {};
    _this.children = new Array();

    // Wrapping element functions
    _this.writeAttribute = _this.element.writeAttribute.bind(_this.element);
    _this.readAttribute = _this.element.readAttribute.bind(_this.element);
    _this.hide = _this.element.hide.bind(_this.element);
    _this.show = _this.element.show.bind(_this.element);

    return _this;
  }

  _createClass(HtmlElement, [{
    key: 'addChild',
    value: function addChild(displayObject) {
      this.element.insert(displayObject.element);
      this.children.push(displayObject);
      if (this.isInDOM) {
        displayObject.onAddedToDOM();
      }
    }
  }, {
    key: 'removeChild',
    value: function removeChild(displayObject) {
      // Loop through children to find child then remove
      var child;
      for (var i = 0; i < this.children.length; i++) {
        child = this.children[i];
        if (displayObject === child) {
          this.children.splice(i, 1);
          displayObject.element.remove();
          displayObject.onRemovedFromDOM();
        }
      }
    }
  }, {
    key: 'onAddedToDOM',
    value: function onAddedToDOM() {
      this.isInDOM = true;

      var child;
      for (var i = 0; i < this.children.length; i++) {
        child = this.children[i];
        child.onAddedToDOM();
      }
    }
  }, {
    key: 'isHtmlObject',
    value: function isHtmlObject() {
      return true;
    }
  }, {
    key: 'addToDOM',
    value: function addToDOM(element) {
      element.insert(this.element);
      this.onAddedToDOM();
    }

    // Callback for removing from DOM

  }, {
    key: 'onRemovedFromDOM',
    value: function onRemovedFromDOM() {
      // Extend this function in subclasses when needed
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(type, callback) {
      if (this.htmlListeners[type] == undefined) {
        var htmlType = null;

        switch (type) {
          case _HtmlEvent2.default.CLICK:
            htmlType = 'click';
            break;
          case _HtmlEvent2.default.FOCUS:
            htmlType = 'focus';
            break;
          case _HtmlEvent2.default.BLUR:
            htmlType = 'blur';
            break;
          case _HtmlEvent2.default.MOUSE_DOWN:
            htmlType = 'mousedown';
            break;
          case _HtmlEvent2.default.MOUSE_MOVE:
            htmlType = 'mousemove';
            break;
          case _HtmlEvent2.default.MOUSE_UP:
            htmlType = 'mouseup';
            break;
          case _HtmlEvent2.default.KEY_DOWN:
            htmlType = 'keydown';
            break;
          case _HtmlEvent2.default.KEY_UP:
            htmlType = 'keyup';
            break;
          case _HtmlEvent2.default.DRAG_ENTER:
            htmlType = 'dragenter';
            break;
          case _HtmlEvent2.default.DRAG_EXIT:
            htmlType = 'dragexit';
            break;
          case _HtmlEvent2.default.DRAG_OVER:
            htmlType = 'dragover';
            break;
          case _HtmlEvent2.default.DROP:
            htmlType = 'drop';
            break;
          default:
            break;
        }

        if (htmlType != null) {
          this.htmlListeners[type] = this.handleHtmlEvent.bindAsEventListener(this, type);
          this.element.observe(htmlType, this.htmlListeners[type]);
        }
      }
      _get(HtmlElement.prototype.__proto__ || Object.getPrototypeOf(HtmlElement.prototype), 'addEventListener', this).call(this, type, callback);
    }
  }, {
    key: 'handleHtmlEvent',
    value: function handleHtmlEvent(event, type) {
      this.dispatchEvent(new _HtmlEvent2.default(type, event));
    }
  }]);

  return HtmlElement;
}(_DisplayObject3.default
/** @lends display.html.HtmlElement# */
);

exports.default = HtmlElement;

},{"minibot/display/DisplayObject":2,"minibot/event/HtmlEvent":20}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneDisplayObject2 = require('minibot/display/scene/SceneDisplayObject');

var _SceneDisplayObject3 = _interopRequireDefault(_SceneDisplayObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Animation = function (_SceneDisplayObject) {
  _inherits(Animation, _SceneDisplayObject);

  // animation: null,

  // currentFrame: 0,

  // currentSprite: null,

  // currentDelay: null,

  // time: 0,

  // loops: 0,

  // playing: false,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param {resource.AnimationResource} animation
   * @param {bool} play
   * @param {int} loops
   * @param
   */
  function Animation(animation, play, loops) {
    _classCallCheck(this, Animation);

    var _this = _possibleConstructorReturn(this, (Animation.__proto__ || Object.getPrototypeOf(Animation)).call(this));

    _this.loops = Animation.INFINITE_LOOPS;

    _this.setAnimation(animation, play, loops);
    return _this;
  }

  _createClass(Animation, [{
    key: 'setAnimation',
    value: function setAnimation(animation, play, loops) {
      this.playing = play == undefined || play;

      if (loops == undefined) {
        this.loops == Animation.INFINITE_LOOPS;
      } else {
        this.loops = loops;
      }

      this.currentFrame = 0;
      this.time = 0;

      this.animation = animation;
      this.setupFrame();
    }
  }, {
    key: 'setupFrame',
    value: function setupFrame() {
      if (this.animation == null) return;
      this.currentSprite = this.animation.getSprite(this.currentFrame);
      this.currentDelay = this.animation.getDelay(this.currentFrame);
      if (this.w == 0) this.w = this.currentSprite.w;
      if (this.h == 0) this.h = this.currentSprite.h;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.playing = false;
      this.currentFrame = 0;
      this.time = 0;
      this.setupFrame();
    }
  }, {
    key: 'play',
    value: function play(loops) {
      this.playing = true;

      if (loops == undefined) {
        this.loops == Animation.INFINITE_LOOPS;
      } else {
        this.loops = loops;
      }
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this.playing;
    }
  }, {
    key: 'render',
    value: function render(dt, x, y) {
      if (this.animation == null) return;

      if (this.playing) {
        this.time += dt;
        while (this.time >= this.currentDelay) {

          // Handle looping
          if (this.loops != Animation.INFINITE_LOOPS) {
            if (this.animation.atEnd(this.currentFrame)) {
              if (this.loops == 0) {
                this.stop();
                this.setupFrame();
                break;
              } else {
                this.loops -= 1;
              }
            }
          }

          this.time -= this.currentDelay;
          this.currentFrame = this.animation.nextFrame(this.currentFrame);
          this.setupFrame();
        }
      }

      try {
        this.scene.drawImage(this.currentSprite.img, this.currentSprite.x, //sx,
        this.currentSprite.y, //sy,
        this.currentSprite.w, //sw,
        this.currentSprite.h, //sh,
        this.x + x, //dx,
        this.y + y, //dy,
        this.w, //dw,
        this.h //dh
        );
      } catch (error) {
        console.log('Animation: Rendering Fatal Error');
      }
    }
  }]);

  return Animation;
}(_SceneDisplayObject3.default
/** @lends display.scene.Animation# */
);

exports.default = Animation;

},{"minibot/display/scene/SceneDisplayObject":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Container2 = require('./Container');

var _Container3 = _interopRequireDefault(_Container2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Buffer = function (_Container) {
  _inherits(Buffer, _Container);

  // bufferScene: null,

  function Buffer(scene) {
    _classCallCheck(this, Buffer);

    var _this = _possibleConstructorReturn(this, (Buffer.__proto__ || Object.getPrototypeOf(Buffer)).call(this));

    _this.bufferScene = scene;

    _this.resizable = false;
    return _this;
  }

  _createClass(Buffer, [{
    key: 'renderBuffer',
    value: function renderBuffer(x, y) {
      var tempScene = this.scene;
      var tempRoot = this.root;

      this.root = this;
      this.scene = this.bufferScene;
      this.onAddedToScene();

      _get(Buffer.prototype.__proto__ || Object.getPrototypeOf(Buffer.prototype), 'render', this).call(this, 0, x, y);

      this.root = tempRoot;
      this.scene = tempScene;
    }
  }, {
    key: 'render',
    value: function render() {}
  }]);

  return Buffer;
}(_Container3.default
/** @lends display.scene.Buffer# */
);

exports.default = Buffer;

},{"./Container":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SceneDisplayObject2 = require('./SceneDisplayObject');

var _SceneDisplayObject3 = _interopRequireDefault(_SceneDisplayObject2);

var _MouseEvent = require('minibot/event/MouseEvent');

var _MouseEvent2 = _interopRequireDefault(_MouseEvent);

var _TouchEvent = require('minibot/event/TouchEvent');

var _TouchEvent2 = _interopRequireDefault(_TouchEvent);

var _ButtonEvent = require('minibot/event/ButtonEvent');

var _ButtonEvent2 = _interopRequireDefault(_ButtonEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_SceneDisplayObject) {
  _inherits(Button, _SceneDisplayObject);

  // upState: null,
  // downState: null,
  // overState: null,
  // currentState: null,

  // states: null,

  // isDown: false,
  // isOver: false,

  // mouseMoveCallback: null,
  // mouseUpCallback: null,

  // touchMoveCallback: null,
  // touchEndCallback: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param
   * @param {display.DisplayObject} upState The resource to display when the button is "up".
   * @param {display.DisplayObject} downState The resource to display when the button is "down".
   * @param {display.DisplayObject} overState The resource to display when the button is "over".
   */
  function Button(upState, downState, overState) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    if (upState != undefined) _this.upState = upState;
    if (downState != undefined) _this.downState = downState;
    if (overState != undefined) _this.overState = overState;

    _this.currentState = _this.upState;

    _this.w = _this.upState.w;
    _this.h = _this.upState.h;

    _this.states = new Array();
    if (_this.upState != null) _this.states.push(_this.upState);
    if (_this.downState != null) _this.states.push(_this.downState);
    if (_this.overState != null) _this.states.push(_this.overState);

    //this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
    //this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
    return _this;
  }

  /**
   * Function description.
   * @access public
   */


  _createClass(Button, [{
    key: 'render',
    value: function render(dt, x, y) {
      this.currentState.render(dt, this.x + x, this.y + y);
    }

    /**
     * Function description.
     * @access protected
     */

  }, {
    key: 'onAddedToScene',
    value: function onAddedToScene() {
      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'onAddedToScene', this).call(this);
      this.states.each(function (displayObject) {
        displayObject.root = this.parent;
        displayObject.parent = this;
        displayObject.scene = this.scene;
        displayObject.onAddedToScene();
      }.bind(this));
    }

    /**
     * Function description.
     * @access protected
     */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      if (!this.isDown) {
        if (event.type == _MouseEvent2.default.MOUSE_DOWN) {
          this.currentState = this.downState;
          this.isDown = true;

          if (!this.mouseMoveCallback) {
            this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
            this.parent.addEventListener(_MouseEvent2.default.MOUSE_MOVE, this.mouseMoveCallback);
          }

          if (!this.mouseUpCallback) {
            this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
            this.parent.addEventListener(_MouseEvent2.default.MOUSE_UP, this.mouseUpCallback);
          }
        } else if (event.type == _TouchEvent2.default.TOUCH_START) {
          this.currentState = this.downState;
          this.isDown = true;

          if (!this.touchMoveCallback) {
            this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
            this.parent.addEventListener(_TouchEvent2.default.TOUCH_MOVE, this.touchMoveCallback);
          }

          if (!this.touchEndCallback) {
            this.touchEndCallback = this.handleTouchEnd.bindAsEventListener(this);
            this.parent.addEventListener(_TouchEvent2.default.TOUCH_END, this.touchEndCallback);
          }
        } else if (event.type == _MouseEvent2.default.MOUSE_MOVE) {
          this.currentState = this.overState;

          if (!this.mouseMoveCallback) {
            this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
            this.parent.addEventListener(_MouseEvent2.default.MOUSE_MOVE, this.mouseMoveCallback);
          }
        } else if (event.type == _TouchEvent2.default.TOUCH_MOVE) {
          this.currentState = this.overState;

          if (!this.touchMoveCallback) {
            this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
            this.parent.addEventListener(_TouchEvent2.default.TOUCH_MOVE, this.touchMoveCallback);
          }
        } else if (event.type == _TouchEvent2.default.TOUCH_END) {
          this.currentState = this.upState;

          if (this.touchMoveCallback) {
            this.parent.removeEventListener(_TouchEvent2.default.TOUCH_MOVE, this.touchMoveCallback);
            this.touchMoveCallback = null;
          }
        }
      } else {
        if (event.type == _MouseEvent2.default.MOUSE_UP) {
          this.isDown = false;

          if (this.mouseMoveCallback) {
            this.parent.removeEventListener(_MouseEvent2.default.MOUSE_MOVE, this.mouseMoveCallback);
            this.mouseMoveCallback = null;
          }

          if (this.mouseUpCallback) {
            this.parent.removeEventListener(_MouseEvent2.default.MOUSE_UP, this.mouseUpCallback);
            this.mouseUpCallback = null;
          }

          this.currentState = this.upState;

          this.select.bind(this).defer(event);
        } else if (event.type == _TouchEvent2.default.TOUCH_END) {
          this.isDown = false;

          if (this.touchMoveCallback) {
            this.parent.removeEventListener(_TouchEvent2.default.TOUCH_MOVE, this.touchMoveCallback);
            this.touchMoveCallback = null;
          }

          if (this.touchUpCallback) {
            this.parent.removeEventListener(_TouchEvent2.default.TOUCH_END, this.touchEndCallback);
            this.touchEndCallback = null;
          }

          this.currentState = this.upState;

          this.select.bind(this).defer(event);
        }
      }
      return _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'dispatchEvent', this).call(this, event);
    }

    /**
     * Function description.
     * @access private
     */

  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(event) {

      this.isOver = this.isEventOver(event);

      if (this.isOver && this.isDown) {
        this.currentState = this.downState;
      } else if (this.isOver) {
        this.currentState = this.overState;
      } else if (this.isDown) {
        this.currentState = this.upState;
      } else {
        this.currentState = this.upState;
        if (this.mouseMoveCallback) {
          this.parent.removeEventListener(_MouseEvent2.default.MOUSE_MOVE, this.mouseMoveCallback);
          this.mouseMoveCallback = null;
        }
      }
    }

    /**
     * Function description.
     * @access private
     */

  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(event) {

      this.isOver = this.isEventOver(event);

      if (this.isOver && this.isDown) {
        this.currentState = this.downState;
      } else if (this.isOver) {
        this.currentState = this.overState;
      } else if (this.isDown) {
        this.currentState = this.upState;
      } else {
        this.currentState = this.upState;
        if (this.touchMoveCallback) {
          this.parent.removeEventListener(_TouchEvent2.default.TOUCH_MOVE, this.touchMoveCallback);
          this.touchMoveCallback = null;
        }
      }
    }
  }, {
    key: 'isEventOver',
    value: function isEventOver(event) {
      var sceneX = this.getSceneX();
      var sceneY = this.getSceneY();
      return event.x >= sceneX && event.x <= sceneX + this.w && event.y >= sceneY && event.y <= sceneY + this.h;
    }

    /**
     * Function description.
     * @access private
     */

  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(event) {
      this.currentState = this.upState;
      this.isDown = false;

      if (this.mouseMoveCallback) {
        this.parent.removeEventListener(_MouseEvent2.default.MOUSE_MOVE, this.mouseMoveCallback);
        this.mouseMoveCallback = null;
      }

      if (this.mouseUpCallback) {
        this.parent.removeEventListener(_MouseEvent2.default.MOUSE_UP, this.mouseUpCallback);
        this.mouseUpCallback = null;
      }
    }

    /**
     * Function description.
     * @access private
     */

  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(event) {
      this.currentState = this.upState;
      this.isDown = false;

      if (this.touchMoveCallback) {
        this.parent.removeEventListener(_TouchEvent2.default.TOUCH_MOVE, this.touchMoveCallback);
        this.touchMoveCallback = null;
      }

      if (this.touchUpCallback) {
        this.parent.removeEventListener(_TouchEvent2.default.TOUCH_END, this.touchEndCallback);
        this.touchEndCallback = null;
      }
    }

    /**
     * Function description.
     * @access private
     */

  }, {
    key: 'select',
    value: function select(event) {
      var x = event.x;
      var y = event.y;
      var type = _ButtonEvent2.default.SELECT;

      var buttonEvent = new _ButtonEvent2.default(type, false, false, this);
      this.dispatchEvent(buttonEvent);
    }
  }]);

  return Button;
}(_SceneDisplayObject3.default
/** @lends display.scene.Button# */
);

exports.default = Button;

},{"./SceneDisplayObject":12,"minibot/event/ButtonEvent":17,"minibot/event/MouseEvent":22,"minibot/event/TouchEvent":23}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SceneDisplayObject2 = require('./SceneDisplayObject');

var _SceneDisplayObject3 = _interopRequireDefault(_SceneDisplayObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_SceneDisplayObject) {
  _inherits(Container, _SceneDisplayObject);

  /** Array containing the Container layers
   * @type Array
   */
  // layers: null,
  /** Boolean indicating touch events attached.
   * @type boolean
   */
  // touchChildren: true,
  /** Indicates whether or not the container is able to be resized.
   * @type boolean
   */
  // resizable: true,

  // scalable: true,

  // scale: 1,

  /** Appends a child to the container.
   * @param {display.DisplayObject} displayObject The display object to be added.
   * @param {Number} layer The layer to be added.
   * @param {Number} The position of the layer.
   */
  function Container() {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

    _this.layers = new Array();
    return _this;
  }

  _createClass(Container, [{
    key: 'addChild',
    value: function addChild(displayObject, layer, position) {
      if (layer == undefined) layer = 0;
      while (this.layers.length <= layer) {
        this.layers.push(new Array());
      }if (position == undefined) position = this.layers[layer].length;

      //this.layers[layer].push(displayObject);
      this.layers[layer].splice(position, 0, displayObject);

      if (this.scalable && this.scale != 1) {
        displayObject.w *= this.scale;
        displayObject.h *= this.scale;
        displayObject.x *= this.scale;
        displayObject.y *= this.scale;
      }

      if (this.root != null) {
        displayObject.root = this.root;
        displayObject.scene = this.scene;
        displayObject.parent = this;
        displayObject.onAddedToScene();
      }

      if (this.resizable) {
        // Expand the container object dimensions to hold the object
        if (this.w < displayObject.x + displayObject.w) this.w = displayObject.x + displayObject.w;
        if (this.h < displayObject.y + displayObject.h) this.h = displayObject.y + displayObject.h;
      }
    }
    /** Removes a child from the container.
     * @param {display.DisplayObject} displayObject The object to be removed.
     */

  }, {
    key: 'removeChild',
    value: function removeChild(displayObject) {
      for (var l = 0; l < this.layers.length; l++) {
        var layer = this.layers[l];
        for (var d = 0; d < layer.length; d++) {
          if (displayObject === layer[d]) {
            layer.splice(d, 1);
            displayObject.onRemovedFromScene();
            return;
          }
        }
      }
    }
    /** Removes all children from the container. */

  }, {
    key: 'removeAll',
    value: function removeAll() {
      var layers = this.layers;
      var displayObject;
      for (var l = 0; l < layers.length; l++) {
        var layer = layers[l];
        for (var d = 0; d < layer.length; d++) {
          displayObject = layer[d];
          displayObject.onRemovedFromScene();
        }
      }
      this.layers = new Array();
    }
    /** Renders the objects within the container layers.
     * @param {Number} dt The change in time.
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     */

  }, {
    key: 'render',
    value: function render(dt, x, y) {
      if (this.scene == null) return;
      if (x == undefined) x = 0;
      if (y == undefined) y = 0;

      var l, d, layer, displayObject, xBounds, yBounds;

      for (l = 0; l < this.layers.length; l++) {
        layer = this.layers[l];
        for (d = 0; d < layer.length; d++) {
          displayObject = layer[d];

          // check if the display object is visible
          if (!displayObject.isVisible) continue;

          // check if the display object is outside the scene
          xBounds = this.x + x + displayObject.x;
          yBounds = this.y + y + displayObject.y;
          if (xBounds >= this.root.w || xBounds < -1 * displayObject.w || yBounds >= this.root.h || yBounds < -1 * displayObject.h) continue;

          // render the display object
          displayObject.render(dt, this.x + x, this.y + y);
        }
      }
    }
    /** Sets the child objects index within the layers.
     * @param {display.DisplayObject} displayObject The display object to be modified.
     * @param {Number} index The specified index to be set.
     */

  }, {
    key: 'setChildIndex',
    value: function setChildIndex(displayObject, index) {
      for (var l = 0; l < this.layers.length; l++) {
        var layer = this.layers[l];
        for (var d = 0; d < layer.length; d++) {
          if (displayObject === layer[d]) {

            if (index >= layer.length) return;

            layer.splice(d, 1);
            layer.splice(index, 0, displayObject);

            return;
          }
        }
      }
    }
    /** Uses the event dispatcher to handle events.
     * @param {event} event The specified event.
     * @param {}
     */

  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      /*
      if(event.isTouchEvent()) {
        if(!this.touchEnabled) return false;
        if(!this.touchChildren) return $super(event);
      }
      */

      var captured = false;
      var dispatched = false;

      var l, d, layer, displayObject;

      if ('x' in event && 'y' in event) {
        event.x -= this.x;
        event.y -= this.y;
        for (l = this.layers.length - 1; l >= 0; l--) {
          layer = this.layers[l];
          for (d = layer.length - 1; d >= 0; d--) {
            displayObject = layer[d];

            // skip if the object is invisible
            if (!displayObject.isVisible) continue;

            if (event.x >= displayObject.x && event.x <= displayObject.x + displayObject.w && event.y >= displayObject.y && event.y <= displayObject.y + displayObject.h) {
              dispatched = displayObject.dispatchEvent(event);
              captured = true;
            }
            if (captured) break;
          }
          if (captured) break;
        }
      }

      if (!dispatched) {
        if ('x' in event && 'y' in event) {
          event.x += this.x;
          event.y += this.y;
        }
        return _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'dispatchEvent', this).call(this, event);
      } else {
        return true;
      }
    }
    /** Actions to be carried out upon being attached to a scene.
     * @param {}
     */

  }, {
    key: 'onAddedToScene',
    value: function onAddedToScene() {
      _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'onAddedToScene', this).call(this);

      var l, d, layer, displayObject;

      for (l = 0; l < this.layers.length; l++) {
        layer = this.layers[l];
        for (d = 0; d < layer.length; d++) {
          displayObject = layer[d];
          displayObject.root = this.root;
          displayObject.scene = this.scene;
          displayObject.parent = this;
          displayObject.onAddedToScene();
        }
      }
    }
    /** Actions to be carried out upon being removed from a scene.
     * @param {}
     */

  }, {
    key: 'onRemovedFromScene',
    value: function onRemovedFromScene() {
      _get(Container.prototype.__proto__ || Object.getPrototypeOf(Container.prototype), 'onRemovedFromScene', this).call(this);
      for (var l = 0; l < this.layers.length; l++) {
        var layer = this.layers[l];
        for (var d = 0; d < layer.length; d++) {
          layer[d].onRemovedFromScene();
        }
        this.layers[l] = null;
      }
      this.layers = new Array();
    }

    // Updated this function to scale internal components if it is scalable

  }, {
    key: 'setScale',
    value: function setScale(scale) {
      if (!this.scalable) return;

      var s = scale / this.scale;

      for (l = 0; l < this.layers.length; l++) {
        layer = this.layers[l];
        for (d = 0; d < layer.length; d++) {
          displayObject = layer[d];
          displayObject.w *= s;
          displayObject.h *= s;
          displayObject.x *= s;
          displayObject.y *= s;
        }
      }
      this.w *= s;
      this.h *= s;

      this.scale = scale;
    }

    /*
    ,
      align(align, objects, recursive)
    {
      if(!(objects instanceof Array)) objects = [ objects ];
      if(recursive == undefined) recursive = false;
        var cx = this.getSceneX() + (this.getWidth()/2);
      var cy = this.getSceneY() + (this.getHeight()/2);
      var object, ox, oy;
        for(var i = 0; i < objects.length; i++) {
        object = objects[i];
        ox = object.getSceneX() + (object.getWidth()/2);
        oy = object.getSceneY() + (object.getHeight()/2);
        object.x += cx - ox;
        object.y += cy - oy;
      }
      }
    */

  }]);

  return Container;
}(_SceneDisplayObject3.default
/** @lends display.scene.Container# */
);

exports.default = Container;

},{"./SceneDisplayObject":12}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneDisplayObject2 = require('./SceneDisplayObject');

var _SceneDisplayObject3 = _interopRequireDefault(_SceneDisplayObject2);

var _Color = require('minibot/graphics/Color');

var _Color2 = _interopRequireDefault(_Color);

var _Pattern = require('minibot/graphics/Pattern');

var _Pattern2 = _interopRequireDefault(_Pattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rect = function (_SceneDisplayObject) {
  _inherits(Rect, _SceneDisplayObject);

  // mode: null,

  // fillColor: null,
  // fillPattern: null,
  // strokeColor: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param
   * @param {int} width The width of the rectangle.
   */
  function Rect(width, height, mode, fill, strokeColor) {
    _classCallCheck(this, Rect);

    var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this));

    _this.w = width;
    _this.h = height;

    _this.mode = mode;

    if (fill != undefined) {
      if (fill.type == _Color2.default.TYPE) {
        _this.fillColor = fill;
      } else if (fill.type = _Pattern2.default.TYPE) {
        _this.fillPattern = fill;
      }
    }
    if (strokeColor != undefined) _this.strokeColor = strokeColor;

    return _this;
  }

  _createClass(Rect, [{
    key: 'render',
    value: function render(dt, x, y) {
      if (this.fillColor != null) this.scene.setFillColor(this.fillColor);
      if (this.fillPattern != null) this.scene.setFillPattern(this.fillPattern);

      this.scene.drawRect(this.mode, this.x + x, this.y + y, this.w, this.h);
    }
  }]);

  return Rect;
}(_SceneDisplayObject3.default
/** @lends display.scene.Rect# */
);

exports.default = Rect;

},{"./SceneDisplayObject":12,"minibot/graphics/Color":25,"minibot/graphics/Pattern":26}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher = require('minibot/event/EventDispatcher');

var _EventDispatcher2 = _interopRequireDefault(_EventDispatcher);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scene
/** @lends display.scene.Scene# */
= function () {
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
  function Scene(options) {
    _classCallCheck(this, Scene);

    this.options = options;

    this.container = new _Container2.default();
    this.container.resizable = false;
    this.container.setRoot(this.container);
    this.container.setScene(this);
  }

  // Public Methods -->

  _createClass(Scene, [{
    key: 'hasOption',
    value: function hasOption(key) {
      return this.options[key] != undefined;
    }
  }, {
    key: 'getOption',
    value: function getOption(key) {
      return this.options[key];
    }
  }, {
    key: 'getBuffer',
    value: function getBuffer() {}

    /** Set the width of the scene.
     * @param {Number} width The width desired.
     */

  }, {
    key: 'setWidth',
    value: function setWidth(width) {
      this.width = width;
      this.container.setWidth(width);
    }

    /** Returns the width of the scene.
     * @returns {Number}
     */

  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.width;
    }

    /** Set the height of the scene.
     * @param {Number} height The height desired.
     */

  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      this.height = height;
      this.container.setHeight(height);
    }

    /** Returns the height of the scene.
     * @returns {Number}
     */

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.height;
    }

    /** Appends a child to the specified container.
       @param {display.DisplayObject} displayObject The displayObject to add.
     @param {layer} layer The layer to be added to.
     */

  }, {
    key: 'addChild',
    value: function addChild(displayObject, layer) {
      if (layer == undefined || layer == null) layer = 0;
      this.container.addChild(displayObject, layer);
    }

    /** Removes a child from the specified container.
       @param {display.DisplayObject} displayObject The displayObject to remove.
     */ /** Removes all children from the specified container. */

  }, {
    key: 'removeChild',
    value: function removeChild(displayObject) {
      this.container.removeChild(displayObject);
    }

    /** Removes all children from the specified container. */

  }, {
    key: 'removeAllChildren',
    value: function removeAllChildren() {
      this.container.removeAll();
    }

    /** Renders the scene
     * @param {Number} dt The change in time.
     */

  }, {
    key: 'render',
    value: function render(dt) {
      this.container.render(dt);
    }
  }, {
    key: 'clear',
    value: function clear() {}
    // overload in subclass


    // Graphics Methods -->

  }, {
    key: 'drawBuffer',
    value: function drawBuffer() {}

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

  }, {
    key: 'drawImage',
    value: function drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {}

    /** Draws a line.
     * @param {Number} x1 The starting x coordinate.
     * @param {Number} x2 The ending x coordinate.
     * @param {Number} y1 The starting y coordinate.
     * @param {Number} y2 The ending y coordinate.
     */

  }, {
    key: 'drawLine',
    value: function drawLine(x1, y1, x2, y2) {}

    /** Draws a Rectangle.
     * @param {Number} Mode Represents whether or not to fill the rectangle.
     * @param {Number} x The starting x coordinate.
     * @param {Number} y The starting y coordinate.
     * @param {Number} w The width of the rectangle.
     * @param {Number} h The height of the rectangle.
     */

  }, {
    key: 'drawRect',
    value: function drawRect(mode, x, y, w, h) {}

    /** Sets the fill color.
     * @param {graphics.Color} color The color to be used.
     */

  }, {
    key: 'setFillColor',
    value: function setFillColor(color) {}

    /** Sets the fill pattern.
     * @param {graphics.Pattern} pattern The pattern to be used.
     */

  }, {
    key: 'setFillPattern',
    value: function setFillPattern(pattern) {}

    /** Sets the line color.
     * @param {graphics.Color} color The color to be used.
     */

  }, {
    key: 'setLineColor',
    value: function setLineColor(color) {}

    /** Sets the line style.
     * @param {object} style The style to be used.
     */

  }, {
    key: 'setLineStyle',
    value: function setLineStyle(style) {}

    /** Sets the line width.
     * @param {Number} width The width to be used.
     */

  }, {
    key: 'setLineWidth',
    value: function setLineWidth(width) {}

    /** Save
     */

  }, {
    key: 'save',
    value: function save() {}

    /** Restore
     */

  }, {
    key: 'restore',
    value: function restore() {}

    /** Translate
     * @param {Number} x 
     * @param {Number} y 
     */

  }, {
    key: 'translate',
    value: function translate(x, y) {}

    /** Rotate
     * @param {Number} a 
     */

  }, {
    key: 'rotate',
    value: function rotate(a) {}

    // <-- Graphics Methods

    // Event Methods -->

  }, {
    key: 'addEventListener',
    value: function addEventListener(type, callback) {
      this.container.addEventListener(type, callback);
    }
  }, {
    key: 'hasEventListener',
    value: function hasEventListener(type) {
      return this.container.addEventListener(type);
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(event) {
      return this.container.dispatchEvent(event);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, callback) {
      this.container.removeEventListener(type, callback);
    }
  }, {
    key: 'removeAllEventListeners',
    value: function removeAllEventListeners() {
      this.container.removeAllEventListeners();
    }

    // <-- Event Methods

    // <-- Public Methods


  }]);

  return Scene;
}();

exports.default = Scene;

},{"./Container":9,"minibot/event/EventDispatcher":19}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DisplayObject2 = require('minibot/display/DisplayObject');

var _DisplayObject3 = _interopRequireDefault(_DisplayObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SceneDisplayObject = function (_DisplayObject) {
  _inherits(SceneDisplayObject, _DisplayObject);

  /** The x position of the SceneDisplayObject.
   * @type Number
   */
  // x: 0,
  /** The y position of the SceneDisplayObject.
   * @type Number
   */
  // y: 0,
  /** The width of the SceneDisplayObject.
   * @type Number
   */
  // w: 0,
  /** The height position of the SceneDisplayObject.
   * @type Number
   */
  // h: 0,
  /** The root directory.
   * @type String
   */
  // root: null,
  /** The current scene.
   * @type display.scene
   */
  // scene: null,
  /** Indicates whether or not the SceneDisplayObject is able to be seen.
   * @type boolean
   */
  // isVisible: true,

  /**
   * Creates a new SceneDisplayObject instance.
   * @class The scenedisplay object manages both the scene as well as the objects to be displayed.
   * Objects can be added and removed from the scene while choosing what is to be rendered.
   * @extends display.DisplayObject
   * @constructs
   * @param
   */
  function SceneDisplayObject() {
    _classCallCheck(this, SceneDisplayObject);

    return _possibleConstructorReturn(this, (SceneDisplayObject.__proto__ || Object.getPrototypeOf(SceneDisplayObject)).call(this));
  }
  /** Renders the SceneDisplayObject and its components.
   * @param {Number} dt The change in time.
   * @param {Number} x The x position at which the rendering occurs.
   * @param {Number} y The y position at which the rendering occurs.
   */


  _createClass(SceneDisplayObject, [{
    key: 'render',
    value: function render(dt, x, y) {}
    // This function must be overloaded in the sub class

    /** Actions to be triggered when a scene object is added to a scene.
     *
     */

  }, {
    key: 'onAddedToScene',
    value: function onAddedToScene() {}
    // This callback is triggered when a scene object is added to a scene

    /** Actions to be triggered when a scene object is removed from a scene.
     *
     */

  }, {
    key: 'onRemovedFromScene',
    value: function onRemovedFromScene() {}
    // This callback is triggered when a scene object is removed from a scene

    /** Retrieves the scene's X field.
     * @returns display.scene
     */

  }, {
    key: 'getScene',
    value: function getScene() {
      return this.scene;
    }
    /** Retrieves the scene object's width.
     * @returns display.scene
     */

  }, {
    key: 'getWidth',
    value: function getWidth() {
      return this.w;
    }
    /** Retrieves the scene object's height.
     * @returns display.scene
     */

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.h;
    }
    /** Retrieves the scene's X field.
     * @returns display.scene
     */

  }, {
    key: 'getSceneX',
    value: function getSceneX() {
      var sceneX = 0;
      if (this.parent != null) {
        sceneX += this.parent.getSceneX();
      }
      sceneX += this.x;
      return sceneX;
    }
    /** Retrieves the scene's Y field.
     * @returns display.scene
     */

  }, {
    key: 'getSceneY',
    value: function getSceneY() {
      var sceneY = 0;
      if (this.parent != null) {
        sceneY += this.parent.getSceneY();
      }
      sceneY += this.y;
      return sceneY;
    }
    /** Sets a root directory.
     * @param {String} root The root specified.
     */

  }, {
    key: 'setRoot',
    value: function setRoot(root) {
      this.root = root;
    }
    /** Chooses the current scene.
     * @param {display.scene} scene The scene to be set.
     */

  }, {
    key: 'setScene',
    value: function setScene(scene) {
      this.scene = scene;
    }
    /** Sets the sceneDisplayObject's width.
     * @param {Number} width The specified width.
     */

  }, {
    key: 'setWidth',
    value: function setWidth(width) {
      this.w = width;
    }
    /** Sets the sceneDisplayObject's height.
     * @param {Number} height The specified height.
     */

  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      this.h = height;
    }
    /** Sets the sceneDisplayObject to be invisible. */

  }, {
    key: 'hide',
    value: function hide() {
      this.isVisible = false;
    }
    /** Sets the sceneDisplayObject to be visible. */

  }, {
    key: 'show',
    value: function show() {
      this.isVisible = true;
    }
  }, {
    key: 'setAlign',
    value: function setAlign(align, objects, recursive) {
      if (!(objects instanceof Array)) objects = [objects];
      if (recursive == undefined) recursive = false;

      var object, t, o;
      switch (align) {
        case _DisplayObject3.default
        /** @lends display.scene.SceneDisplayObject# */
        .ALIGN_HORZ_CENTER:
          var t = this.getSceneX() + this.getWidth() / 2;
          for (var i = 0; i < objects.length; i++) {
            object = objects[i];
            o = object.getSceneX() + object.getWidth() / 2;
            object.x += t - o;
          }
          break;
        case _DisplayObject3.default.ALIGN_VERT_CENTER:
          var t = this.getSceneY() + this.getHeight() / 2;
          for (var i = 0; i < objects.length; i++) {
            object = objects[i];
            o = object.getSceneY() + object.getHeight() / 2;
            object.y += t - o;
          }
          break;
      }
    }
  }]);

  return SceneDisplayObject;
}(_DisplayObject3.default);

exports.default = SceneDisplayObject;

},{"minibot/display/DisplayObject":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneDisplayObject2 = require('minibot/display/scene/SceneDisplayObject');

var _SceneDisplayObject3 = _interopRequireDefault(_SceneDisplayObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = function (_SceneDisplayObject) {
  _inherits(Sprite, _SceneDisplayObject);

  /** The sprite object.
   * @type resource.SpriteResource
   */
  // sprite: null,
  /** Composite object.
   * @ type object
   */
  // composite: null,

  /**
   * Creates a new Sprite instance.
   * @class Creates a sprite to be rendered.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param {resource.SpriteResource} sprite The sprite to be used.
   * @param
   */
  function Sprite(sprite) {
    _classCallCheck(this, Sprite);

    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this));

    _this.sprite = sprite;
    _this.w = sprite.w;
    _this.h = sprite.h;
    return _this;
  }
  /** Renders the sprite.
   * @param {Number} dt The change in time.
   * @param {Number} x The x position to render the sprite.
   * @param {Number} y The y position to render the sprite.
   */


  _createClass(Sprite, [{
    key: 'render',
    value: function render(dt, x, y) {
      try {
        this.scene.drawImage(this.sprite.img, this.sprite.x, //sx,
        this.sprite.y, //sy,
        this.sprite.w, //sw,
        this.sprite.h, //sh,
        this.x + x, //dx,
        this.y + y, //dy,
        this.w, //dw,
        this.h //dh
        );
      } catch (error) {
        console.log('SpriteObject: Fatal Error');
      }
    }
  }]);

  return Sprite;
}(_SceneDisplayObject3.default
/** @lends display.scene.Sprite# */
);

exports.default = Sprite;

},{"minibot/display/scene/SceneDisplayObject":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SceneDisplayObject2 = require("minibot/display/scene/SceneDisplayObject");

var _SceneDisplayObject3 = _interopRequireDefault(_SceneDisplayObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_SceneDisplayObject) {
  _inherits(Text, _SceneDisplayObject);

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
  function Text(text, style) {
    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this));

    _this.text = text;

    if (style != undefined) _this.style = style;

    /*
    if(font != undefined) this.font = font;
    if(fillStyle != undefined) this.fillStyle = fillStyle;
    if(textAlign != undefined) this.textAlign = textAlign;
      if(context != undefined) {
      this.setStyle(context);
      this.metrics = context.measureText(this.text);
    }
    */
    return _this;
  }

  _createClass(Text, [{
    key: "setStyle",
    value: function setStyle() {
      /*
      if(this.font != null) context.font = this.font;
      if(this.textAlign != null) context.textAlign = this.textAlign;
      if(this.fillStyle != null) context.fillStyle = this.fillStyle;
      */
    }
  }, {
    key: "getText",
    value: function getText() {
      return this.text;
    }
  }, {
    key: "getMetrics",
    value: function getMetrics() {
      return this.metrics;
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this.text = text;
    }
  }, {
    key: "render",
    value: function render(dt, x, y) {
      this.scene.drawText("", this.text, this.style, this.x + x, this.y + y);
    }
  }]);

  return Text;
}(_SceneDisplayObject3.default
/** @lends display.scene.Text# */
);

exports.default = Text;

},{"minibot/display/scene/SceneDisplayObject":12}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Color = require('minibot/graphics/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextStyle
/** @lends display.scene.TextStyle# */
= function () {

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
  function TextStyle(family, size, color, align, weight) {
    _classCallCheck(this, TextStyle);

    this.family = family;
    this.size = size;
    this.color = color;
    this.align = align;
    this.weight = weight ? weight : '';
  }

  _createClass(TextStyle, [{
    key: 'getFamily',
    value: function getFamily() {
      return this.family;
    }
  }, {
    key: 'getSize',
    value: function getSize() {
      return this.size;
    }
  }, {
    key: 'getColor',
    value: function getColor() {
      return this.color;
    }
  }, {
    key: 'getAlign',
    value: function getAlign() {
      return this.align;
    }
  }, {
    key: 'getWeight',
    value: function getWeight() {
      return this.weight;
    }
  }]);

  return TextStyle;
}();

exports.default = TextStyle;

},{"minibot/graphics/Color":25}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseEvent
/** @lends event.BaseEvent# */
= function () {
  /** The type of event. 
   * @type string
   */
  // type: null,
  /** The event target.
   * @type object
   */
  // target: null,
  /** The object that is actively uses an eventListener on the Event object.
   * @type object
   */
  // currentTarget: null,
  /** Indictes a bubbling event.
   * @type bool
   */
  // bubbles: null,
  /** Indicates if the action associated with an event can be terminated.
   * @type bool
   */
  // cancelable: null,
  /** The current phase of the event flow.
   * @type object
   */
  // currentPhase: null,

  /**
   * Constructs a new BaseEvent instance.
   * @class An event class that can process specific events.
   * Passes on objects to specific management events.
   * @constructs
   * @param {String} type The type of event.
   * @param {Boolean} bubbles Flags if the event bubbles after the capture phase.
   * @param {Boolean} cancelable Flags if the event is able to cancel at any point in the event cycle.
   */
  function BaseEvent(type, bubbles, cancelable) {
    _classCallCheck(this, BaseEvent);

    this.type = type;

    this.bubbles = bubbles == undefined ? false : bubbles;
    this.cancelable = cancelable == undefined ? false : cancelable;
  }

  /**
   * Stops the default action of the event from being carried out.
   */


  _createClass(BaseEvent, [{
    key: "preventDefault",
    value: function preventDefault() {}
  }]);

  return BaseEvent;
}();

exports.default = BaseEvent;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonEvent = function (_BaseEvent) {
  _inherits(ButtonEvent, _BaseEvent);

  /** The object upon which the mouse is displayed.
   * @type display.DisplayObject
   */
  // displayObject: null,

  /**
   * Constructs a MouseEvent instance.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} type The type of event.
   * @param {Boolean} bubbles Indicates a bubbling event.
   * @param {Boolean} cancelable Indicates whether the event action can be terminated.
   * @param {Number} x The x coordinate of the MouseEvent.
   * @param {Number} y The y coordinate of the MouseEvent.
   * @param {display.DisplayObject} displayObject The object upon which the mouse is displayed.
   * @param
   */
  function ButtonEvent($super, type, bubbles, cancelable, displayObject) {
    _classCallCheck(this, ButtonEvent);

    var _this = _possibleConstructorReturn(this, (ButtonEvent.__proto__ || Object.getPrototypeOf(ButtonEvent)).call(this, type, bubbles, cancelable));

    _this.displayObject = displayObject;
    return _this;
  }

  return ButtonEvent;
}(_BaseEvent3.default
/** @lends event.MouseEvent# */
);

exports.default = ButtonEvent;

},{"./BaseEvent":16}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EngineEvent = function (_BaseEvent) {
  _inherits(EngineEvent, _BaseEvent);

  /** Description of object.
   * @type object
   */
  // object: null,
  /** Description of component.
   * @type object
   */
  // component: null,
  /** Description of data.
   * @type object
   */
  // data: null,

  /**
   * Creates a new EngineEvent instance.
   * @class Identifies an event and selects appropriate action.
   * Analyzes event data in order to pinpoint significant events and trigger actions.
   * @constructs
   * @param {type} type Description of type.
   * @param {object} object Description of object.
   * @param {object} Description of component.
   * @param {object} data Description of data.
   * @param
   */
  function EngineEvent($super, type, object, component, data) {
    _classCallCheck(this, EngineEvent);

    var _this = _possibleConstructorReturn(this, (EngineEvent.__proto__ || Object.getPrototypeOf(EngineEvent)).call(this, type, false, false));

    _this.object = object;
    _this.component = component;
    _this.data = data;
    return _this;
  }

  return EngineEvent;
}(_BaseEvent3.default
/** @lends event.EngineEvent# */
);

exports.default = EngineEvent;

},{"./BaseEvent":16}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDispatcher
/** @lends event.EventDispatcher# */
= function () {
  /**
   * Map of eventListeners availiable.
   * @type json
   */
  // listeners: null,

  /**
   * Creates a new EventDispatcher instance.
   * @class Relegates and dispatches events to a target.
   * Events can be attached to targets in order to keep the flow of processes running as intended.
   * @constructs
   */
  function EventDispatcher() {
    _classCallCheck(this, EventDispatcher);

    this.listeners = {};
  }
  /**
   * Registers an eventListener to a target.
   * @param {type} type The data type of event the specified listener is looking for.
   * @param {object} callback The listener object that recieves the specified type.
   */


  _createClass(EventDispatcher, [{
    key: "addEventListener",
    value: function addEventListener(type, callback) {
      var callbacks;
      if (this.listeners[type] == undefined) {
        callbacks = new Array();
        this.listeners[type] = callbacks;
      } else {
        callbacks = this.listeners[type];
      }
      callbacks.push(callback);
    }
    /**
     * Returns whether or not the EventDispatcher has an event listener for the specified type.
     * @param {type} type The data type of the event the specified listener is looking for.
     * @returns {boolean} A value indicating whether or not an event listener for the specified type is available.
     */

  }, {
    key: "hasEventListener",
    value: function hasEventListener(type) {
      return this.listeners[type] != undefined;
    }
    /**
     * Sends the event to the EventDispatcher to be sent into the event flow.
     * @param {event} event The event to be sent into the event flow.
     * @returns {boolean} A value indicating whether or not the event was successfully dispatched.
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var callbacks;
      if (this.listeners[event.type] == undefined) {
        return false;
      } else {
        callbacks = this.listeners[event.type];
      }
      event.target = this;
      for (var i = 0; i < callbacks.length; i++) {
        var callback = callbacks[i];
        callback(event);
      }
      return true;
    }
    /**
     * Gets rid of an eventListener.
     * @param {type} type The type of data the specified listener is looking for.
     * @param {object} callback The listener object that recieves the specified type.
     */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, callback) {
      var callbacks;
      if (this.listeners[type] == undefined) {
        return;
      } else {
        callbacks = this.listeners[type];
      }
      var i = callbacks.indexOf(callback);
      if (i == -1) return;
      callbacks.splice(i, 1);

      // Remove the callbacks array from the map if empty
      if (callbacks.length == 0) {
        delete this.listeners[type];
      }
    }
    /**
     * Gets rid of all eventListeners on the map.
     */

  }, {
    key: "removeAllEventListeners",
    value: function removeAllEventListeners() {
      this.listeners = {};
    }
  }]);

  return EventDispatcher;
}();

exports.default = EventDispatcher;

},{}],20:[function(require,module,exports){
"use strict";

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeyboardEvent = function (_BaseEvent) {
  _inherits(KeyboardEvent, _BaseEvent);

  // key: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} type
   * @param {Boolean} bubbles
   * @param {Boolean} cancelable
   * @param {Number} x
   * @param {Number} y
   * @param {display.DisplayObject} displayObject
   * @param
   */
  function KeyboardEvent(type, bubbles, cancelable, key) {
    _classCallCheck(this, KeyboardEvent);

    var _this = _possibleConstructorReturn(this, (KeyboardEvent.__proto__ || Object.getPrototypeOf(KeyboardEvent)).call(this, type, bubbles, cancelable));

    _this.key = key;
    return _this;
  }

  return KeyboardEvent;
}(_BaseEvent3.default
/** @lends event.MouseEvent# */
);

exports.default = KeyboardEvent;

},{"./BaseEvent":16}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MouseEvent = function (_BaseEvent) {
  _inherits(MouseEvent, _BaseEvent);

  /** The x coordinate of the MouseEvent.
   * @type Integer
   */
  // x: null,
  /** The y coordinate of the MouseEvent.
   * @type Integer
   */
  // y: null,
  /** The object upon which the mouse is displayed.
   * @type display.DisplayObject
   */
  // displayObject: null,

  /**
   * Constructs a MouseEvent instance.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} type The type of event.
   * @param {Boolean} bubbles Indicates a bubbling event.
   * @param {Boolean} cancelable Indicates whether the event action can be terminated.
   * @param {Number} x The x coordinate of the MouseEvent.
   * @param {Number} y The y coordinate of the MouseEvent.
   * @param {display.DisplayObject} displayObject The object upon which the mouse is displayed.
   * @param
   */

  function MouseEvent(type, bubbles, cancelable, x, y, displayObject) {
    _classCallCheck(this, MouseEvent);

    var _this = _possibleConstructorReturn(this, (MouseEvent.__proto__ || Object.getPrototypeOf(MouseEvent)).call(this, type, bubbles, cancelable));

    _this.x = x;
    _this.y = y;
    _this.displayObject = displayObject;
    return _this;
  }

  return MouseEvent;
}(_BaseEvent3.default
/** @lends event.MouseEvent# */
);

exports.default = MouseEvent;

},{"./BaseEvent":16}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TouchEvent = function (_BaseEvent) {
  _inherits(TouchEvent, _BaseEvent);

  // x: null,

  // y: null,

  // displayObject: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @constructs
   * @param {String} type
   * @param {Boolean} bubbles
   * @param {Boolean} cancelable
   * @param {Number} x
   * @param {Number} y
   * @param {display.DisplayObject} displayObject
   * @param
   */
  function TouchEvent(type, bubbles, cancelable, x, y, displayObject) {
    _classCallCheck(this, TouchEvent);

    var _this = _possibleConstructorReturn(this, (TouchEvent.__proto__ || Object.getPrototypeOf(TouchEvent)).call(this, type, bubbles, cancelable));

    _this.x = x;
    _this.y = y;
    _this.displayObject = displayObject;
    return _this;
  }

  return TouchEvent;
}(_BaseEvent3.default
/** @lends event.MouseEvent# */
);

exports.default = TouchEvent;

},{"./BaseEvent":16}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  KEY_A: 'A',
  KEY_B: 'B',
  KEY_C: 'C',
  KEY_D: 'D',
  KEY_E: 'E',
  KEY_F: 'F',
  KEY_G: 'G',
  KEY_H: 'H',
  KEY_I: 'I',
  KEY_J: 'J',
  KEY_K: 'K',
  KEY_L: 'L',
  KEY_M: 'M',
  KEY_N: 'N',
  KEY_O: 'O',
  KEY_P: 'P',
  KEY_Q: 'Q',
  KEY_R: 'R',
  KEY_S: 'S',
  KEY_T: 'T',
  KEY_U: 'U',
  KEY_V: 'V',
  KEY_W: 'W',
  KEY_X: 'X',
  KEY_Y: 'Y',
  KEY_Z: 'Z',

  KEY_0: 0,
  KEY_1: 1,
  KEY_2: 2,
  KEY_3: 3,
  KEY_4: 4,
  KEY_5: 5,
  KEY_6: 6,
  KEY_7: 7,
  KEY_8: 8,
  KEY_9: 9,

  KEY_UP: 10,
  KEY_RIGHT: 11,
  KEY_DOWN: 12,
  KEY_LEFT: 13,

  KEY_SPACE: ' '

};

},{}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color
/** @lends graphics.Color# */
= function () {

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
  function Color(mode, v1, v2, v3, a) {
    _classCallCheck(this, Color);

    this.type = Color.TYPE;
    this.setColor(mode, v1, v2, v3, a);
  }

  // Public Methods -->

  _createClass(Color, [{
    key: "setColor",
    value: function setColor(mode, v1, v2, v3, a) {
      this.mode = mode;
      this.a = a != undefined ? a : 1.0;
      if (mode == Color.RGB) {
        this.r = v1;
        this.g = v2;
        this.b = v3;
      } else if (mode == Color.HSL) {
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
  }, {
    key: "getAsArray",
    value: function getAsArray(mode) {
      if (mode == Color.RGB) {
        return [this.r, this.g, this.b, this.a];
      } else if (mode == Color.HSL) {
        return [this.h, this.s, this.l, this.a];
      } else {
        throw new Error("Color: unrecognized color mode.");
      }
    }
  }, {
    key: "getAsString",
    value: function getAsString(mode, spacer) {
      spacer = spacer == undefined ? "," : spacer;
      return this.getAsArray(mode).join(spacer);
    }

    // <-- Public Methods


  }]);

  return Color;
}();

exports.default = Color;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pattern
/** @lends graphics.Pattern# */
= function () {
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
  function Pattern(sprite, repeat) {
    _classCallCheck(this, Pattern);

    if (repeat == undefined) repeat = Pattern.REPEAT;

    this.repeat = repeat;
    this.type = Pattern.TYPE;
    this.sprite = sprite;
  }

  _createClass(Pattern, [{
    key: "hasPattern",
    value: function hasPattern() {
      return this.pattern != null;
    }
  }, {
    key: "setPattern",
    value: function setPattern(pattern) {
      this.pattern = pattern;
    }
  }, {
    key: "getPattern",
    value: function getPattern() {
      return this.pattern;
    }
  }]);

  return Pattern;
}();

exports.default = Pattern;

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CanvasScene = require('minibot/display/html/CanvasScene');

var _CanvasScene2 = _interopRequireDefault(_CanvasScene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

var userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
var isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgent.substr(0, 4));

function decorate(object, traits) {
  for (var accessor in traits) {
    object[accessor] = traits[accessor];
  }
  return object;
}

var system = {};

system.onUpdate = null;

system.onRender = null;

system.lastTime = null;

system.isRunning = false;

system.isRendering = false;

system.animationFrameId = null;

system.handleAnimationFrame = function (time) {
  if (!system.isRunning) return;
  if (system.isRendering) return;
  system.isRendering = true;
  system.animationFrameId = window.requestAnimationFrame(system.handleAnimationFrame.bind(this));
  var dt = 0;
  if (system.lastTime != null) dt = time - system.lastTime;
  if (system.onUpdate != null) system.onUpdate(dt);
  if (system.onRender != null) system.onRender(dt);
  system.lastTime = time;
  system.isRendering = false;
};

// --> Public System Methods

system.SetUpdateCallback = function (f) {
  system.onUpdate = f;
};

system.SetRenderCallback = function (f) {
  system.onRender = f;
};

system.Run = function () {
  // We can't run the system twice!
  if (system.isRunning) return;

  system.isRunning = true;
  system.animationFrameId = window.requestAnimationFrame(system.handleAnimationFrame.bind(system));
};

system.Stop = function () {
  // We can't stop the system if it isn't running
  if (!system.isRunning) return;

  window.cancelAnimationFrame(system.animationFrameId);
  system.isRunning = false;
};

system.CreateScene = function (options) {
  var scene = new _CanvasScene2.default(options);
  return scene;
};

// Browser | Native
system.GetWrapperType = function () {
  //
  return system.WrapperType.BROWSER;
};

// Safari | Firefox | Chrome | Explorer | Opera | Other
system.GetBrowserType = function () {
  //

};

// Desktop | Mobile
system.GetPlatformType = function () {
  if (isMobile) {
    return system.PlatformType.MOBILE;
  } else {
    return system.PlatformType.DESKTOP;
  }
};

// Desktop Values = OSX | Windows | Linux
// Mobile Values = iOS | Android
// Unknown Values = Other
system.GetPlatformName = function () {
  var name = system.PlatformName.OTHER;

  if (isMobile) {
    // Detect iOS
    if (/(ipad|iphone|ipod)/g.test(userAgent)) {
      name = system.PlatformName.IOS;
    } else if (/(android)/g.test(userAgent)) {
      name = system.PlatformName.ANDROID;
    }
  } else {}

  return name;
};

// <-- Public System Methods

system.WrapperType = {
  BROWSER: "Browser",
  NATIVE: "Native"
};

system.BrowserType = {
  SAFARI: "Safari",
  FIREFOX: "Firefox",
  CHROME: "Chrome",
  EXPLORER: "Explorer",
  OPERA: "Opera"
};

system.PlatformType = {
  DESKTOP: "Desktop",
  MOBILE: "Mobile"
};

system.PlatformName = {
  OSX: "OSX",
  WINDOWS: "Windows",
  LINUX: "Linux",
  ANDROID: "Android",
  IOS: "iOS",
  OTHER: "Other"
};

exports.default = system;

},{"minibot/display/html/CanvasScene":4}],"minibot":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var core, display, engine, event, geom, graphics, resource, system;

/** @namespace Core namespace */
exports.core = core = {};
core.Manager = require('minibot/core/Manager').default;

/** @namespace Display namespace */
exports.display = display = {};
display.DisplayObject = require('minibot/display/DisplayObject').default;

/** @namespace Display.Scene namespace */
display.scene = {};
display.scene.SceneDisplayObject = require('minibot/display/scene/SceneDisplayObject').default;
display.scene.Animation = require('minibot/display/scene/Animation').default;
display.scene.Button = require('minibot/display/scene/Button').default;
display.scene.Container = require('minibot/display/scene/Container').default;
//display.scene.Mask = require('minibot/display/scene/Mask').default;
display.scene.Rect = require('minibot/display/scene/Rect').default;
//display.scene.RoundedRect = require('minibot/display/scene/RoundedRect').default;
display.scene.Sprite = require('minibot/display/scene/Sprite').default;
display.scene.Scene = require('minibot/display/scene/Scene').default;
display.scene.Text = require('minibot/display/scene/Text').default;
display.scene.TextStyle = require('minibot/display/scene/TextStyle').default;

/** @namespace Display.Html namespace */
display.html = {};
display.html.HtmlElement = require('minibot/display/html/HtmlElement').default;
display.html.CanvasScene = require('minibot/display/html/CanvasScene').default;

// /** @namespace Engine namespace */
// engine = {};
// engine.Engine = require('minibot/engine/Engine').default;
// engine.EngineComponent = require('minibot/engine/EngineComponent').default;
// engine.EngineFactory = require('minibot/engine/EngineFactory').default;
// engine.EngineObject = require('minibot/engine/EngineObject').default;
// engine.EngineSystem = require('minibot/engine/EngineSystem').default;

// engine.component = {};
// engine.component.DisplayComponent = require('minibot/engine/component/DisplayComponent').default;
// engine.component.PhysicsComponent = require('minibot/engine/component/PhysicsComponent').default;
// engine.component.InputComponent = require('minibot/engine/component/InputComponent').default;

// engine.system = {};
// engine.system.DisplaySystem = require('minibot/engine/system/DisplaySystem').default;

/** @namespace Event namespace */
exports.event = event = {};
event.EventDispatcher = require('minibot/event/EventDispatcher').default;
event.BaseEvent = require('minibot/event/BaseEvent').default;
event.MouseEvent = require('minibot/event/MouseEvent').default;
event.TouchEvent = require('minibot/event/TouchEvent').default;
event.ButtonEvent = require('minibot/event/ButtonEvent').default;
event.EngineEvent = require('minibot/event/EngineEvent').default;
event.KeyboardEvent = require('minibot/event/KeyboardEvent').default;

event.enum = {};
event.enum.Keyboard = require('minibot/event/enum/Keyboard').default;

// /** @namespace Geom namespace */
// geom = {};
// geom.Vector2 = require('minibot/geom/Vector2').default;
// geom.Rectangle = require('minibot/geom/Rectangle').default;

// /** @namespace Graphics namespace */
// graphics = {};
// graphics.Color = require('minibot/graphics/Color').default;
// graphics.Pattern = require('minibot/graphics/Pattern').default;

// /** @namespace Resource namespace */
// resource = {};
// resource.Resource = require('minibot/resource/Resource').default;
// resource.ResourceManager = require('minibot/resource/ResourceManager').default;
// resource.AnimationResource = require('minibot/resource/AnimationResource').default;
// resource.ImageResource = require('minibot/resource/ImageResource').default;
// resource.SpriteResource = require('minibot/resource/SpriteResource').default;

/** @namespace System namespace */
exports.system = system = require('minibot/system/web').default;

exports.core = core;
exports.display = display;
exports.engine = engine;
exports.event = event;
exports.geom = geom;
exports.graphics = graphics;
exports.resource = resource;
exports.system = system;

},{"minibot/core/Manager":1,"minibot/display/DisplayObject":2,"minibot/display/html/CanvasScene":4,"minibot/display/html/HtmlElement":5,"minibot/display/scene/Animation":6,"minibot/display/scene/Button":8,"minibot/display/scene/Container":9,"minibot/display/scene/Rect":10,"minibot/display/scene/Scene":11,"minibot/display/scene/SceneDisplayObject":12,"minibot/display/scene/Sprite":13,"minibot/display/scene/Text":14,"minibot/display/scene/TextStyle":15,"minibot/event/BaseEvent":16,"minibot/event/ButtonEvent":17,"minibot/event/EngineEvent":18,"minibot/event/EventDispatcher":19,"minibot/event/KeyboardEvent":21,"minibot/event/MouseEvent":22,"minibot/event/TouchEvent":23,"minibot/event/enum/Keyboard":24,"minibot/system/web":27}]},{},[]);
