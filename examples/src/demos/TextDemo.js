
import BaseDemo from './BaseDemo';
var minibot = require('minibot');
var Text = minibot.display.scene.Text
, TextStyle = minibot.display.scene.TextStyle
, Color = minibot.graphics.Color
;

var Demo = function(element) {
  BaseDemo.call(this, element);

  this.index = 0;

  this.stringArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  this.textStyle = new TextStyle("monospace", 19, new Color(Color.RGB, 255, 0, 0), "left");

  this.text = new Text(this.stringArray.join(""), this.textStyle);
  this.text.x = 100;
  this.text.y = 100;

  this.scene.addChild(this.text);

  this.run();
};

Demo.prototype = Object.create(BaseDemo.prototype);
Demo.prototype.constructor = Demo;

Demo.prototype.render = function(dt) {
  this.scene.clear();

  //var pos = Math.floor(Math.random() * this.stringArray.length);
  var pos = this.index;
  this.stringArray[pos] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  this.text.setText(this.stringArray.join(""));
  this.scene.render();
  this.index = (this.index + 1) % this.stringArray.length;
}

export default Demo;

