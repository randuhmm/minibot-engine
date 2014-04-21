
define(function(require) {
	
	/** @namespace Namespace description. */
	var minibot = {};
	
	var core, display, engine, event, geom, graphics, resource, system;
	
	//minibot.utils = require('minibot/utils');
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
	display.scene.Animation = require('minibot/display/scene/Animation');
	display.scene.Button = require('minibot/display/scene/Button');
	display.scene.Container = require('minibot/display/scene/Container');
	//display.scene.Mask = require('minibot/display/scene/Mask');
	display.scene.Rect = require('minibot/display/scene/Rect');
	//display.scene.RoundedRect = require('minibot/display/scene/RoundedRect');
	display.scene.Sprite = require('minibot/display/scene/Sprite');
	display.scene.Scene = require('minibot/display/scene/Scene');
	display.scene.Text = require('minibot/display/scene/Text');
	display.scene.TextStyle = require('minibot/display/scene/TextStyle');
	
	/** @namespace Display.Html namespace */
	display.html = {};
	display.html.HtmlElement = require('minibot/display/html/HtmlElement');
	display.html.CanvasScene = require('minibot/display/html/CanvasScene');
	
	/** @namespace Engine namespace */
	engine = {};
	engine.Engine = require('minibot/engine/Engine');
	engine.EngineComponent = require('minibot/engine/EngineComponent');
	engine.EngineFactory = require('minibot/engine/EngineFactory');
	engine.EngineObject = require('minibot/engine/EngineObject');
	engine.EngineSystem = require('minibot/engine/EngineSystem');
	
	engine.component = {};
	engine.component.DisplayComponent = require('minibot/engine/component/DisplayComponent');
	engine.component.PhysicsComponent = require('minibot/engine/component/PhysicsComponent');
	engine.component.InputComponent = require('minibot/engine/component/InputComponent');
	
	engine.system = {};
	engine.system.DisplaySystem = require('minibot/engine/system/DisplaySystem');
	
	/** @namespace Event namespace */
	event = {};
	event.EventDispatcher = require('minibot/event/EventDispatcher');
	event.BaseEvent = require('minibot/event/BaseEvent');
	event.MouseEvent = require('minibot/event/MouseEvent');
	event.TouchEvent = require('minibot/event/TouchEvent');
	event.ButtonEvent = require('minibot/event/ButtonEvent');
	event.EngineEvent = require('minibot/event/EngineEvent');
	event.KeyboardEvent = require('minibot/event/KeyboardEvent');
	
	event.enum = {};
	event.enum.Keyboard = require('minibot/event/enum/Keyboard');
	
	/** @namespace Geom namespace */
	geom = {};
	geom.Vector2 = require('minibot/geom/Vector2');
	geom.Rectangle = require('minibot/geom/Rectangle');
	
	/** @namespace Graphics namespace */
	graphics = {};
	graphics.Color = require('minibot/graphics/Color');
	graphics.Pattern = require('minibot/graphics/Pattern');
	
	/** @namespace Resource namespace */
	resource = {};
	resource.Resource = require('minibot/resource/Resource');
	resource.ResourceManager = require('minibot/resource/ResourceManager');
	resource.AnimationResource = require('minibot/resource/AnimationResource');
	resource.ImageResource = require('minibot/resource/ImageResource');
	resource.SpriteResource = require('minibot/resource/SpriteResource');
	
	/** @namespace System namespace */
	system = {};
	system = require('minibot/system');
	
	minibot.core = core;
	minibot.display = display;
	minibot.engine = engine;
	minibot.event = event;
	minibot.geom = geom;
	minibot.graphics = graphics;
	minibot.resource = resource;
	minibot.system = system;
	
	return minibot;

});
