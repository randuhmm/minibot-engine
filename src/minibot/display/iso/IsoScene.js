

class IsoScene extends DisplayObject
/** @lends display.scene.SceneDisplayObject# */
{
  
  // x: 0,
  
  // y: 0,
  
  // w: 0,
  
  // h: 0,
  
  // root: null,
  
  // scene: null,
  
  // isVisible: true,
  
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
    $super();
  }
  
  render(dt, x, y)
  {
    // This function must be overloaded in the sub class
  }
  
  onAddedToScene()
  {
    // This callback is triggered when a scene object is added to a scene
  }
  
  onRemovedFromScene()
  {
    // This callback is triggered when a scene object is removed from a scene
  }
  
  getSceneX()
  {
    var sceneX = 0;
    if(this.parent != null) {
      sceneX += this.parent.getSceneX();
    }
    sceneX += this.x;
    return sceneX;
  }
  
  getSceneY()
  {
    var sceneY = 0;
    if(this.parent != null) {
      sceneY += this.parent.getSceneY();
    }
    sceneY += this.y;
    return sceneY;
  }
  
  setRoot(root)
  {
    this.root = root;
  }
  
  setScene(scene)
  {
    this.scene = scene;
  }
  
  setWidth(width)
  {
    this.w = width;
  }
  
  setHeight(height)
  {
    this.h = height;
  }
  
  hide()
  {
    this.isVisible = false;
  }
  
  show()
  {
    this.isVisible = true;
  }
  
}

export default IsoScene


