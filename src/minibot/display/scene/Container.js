
import SceneDisplayObject from './SceneDisplayObject';

class Container extends SceneDisplayObject
/** @lends display.scene.Container# */
{

  /** Appends a child to the container.
   * @param {display.DisplayObject} displayObject The display object to be added.
   * @param {Number} layer The layer to be added.
   * @param {Number} The position of the layer.
   */
  constructor()
  {
    super();

    /** Array containing the Container layers
     * @type Array
     */
    this.layers = new Array();
    /** Boolean indicating touch events attached.
     * @type boolean
     */
    this.touchChildren = true;
    /** Indicates whether or not the container is able to be resized.
     * @type boolean
     */
    this.resizable = true;

    this.scalable = true;

    this.scale = 1;
  }

  addChild(displayObject, layer, position)
  {
    if(layer == undefined) layer = 0;
    while(this.layers.length <= layer) this.layers.push(new Array());
    if(position == undefined) position = this.layers[layer].length;

    //this.layers[layer].push(displayObject);
    this.layers[layer].splice(position, 0, displayObject);

    if(this.scalable && this.scale != 1) {
      displayObject.w *= this.scale;
      displayObject.h *= this.scale;
      displayObject.x *= this.scale;
      displayObject.y *= this.scale;
    }

    if(this.root != null) {
      displayObject.root = this.root;
      displayObject.scene = this.scene;
      displayObject.parent = this;
      displayObject.onAddedToScene();
    }

    if(this.resizable) {
      // Expand the container object dimensions to hold the object
      if(this.w < (displayObject.x + displayObject.w)) this.w = displayObject.x + displayObject.w;
      if(this.h < (displayObject.y + displayObject.h)) this.h = displayObject.y + displayObject.h;
    }
  }
  /** Removes a child from the container.
   * @param {display.DisplayObject} displayObject The object to be removed.
   */
  removeChild(displayObject)
  {
    for(var l = 0; l < this.layers.length; l++) {
      var layer = this.layers[l];
      for(var d = 0; d < layer.length; d++) {
        if(displayObject === layer[d]) {
          layer.splice(d, 1);
          displayObject.onRemovedFromScene();
          return;
        }
      }
    }
  }
  /** Removes all children from the container. */
  removeAll()
  {
    var layers = this.layers;
    var displayObject;
    for(var l = 0; l < layers.length; l++) {
      var layer = layers[l];
      for(var d = 0; d < layer.length; d++) {
        displayObject = layer[d]
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
  render(dt, x, y)
  {
    if(this.scene == null) return;
    if(x == undefined) x = 0;
    if(y == undefined) y = 0;

    var  l,
      d,
      layer,
      displayObject,
      xBounds,
      yBounds;

    for(l = 0; l < this.layers.length; l++) {
      layer = this.layers[l];
      for(d = 0; d < layer.length; d++) {
        displayObject = layer[d];

        // check if the display object is visible
        if(!displayObject.isVisible) continue;

        // check if the display object is outside the scene
        xBounds = this.x + x + displayObject.x;
        yBounds = this.y + y + displayObject.y;
        if(
          xBounds >= this.root.w ||
          xBounds < -1 * displayObject.w ||
          yBounds >= this.root.h ||
          yBounds < -1 * displayObject.h
        ) continue;

        // render the display object
        displayObject.render(dt, this.x + x, this.y + y);
      }
    }
  }
  /** Sets the child objects index within the layers.
   * @param {display.DisplayObject} displayObject The display object to be modified.
   * @param {Number} index The specified index to be set.
   */
  setChildIndex(displayObject, index)
  {
    for(var l = 0; l < this.layers.length; l++) {
      var layer = this.layers[l];
      for(var d = 0; d < layer.length; d++) {
        if(displayObject === layer[d]) {

          if(index >= layer.length) return;

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
  dispatchEvent(event)
  {
    /*
    if(event.isTouchEvent()) {
      if(!this.touchEnabled) return false;
      if(!this.touchChildren) return super(event);
    }
    */

    var captured = false;
    var dispatched = false;

    var l,
      d,
      layer,
      displayObject;

    if(('x' in event) && ('y' in event)) {
      event.x -= this.x;
      event.y -= this.y;
      for(l = (this.layers.length - 1); l >= 0; l--) {
        layer = this.layers[l];
        for(d = (layer.length - 1); d >= 0; d--) {
          displayObject = layer[d];

          // skip if the object is invisible
          if(!displayObject.isVisible) continue;

          if(
            event.x >= displayObject.x &&
            event.x <= (displayObject.x + displayObject.w) &&
            event.y >= displayObject.y &&
            event.y <= (displayObject.y + displayObject.h)
          ) {
            dispatched = displayObject.dispatchEvent(event);
            captured = true;
          }
          if(captured) break;
        }
        if(captured) break;
      }
    }

    if(!dispatched) {
      if(('x' in event) && ('y' in event)) {
        event.x += this.x;
        event.y += this.y;
      }
      return super.dispatchEvent(event);
    } else {
      return true;
    }
  }
  /** Actions to be carried out upon being attached to a scene.
   * @param {}
   */
  onAddedToScene()
  {
    super.onAddedToScene();

    var l,
      d,
      layer,
      displayObject;

    for(l = 0; l < this.layers.length; l++) {
      layer = this.layers[l];
      for(d = 0; d < layer.length; d++) {
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
  onRemovedFromScene()
  {
    super.onRemovedFromScene();
    for(var l = 0; l < this.layers.length; l++) {
      var layer = this.layers[l];
      for(var d = 0; d < layer.length; d++) {
        layer[d].onRemovedFromScene();
      }
      this.layers[l] = null;
    }
    this.layers = new Array();
  }

  // Updated this function to scale internal components if it is scalable
  setScale(scale)
  {
    if(!this.scalable) return;

    var s = scale / this.scale;
    var d, l, layer, displayObject;

    for(l = 0; l < this.layers.length; l++) {
      layer = this.layers[l];
      for(d = 0; d < layer.length; d++) {
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
}

export default Container


