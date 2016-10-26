(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var minibot = require('minibot');
var CanvasScene = minibot.display.html.CanvasScene;
var Bind = minibot.core.Utils.Bind;

var BaseDemo = function BaseDemo(element, options) {
  if (options === null || options === undefined) {
    options = {};
  }
  this.element = element;
  this.canvasElement = document.createElement('canvas');
  this.canvasElement.setAttribute('width', '640');
  this.canvasElement.setAttribute('height', '320');
  this.canvasElement.innerHTML = '<p>' + '<b>Error:</b> You are using a browser that does not support the <i>&lt;canvas&gt;</i> tag.' + 'Please view this page using a browser that supports this feature. Thanks!' + '</p>';
  options['element'] = this.canvasElement;
  this.scene = new CanvasScene(options);
  this.element.appendChild(this.canvasElement);
};

BaseDemo.prototype.run = function () {
  minibot.system.SetUpdateCallback(Bind(this.update, this));
  minibot.system.SetRenderCallback(Bind(this.render, this));
  minibot.system.Run();
};

BaseDemo.prototype.destroy = function () {
  this.canvasElement.remove();
  minibot.system.Stop();
  minibot.system.SetRenderCallback(null);
};

BaseDemo.prototype.update = function (dt) {
  // Override in subclass
};

BaseDemo.prototype.render = function (dt) {
  // Override in subclass
};

exports.default = BaseDemo;

},{"minibot":"minibot"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseDemo = require('./BaseDemo');

var _BaseDemo2 = _interopRequireDefault(_BaseDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minibot = require('minibot');
var Button = minibot.display.scene.Button,
    Color = minibot.graphics.Color,
    Rect = minibot.display.scene.Rect,
    Container = minibot.display.scene.Container,
    Text = minibot.display.scene.Text,
    TextStyle = minibot.display.scene.TextStyle,
    BindAsEventListener = minibot.core.Utils.BindAsEventListener,
    MouseEvent = minibot.event.MouseEvent,
    ButtonEvent = minibot.event.ButtonEvent;

var CustomButton = function CustomButton(text) {

  var style = new TextStyle("monospace", 19, new Color(Color.RGB, 0, 0, 0), "left");

  var upText = new Text(text + " - Up", style);
  upText.x = 30;
  upText.y = 30;
  var overText = new Text(text + " - Over", style);
  overText.x = 30;
  overText.y = 30;
  var downText = new Text(text + " - Down", style);
  downText.x = 30;
  downText.y = 30;

  var upRect = new Rect(280, 40, "", Color.FromHex("#990000"));
  var overRect = new Rect(280, 40, "", Color.FromHex("#CC0000"));
  var downRect = new Rect(280, 40, "", Color.FromHex("#0000CC"));

  var upContainer = new Container();
  upContainer.addChild(upRect);
  upContainer.addChild(upText);

  var overContainer = new Container();
  overContainer.addChild(overRect);
  overContainer.addChild(overText);

  var downContainer = new Container();
  downContainer.addChild(downRect);
  downContainer.addChild(downText);

  Button.call(this, upContainer, downContainer, overContainer);
};

CustomButton.prototype = Object.create(Button.prototype);
CustomButton.prototype.constructor = CustomButton;

var Demo = function Demo(element) {
  _BaseDemo2.default.call(this, element);

  var button1 = new CustomButton("Button 1");
  button1.x = 80;
  button1.y = 40;

  var button2 = new CustomButton("Button 2");
  button2.x = 100;
  button2.y = 200;

  var button3 = new CustomButton("Button 3");
  button3.x = 200;
  button3.y = 140;

  var button4 = new CustomButton("Button 4");
  button4.x = 240;
  button4.y = 160;

  this.scene.addChild(button1);
  this.scene.addChild(button2);
  this.scene.addChild(button3);
  this.scene.addChild(button4);

  button1.addEventListener(ButtonEvent.SELECT, BindAsEventListener(this.handleButtonClick, this, "Button 1"));
  button2.addEventListener(ButtonEvent.SELECT, BindAsEventListener(this.handleButtonClick, this, "Button 2"));
  button3.addEventListener(ButtonEvent.SELECT, BindAsEventListener(this.handleButtonClick, this, "Button 3"));
  button4.addEventListener(ButtonEvent.SELECT, BindAsEventListener(this.handleButtonClick, this, "Button 4"));

  this.run();
};

Demo.prototype = Object.create(_BaseDemo2.default.prototype);
Demo.prototype.constructor = Demo;

Demo.prototype.handleButtonClick = function (event, name) {
  alert("'" + name + "' was clicked!");
};

Demo.prototype.render = function (dt) {
  this.scene.clear();
  this.scene.render(dt);
};

exports.default = Demo;

},{"./BaseDemo":1,"minibot":"minibot"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseDemo = require('./BaseDemo');

var _BaseDemo2 = _interopRequireDefault(_BaseDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minibot = require('minibot');
var CanvasScene = minibot.display.html.CanvasScene,
    Color = minibot.graphics.Color,
    Vector2 = minibot.geom.Vector2;

var Demo = function Demo(element) {
  _BaseDemo2.default.call(this, element);
  this.color = new Color(Color.HSL, 255, 128, 128);

  this.mul = 1.0;
  this.mul_dir = 1;

  this.line = new Vector2(100, 0);
  this.angle = 0;

  this.run();
};

Demo.prototype = Object.create(_BaseDemo2.default.prototype);
Demo.prototype.constructor = Demo;

Demo.prototype.render = function (dt) {
  this.scene.clear();

  this.mul += this.mul_dir * Demo.MUL_SPEED * dt;
  if (this.mul >= 2) {
    this.mul = 2;
    this.mul_dir *= -1;
  }
  if (this.mul <= 1) {
    this.mul = 1;
    this.mul_dir *= -1;
  }

  var hsl = this.color.getAsArray(Color.HSL);
  this.color.setColor(Color.HSL, (hsl[0] + dt * Demo.HUE_SPEED) % 255, hsl[1], hsl[2]);

  var s = 100 * this.mul;

  this.scene.setFillColor(this.color);
  this.scene.drawRect("", 100 + (100 - s) / 2, 100 + (100 - s) / 2, s, s);

  this.line.rotate(Demo.ANGLE_SPEED * dt);
  this.scene.drawLine(400, 150, 400 + this.line.x, 150 + this.line.y);
};

Demo.HUE_SPEED = 32 / 1000;
Demo.MUL_SPEED = 0.5 / 1000;
Demo.ANGLE_SPEED = 90 / 1000;

exports.default = Demo;

},{"./BaseDemo":1,"minibot":"minibot"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseDemo = require('./BaseDemo');

var _BaseDemo2 = _interopRequireDefault(_BaseDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minibot = require('minibot');
var Text = minibot.display.scene.Text,
    TextStyle = minibot.display.scene.TextStyle,
    Color = minibot.graphics.Color;

var Demo = function Demo(element) {
  _BaseDemo2.default.call(this, element);

  this.index = 0;

  this.stringArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  this.textStyle = new TextStyle("monospace", 19, new Color(Color.RGB, 255, 0, 0), "left");

  this.text = new Text(this.stringArray.join(""), this.textStyle);
  this.text.x = 100;
  this.text.y = 100;

  this.scene.addChild(this.text);

  this.run();
};

Demo.prototype = Object.create(_BaseDemo2.default.prototype);
Demo.prototype.constructor = Demo;

Demo.prototype.render = function (dt) {
  this.scene.clear();

  //var pos = Math.floor(Math.random() * this.stringArray.length);
  var pos = this.index;
  this.stringArray[pos] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  this.text.setText(this.stringArray.join(""));
  this.scene.render();
  this.index = (this.index + 1) % this.stringArray.length;
};

exports.default = Demo;

},{"./BaseDemo":1,"minibot":"minibot"}],5:[function(require,module,exports){
'use strict';

(function () {

  var main = function main() {

    var demoElement = document.getElementById('demoScene');
    var currentDemo = null;
    var demoMap = {
      'demo.01.graphics': require('./demos/GraphicsDemo').default,
      'demo.02.text': require('./demos/TextDemo').default,
      'demo.03.events': require('./demos/EventsDemo').default
    };

    var handleButtonClick = function handleButtonClick(event) {

      // destruct current demo if it exists
      if (currentDemo != null) {
        currentDemo.destroy();
        currentDemo = null;
      }

      var id = event.target.id;
      if (id in demoMap) {
        // Create the new demo
        currentDemo = new demoMap[id](demoElement);
      }
    };

    var buttons = document.getElementById('demoButtons').children;
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (event) {
        handleButtonClick.call(this, event);
      });
    }
  };

  window.onload = main;
})();

},{"./demos/EventsDemo":2,"./demos/GraphicsDemo":3,"./demos/TextDemo":4}]},{},[5]);
