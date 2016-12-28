
import BaseDemo from './BaseDemo';
import minibot from 'minibot';
var Button = minibot.display.scene.Button
, Color = minibot.graphics.Color
, Rect = minibot.display.scene.Rect
, Container = minibot.display.scene.Container
, Text = minibot.display.scene.Text
, TextStyle = minibot.display.scene.TextStyle
, BindAsEventListener = minibot.core.Utils.BindAsEventListener
, MouseEvent = minibot.event.MouseEvent
, ButtonEvent = minibot.event.ButtonEvent
;

var CustomButton = function(text)
{

  var style = new TextStyle("monospace", 19, new Color(Color.RGB, 0, 0, 0), "left")

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


var Demo = function(element)
{
  BaseDemo.call(this, element);

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

  button1.addEventListener(
    ButtonEvent.SELECT,
    BindAsEventListener(this.handleButtonClick, this, "Button 1"));
  button2.addEventListener(
    ButtonEvent.SELECT,
    BindAsEventListener(this.handleButtonClick, this, "Button 2"));
  button3.addEventListener(
    ButtonEvent.SELECT,
    BindAsEventListener(this.handleButtonClick, this, "Button 3"));
  button4.addEventListener(
    ButtonEvent.SELECT,
    BindAsEventListener(this.handleButtonClick, this, "Button 4"));

  this.run();
};

Demo.prototype = Object.create(BaseDemo.prototype);
Demo.prototype.constructor = Demo;

Demo.prototype.handleButtonClick = function(event, name)
{
  alert("'" + name + "' was clicked!");
}


Demo.prototype.render = function(dt)
{
  this.scene.clear();
  this.scene.render(dt);
}

export default Demo;

