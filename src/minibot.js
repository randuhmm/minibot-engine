
define(function(require) {
	
	/** @namespace Namespace description. */
	var minibot = {};
	
	var core, display, event, geom, resource;
	
	minibot.utils = require('minibot/utils');
	
	/** @namespace Core namespace */
	core = {};
	core.Manager = require('minibot/core/Manager');
	
	/** @namespace Display namespace */
	display = {};
	display.DisplayObject = require('minibot/display/DisplayObject');
	
	/** @namespace Display.Canvas namespace */
	display.canvas = {};
	display.canvas.CanvasDisplayObject = require('minibot/display/canvas/CanvasDisplayObject');
	display.canvas.Animation = require('minibot/display/canvas/Animation');
	display.canvas.Button = require('minibot/display/canvas/Button');
	display.canvas.Container = require('minibot/display/canvas/Container');
	display.canvas.Mask = require('minibot/display/canvas/Mask');
	display.canvas.Rect = require('minibot/display/canvas/Rect');
	display.canvas.RoundedRect = require('minibot/display/canvas/RoundedRect');
	display.canvas.Sprite = require('minibot/display/canvas/Sprite');
	display.canvas.Text = require('minibot/display/canvas/Text');
	display.canvas.TextInput = require('minibot/display/canvas/TextInput');
	
	/** @namespace Display.Html namespace */
	display.html = {};
	display.html.HtmlElement = require('minibot/display/html/HtmlElement');
	display.html.Canvas = require('minibot/display/html/Canvas');
	//display.html.Container = require('minibot/display/html/Container');
	
	/** @namespace Event namespace */
	event = {};
	event.EventDispatcher = require('minibot/event/EventDispatcher');
	event.BaseEvent = require('minibot/event/BaseEvent');
	event.UIEvent = require('minibot/event/UIEvent');
	
	/** @namespace Geom namespace */
	geom = {};
	geom.Vector2 = require('minibot/geom/Vector2');
	
	/** @namespace Resource namespace */
	resource = {};
	resource.Resource = require('minibot/resource/Resource');
	resource.ResourceManager = require('minibot/resource/ResourceManager');
	resource.AnimationResource = require('minibot/resource/AnimationResource');
	resource.ImageResource = require('minibot/resource/ImageResource');
	resource.SpriteResource = require('minibot/resource/SpriteResource');
	
	minibot.core = core;
	minibot.display = display;
	minibot.event = event;
	minibot.geom = geom;
	minibot.resource = resource;
	
	return minibot;

});
