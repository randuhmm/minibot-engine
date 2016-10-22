
var core, display, engine, event, geom, graphics, resource, system;

/** @namespace Core namespace */
core = {};
core.Manager = require('minibot/core/Manager').default;

/** @namespace Display namespace */
display = {};
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
event = {};
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
system = require('minibot/system/web').default;

export {
  core,
  display,
  engine,
  event,
  geom,
  graphics,
  resource,
  system
};
