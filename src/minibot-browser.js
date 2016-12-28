import base_minibot from 'base-minibot';

/** @namespace System namespace */
var system = require('minibot/system/browser').default;

export default {
      core:  base_minibot.core,
   display:  base_minibot.display,
    engine:  base_minibot.engine,
     event:  base_minibot.event,
      geom:  base_minibot.geom,
  graphics:  base_minibot.graphics,
   network:  base_minibot.network,
  resource:  base_minibot.resource,
    system:  system
};
