import BaseEvent from 'minibot/event/BaseEvent';

class HtmlEvent extends BaseEvent {

  constructor(type, event)
  {
    super(type, event);
  }
}

HtmlEvent.CLICK        = "HtmlEvent_Click";
HtmlEvent.MOUSE_UP     = "HtmlEvent_MouseUp";
HtmlEvent.MOUSE_DOWN   = "HtmlEvent_MouseDown";
HtmlEvent.MOUSE_MOVE   = "HtmlEvent_MouseMove";
HtmlEvent.KEY_DOWN     = "HtmlEvent_KeyDown";
HtmlEvent.KEY_UP       = "HtmlEvent_KeyUp";
HtmlEvent.FOCUS        = "HtmlEvent_Focus";
HtmlEvent.BLUR         = "HtmlEvent_Blur";

export default HtmlEvent;
