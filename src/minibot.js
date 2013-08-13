
define(function(require) {
	
	/** @namespace Namespace description. */
	var minibot = {};
	
	var core, display, event, geom, resource;
	
	minibot.utils = require('minibot/utils');
	minibot.system = require('minibot/system');
	
	/** @namespace Core namespace */
	core = {};
	core.Manager = require('minibot/core/Manager');
	
	/** @namespace Display namespace */
	display = {};
	display.DisplayObject = require('minibot/display/DisplayObject');
	
	/** @namespace Display.Scene namespace */
	display.scene = {};
	display.scene.SceneDisplayObject = require('minibot/display/scene/SceneDisplayObject');
	//display.scene.Animation = require('minibot/display/scene/Animation');
	display.scene.Button = require('minibot/display/scene/Button');
	display.scene.Container = require('minibot/display/scene/Container');
	//display.scene.Mask = require('minibot/display/scene/Mask');
	//display.scene.Rect = require('minibot/display/scene/Rect');
	//display.scene.RoundedRect = require('minibot/display/scene/RoundedRect');
	display.scene.Sprite = require('minibot/display/scene/Sprite');
	//display.scene.Text = require('minibot/display/scene/Text');
	
	/** @namespace Display.Html namespace */
	display.html = {};
	display.html.HtmlElement = require('minibot/display/html/HtmlElement');
	display.html.CanvasScene = require('minibot/display/html/CanvasScene');
	
	/** @namespace Event namespace */
	event = {};
	event.EventDispatcher = require('minibot/event/EventDispatcher');
	event.BaseEvent = require('minibot/event/BaseEvent');
	event.MouseEvent = require('minibot/event/MouseEvent');
	
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
