
import SceneDisplayObject from './SceneDisplayObject';
import MouseEvent from 'minibot/event/MouseEvent';
import TouchEvent from 'minibot/event/TouchEvent';
import ButtonEvent from 'minibot/event/ButtonEvent';

class Button extends SceneDisplayObject
/** @lends display.scene.Button# */
{

  // upState: null,
  // downState: null,
  // overState: null,
  // currentState: null,

  // states: null,

  // isDown: false,
  // isOver: false,

  // mouseMoveCallback: null,
  // mouseUpCallback: null,

  // touchMoveCallback: null,
  // touchEndCallback: null,

  /**
   * Description of constructor.
   * @class Short description of class.
   * Long Description of class.
   * @extends display.scene.SceneDisplayObject
   * @constructs
   * @param
   * @param {display.DisplayObject} upState The resource to display when the button is "up".
   * @param {display.DisplayObject} downState The resource to display when the button is "down".
   * @param {display.DisplayObject} overState The resource to display when the button is "over".
   */
  constructor(upState, downState, overState)
  {
    super();
    if(upState != undefined) this.upState = upState;
    if(downState != undefined) this.downState = downState;
    if(overState != undefined) this.overState = overState;

    this.currentState = this.upState;

    this.w = this.upState.w;
    this.h = this.upState.h;

    this.states = new Array();
    if(this.upState != null) this.states.push(this.upState);
    if(this.downState != null) this.states.push(this.downState);
    if(this.overState != null) this.states.push(this.overState);

    //this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
    //this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
  }

  /**
   * Function description.
   * @access public
   */
  render(dt, x, y)
  {
    this.currentState.render(dt, this.x + x, this.y + y);
  }

  /**
   * Function description.
   * @access protected
   */
  onAddedToScene()
  {
    super.onAddedToScene();
    this.states.each(function(displayObject) {
      displayObject.root = this.parent;
      displayObject.parent = this;
      displayObject.scene = this.scene;
      displayObject.onAddedToScene();
    }.bind(this));
  }

  /**
   * Function description.
   * @access protected
   */
  dispatchEvent(event)
  {
    if(!this.isDown) {
      if(event.type == MouseEvent.MOUSE_DOWN) {
        this.currentState = this.downState;
        this.isDown = true;

        if(!this.mouseMoveCallback) {
          this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
          this.parent.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
        }

        if(!this.mouseUpCallback) {
          this.mouseUpCallback = this.handleMouseUp.bindAsEventListener(this);
          this.parent.addEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
        }

      } else if(event.type == TouchEvent.TOUCH_START) {
        this.currentState = this.downState;
        this.isDown = true;

        if(!this.touchMoveCallback) {
          this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
          this.parent.addEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
        }

        if(!this.touchEndCallback) {
          this.touchEndCallback = this.handleTouchEnd.bindAsEventListener(this);
          this.parent.addEventListener(TouchEvent.TOUCH_END, this.touchEndCallback);
        }

      } else if(event.type == MouseEvent.MOUSE_MOVE) {
        this.currentState = this.overState;

        if(!this.mouseMoveCallback) {
          this.mouseMoveCallback = this.handleMouseMove.bindAsEventListener(this);
          this.parent.addEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
        }

      } else if(event.type == TouchEvent.TOUCH_MOVE) {
        this.currentState = this.overState;

        if(!this.touchMoveCallback) {
          this.touchMoveCallback = this.handleTouchMove.bindAsEventListener(this);
          this.parent.addEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
        }

      } else if(event.type == TouchEvent.TOUCH_END) {
        this.currentState = this.upState;

        if(this.touchMoveCallback) {
          this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
          this.touchMoveCallback = null;
        }

      }
    } else {
      if(event.type == MouseEvent.MOUSE_UP) {
        this.isDown = false;

        if(this.mouseMoveCallback) {
          this.parent.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
          this.mouseMoveCallback = null;
        }

        if(this.mouseUpCallback) {
          this.parent.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
          this.mouseUpCallback = null;
        }

        this.currentState = this.upState;

        this.select.bind(this).defer(event);
      } else if(event.type == TouchEvent.TOUCH_END) {
        this.isDown = false;

        if(this.touchMoveCallback) {
          this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
          this.touchMoveCallback = null;
        }

        if(this.touchUpCallback) {
          this.parent.removeEventListener(TouchEvent.TOUCH_END, this.touchEndCallback);
          this.touchEndCallback = null;
        }

        this.currentState = this.upState;

        this.select.bind(this).defer(event);
      }
    }
    return super.dispatchEvent(event);
  }

  /**
   * Function description.
   * @access private
   */
  handleMouseMove(event)
  {

    this.isOver = this.isEventOver(event);

    if(this.isOver && this.isDown) {
      this.currentState = this.downState;
    } else if(this.isOver) {
      this.currentState = this.overState;
    } else if(this.isDown) {
      this.currentState = this.upState;
    } else {
      this.currentState = this.upState;
      if(this.mouseMoveCallback) {
        this.parent.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
        this.mouseMoveCallback = null;
      }
    }

  }

  /**
   * Function description.
   * @access private
   */
  handleTouchMove(event)
  {

    this.isOver = this.isEventOver(event);

    if(this.isOver && this.isDown) {
      this.currentState = this.downState;
    } else if(this.isOver) {
      this.currentState = this.overState;
    } else if(this.isDown) {
      this.currentState = this.upState;
    } else {
      this.currentState = this.upState;
      if(this.touchMoveCallback) {
        this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
        this.touchMoveCallback = null;
      }
    }

  }

  isEventOver(event)
  {
    var sceneX = this.getSceneX();
    var sceneY = this.getSceneY();
    return (
      event.x >= sceneX &&
      event.x <= (sceneX + this.w) &&
      event.y >= sceneY &&
      event.y <= (sceneY + this.h)
    );
  }

  /**
   * Function description.
   * @access private
   */
  handleMouseUp(event)
  {
    this.currentState = this.upState;
    this.isDown = false;

    if(this.mouseMoveCallback) {
      this.parent.removeEventListener(MouseEvent.MOUSE_MOVE, this.mouseMoveCallback);
      this.mouseMoveCallback = null;
    }

    if(this.mouseUpCallback) {
      this.parent.removeEventListener(MouseEvent.MOUSE_UP, this.mouseUpCallback);
      this.mouseUpCallback = null;
    }
  }

  /**
   * Function description.
   * @access private
   */
  handleTouchEnd(event)
  {
    this.currentState = this.upState;
    this.isDown = false;

    if(this.touchMoveCallback) {
      this.parent.removeEventListener(TouchEvent.TOUCH_MOVE, this.touchMoveCallback);
      this.touchMoveCallback = null;
    }

    if(this.touchUpCallback) {
      this.parent.removeEventListener(TouchEvent.TOUCH_END, this.touchEndCallback);
      this.touchEndCallback = null;
    }
  }

  /**
   * Function description.
   * @access private
   */
  select(event)
  {
    var x = event.x;
    var y = event.y;
    var type = ButtonEvent.SELECT;

    var buttonEvent = new ButtonEvent(type, false, false, this);
    this.dispatchEvent(buttonEvent);
  }

}

export default Button


