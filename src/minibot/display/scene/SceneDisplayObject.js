
import DisplayObject from 'minibot/display/DisplayObject';

class SceneDisplayObject extends DisplayObject
/** @lends display.scene.SceneDisplayObject# */
{
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
  constructor()
  {
    super();
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.root = null;
    this.scene = null;
    this.isVisible = true;
  }
  /** Renders the SceneDisplayObject and its components.
   * @param {Number} dt The change in time.
   * @param {Number} x The x position at which the rendering occurs.
   * @param {Number} y The y position at which the rendering occurs.
   */
  render(dt, x, y)
  {
    // This function must be overloaded in the sub class
  }
  /** Actions to be triggered when a scene object is added to a scene.
   *
   */
  onAddedToScene()
  {
    // This callback is triggered when a scene object is added to a scene
  }
  /** Actions to be triggered when a scene object is removed from a scene.
   *
   */
  onRemovedFromScene()
  {
    // This callback is triggered when a scene object is removed from a scene
  }
  /** Retrieves the scene's X field.
   * @returns display.scene
   */
  getScene()
  {
    return this.scene;
  }
  /** Retrieves the scene object's width.
   * @returns display.scene
   */
  getWidth()
  {
    return this.w;
  }
  /** Retrieves the scene object's height.
   * @returns display.scene
   */
  getHeight()
  {
    return this.h;
  }
  /** Retrieves the scene's X field.
   * @returns display.scene
   */
  getSceneX()
  {
    var sceneX = 0;
    if(this.parent != null) {
      sceneX += this.parent.getSceneX();
    }
    sceneX += this.x;
    return sceneX;
  }
  /** Retrieves the scene's Y field.
   * @returns display.scene
   */
  getSceneY()
  {
    var sceneY = 0;
    if(this.parent != null) {
      sceneY += this.parent.getSceneY();
    }
    sceneY += this.y;
    return sceneY;
  }
  /** Sets a root directory.
   * @param {String} root The root specified.
   */
  setRoot(root)
  {
    this.root = root;
  }
  /** Chooses the current scene.
   * @param {display.scene} scene The scene to be set.
   */
  setScene(scene)
  {
    this.scene = scene;
  }
  /** Sets the sceneDisplayObject's width.
   * @param {Number} width The specified width.
   */
  setWidth(width)
  {
    this.w = width;
  }
  /** Sets the sceneDisplayObject's height.
   * @param {Number} height The specified height.
   */
  setHeight(height)
  {
    this.h = height;
  }
  /** Sets the sceneDisplayObject to be invisible. */
  hide()
  {
    this.isVisible = false;
  }
  /** Sets the sceneDisplayObject to be visible. */
  show()
  {
    this.isVisible = true;
  }

  setAlign(align, objects, recursive)
  {
    if(!(objects instanceof Array)) objects = [ objects ];
    if(recursive == undefined) recursive = false;

    var object, t, o;
    switch(align) {
      case DisplayObject.ALIGN_HORZ_CENTER:
        var t = this.getSceneX() + (this.getWidth()/2);
        for(var i = 0; i < objects.length; i++) {
          object = objects[i];
          o = object.getSceneX() + (object.getWidth()/2);
          object.x += t - o;
        }
        break;
      case DisplayObject.ALIGN_VERT_CENTER:
        var t = this.getSceneY() + (this.getHeight()/2);
        for(var i = 0; i < objects.length; i++) {
          object = objects[i];
          o = object.getSceneY() + (object.getHeight()/2);
          object.y += t - o;
        }
        break
    }
  }

}

export default SceneDisplayObject


