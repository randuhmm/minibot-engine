import * as Utils from 'minibot/core/Utils';


var _toString = Object.prototype.toString,
    NULL_TYPE = 'Null',
    UNDEFINED_TYPE = 'Undefined',
    BOOLEAN_TYPE = 'Boolean',
    NUMBER_TYPE = 'Number',
    STRING_TYPE = 'String',
    OBJECT_TYPE = 'Object',
    FUNCTION_CLASS = '[object Function]',
    BOOLEAN_CLASS = '[object Boolean]',
    NUMBER_CLASS = '[object Number]',
    STRING_CLASS = '[object String]',
    ARRAY_CLASS = '[object Array]',
    DATE_CLASS = '[object Date]';

var $break = { };

function extend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
}

function isHash(object) {
  return object instanceof Object;
}

function isFunction(object) {
  return _toString.call(object) === FUNCTION_CLASS;
}

function isString(object) {
  return _toString.call(object) === STRING_CLASS;
}

function isNumber(object) {
  return _toString.call(object) === NUMBER_CLASS;
}

function isDate(object) {
  return _toString.call(object) === DATE_CLASS;
}

function isUndefined(object) {
  return typeof object === "undefined";
}

function include(arr, object) {
  if (isFunction(arr.indexOf))
    if (arr.indexOf(object) != -1) return true;

  var found = false;
  for(var i = 0; i < arr.length; i++) {
    if (arr[i] == object) {
      found = true;
      break;
    }
  }
  return found;
}

function isJSON(str) {
  if (str.blank()) return false;
  str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
  str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
  str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
  return (/^[\],:{}\s]*$/).test(str);
}

function evalJSON(json, sanitize) {
  try {
    if (!sanitize || isJSON(json)) return eval('(' + json + ')');
  } catch (e) { }
  throw new SyntaxError('Badly formed JSON string: ' + json);
}

var Try = {
  these: function() {
    var returnValue;

    for (var i = 0, length = arguments.length; i < length; i++) {
      var lambda = arguments[i];
      try {
        returnValue = lambda();
        break;
      } catch (e) { }
    }

    return returnValue;
  }
};

var Ajax = {
  getTransport: function() {
    return Try.these(
      function() {return new XMLHttpRequest()},
      function() {return new ActiveXObject('Msxml2.XMLHTTP')},
      function() {return new ActiveXObject('Microsoft.XMLHTTP')}
    ) || false;
  },

  activeRequestCount: 0
};

var Responders = {
  responders: [],

  register: function(responder) {
    if (!include(this, responder))
      this.responders.push(responder);
  },

  unregister: function(responder) {
    this.responders = this.responders.without(responder);
  },

  dispatch: function(callback, request, transport, json) {
    var responder;
    for(var i = 0; i < this.responders.length; i++) {
      responder = this.responders[i];
      if (isFunction(responder[callback])) {
        try {
          responder[callback].apply(responder, [request, transport, json]);
        } catch (e) { }
      }
    }
  }
};

//extend(Ajax.Responders, Enumerable);

Responders.register({
  onCreate:   function() { Ajax.activeRequestCount++ },
  onComplete: function() { Ajax.activeRequestCount-- }
});


class Base {

  constructor(options)
  {
    this.options = {
      method:       'post',
      asynchronous: true,
      contentType:  'application/x-www-form-urlencoded',
      encoding:     'UTF-8',
      parameters:   '',
      evalJSON:     true,
      evalJS:       true
    };
    extend(this.options, options || { });

    this.options.method = this.options.method.toLowerCase();

    if (isHash(this.options.parameters))
      this.options.parameters = this.options.parameters.toObject();
  }

}


class Request extends Base { // = Class.create(Ajax.Base, {  _complete: false,

  constructor(url, options) {
    super(options);
    this.complete = false;
    this.transport = Ajax.getTransport();
    this.request(url);
  }

  request(url) {
    this.url = url;
    this.method = this.options.method;
    var params = isString(this.options.parameters) ?
          this.options.parameters :
          toQueryString(this.options.parameters);

    if (!include(['get', 'post'], this.method)) {
      params += (params ? '&' : '') + "_method=" + this.method;
      this.method = 'post';
    }

    if (params && this.method === 'get') {
      this.url += (include(this.url, '?') ? '&' : '?') + params;
    }

    this.parameters = Utils.StringToQueryParams(params);

    try {
      var response = new Response(this);
      if (this.options.onCreate) this.options.onCreate(response);
      Responders.dispatch('onCreate', this, response);

      this.transport.open(this.method.toUpperCase(), this.url,
        this.options.asynchronous);

      if (this.options.asynchronous) Utils.Defer(this.respondToReadyState, this, 1);

      this.transport.onreadystatechange = Utils.Bind(this.onStateChange, this);
      this.setRequestHeaders();

      this.body = this.method == 'post' ? (this.options.postBody || params) : null;
      this.transport.send(this.body);

      /* Force Firefox to handle ready state 4 for synchronous requests */
      if (!this.options.asynchronous && this.transport.overrideMimeType)
        this.onStateChange();

    }
    catch (e) {
      this.dispatchException(e);
    }
  }

  onStateChange() {
    var readyState = this.transport.readyState;
    if (readyState > 1 && !((readyState == 4) && this._complete))
      this.respondToReadyState(this.transport.readyState);
  }

  setRequestHeaders() {
    var headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };

    if (this.method == 'post') {
      headers['Content-type'] = this.options.contentType +
        (this.options.encoding ? '; charset=' + this.options.encoding : '');

      /* Force "Connection: close" for older Mozilla browsers to work
       * around a bug where XMLHttpRequest sends an incorrect
       * Content-length header. See Mozilla Bugzilla #246651.
       */
      if (this.transport.overrideMimeType &&
          (navigator.userAgent.match(/Gecko\/(\d{4})/) || [0,2005])[1] < 2005)
            headers['Connection'] = 'close';
    }

    if (typeof this.options.requestHeaders == 'object') {
      var extras = this.options.requestHeaders;

      if (isFunction(extras.push))
        for (var i = 0, length = extras.length; i < length; i += 2)
          headers[extras[i]] = extras[i+1];
      else
        $H(extras).each(function(pair) { headers[pair.key] = pair.value });
    }

    for (var name in headers)
      this.transport.setRequestHeader(name, headers[name]);
  }

  success() {
    var status = this.getStatus();
    return !status || (status >= 200 && status < 300) || status == 304;
  }

  getStatus() {
    try {
      if (this.transport.status === 1223) return 204;
      return this.transport.status || 0;
    } catch (e) { return 0 }
  }

  respondToReadyState(readyState) {
    var state = Request.Events[readyState], response = new Response(this);

    if (state == 'Complete') {
      try {
        this._complete = true;
        (this.options['on' + response.status]
         || this.options['on' + (this.success() ? 'Success' : 'Failure')]
         || function() {})(response, response.headerJSON);
      } catch (e) {
        this.dispatchException(e);
      }

      var contentType = response.getHeader('Content-type');
      if (this.options.evalJS == 'force'
          || (this.options.evalJS && this.isSameOrigin() && contentType
          && contentType.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i)))
        this.evalResponse();
    }

    try {
      (this.options['on' + state] || function(){})(response, response.headerJSON);
      Responders.dispatch('on' + state, this, response, response.headerJSON);
    } catch (e) {
      this.dispatchException(e);
    }

    if (state == 'Complete') {
      this.transport.onreadystatechange = function(){};
    }
  }

  isSameOrigin() {
    var m = this.url.match(/^\s*https?:\/\/[^\/]*/);
    return !m || (m[0] == '#{protocol}//#{domain}#{port}'.interpolate({
      protocol: location.protocol,
      domain: document.domain,
      port: location.port ? ':' + location.port : ''
    }));
  }

  getHeader(name) {
    try {
      return this.transport.getResponseHeader(name) || null;
    } catch (e) { return null; }
  }

  evalResponse() {
    try {
      return eval((this.transport.responseText || '').unfilterJSON());
    } catch (e) {
      this.dispatchException(e);
    }
  }

  dispatchException(exception) {
    (this.options.onException || function() {})(this, exception);
    Responders.dispatch('onException', this, exception);
  }

}

Request.Events = ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];


class Response {
  constructor(request) {
    this.status = 0;
    this.statusText = '';

    this.request = request;
    var transport  = this.transport  = request.transport,
        readyState = this.readyState = transport.readyState;

    var BROWSER_IS_IE = false;

    if ((readyState > 2 && !BROWSER_IS_IE) || readyState == 4) {
      this.status       = this.getStatus();
      this.statusText   = this.getStatusText();
      this.responseText = (transport.responseText == null ? '' : String(transport.responseText));
      this.headerJSON   = this._getHeaderJSON();
    }

    if (readyState == 4) {
      var xml = transport.responseXML;
      this.responseXML  = isUndefined(xml) ? null : xml;
      this.responseJSON = this._getResponseJSON();
    }
  }

  getStatus() {
    return Request.prototype.getStatus();
  }

  getStatusText() {
    try {
      return this.transport.statusText || '';
    } catch (e) { return '' }
  }

  getHeader(name) {
    return Request.prototype.getHeader(name);
  }

  getAllHeaders() {
    try {
      return this.getAllResponseHeaders();
    } catch (e) { return null }
  }

  getResponseHeader(name) {
    return this.transport.getResponseHeader(name);
  }

  getAllResponseHeaders() {
    return this.transport.getAllResponseHeaders();
  }

  _getHeaderJSON() {
    var json = this.getHeader('X-JSON');
    if (!json) return null;
    json = decodeURIComponent(escape(json));
    try {
      return evalJSON(json, this.request.options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }

  _getResponseJSON() {
    var options = this.request.options;
    if (!options.evalJSON || (options.evalJSON != 'force' &&
      !(include(this.getHeader('Content-type') || ''), 'application/json')) ||
        this.responseText.blank())
          return null;
    try {
      return evalJSON(this.responseText, options.sanitizeJSON ||
        !this.request.isSameOrigin());
    } catch (e) {
      this.request.dispatchException(e);
    }
  }

}

/*
Ajax.Updater = Class.create(Ajax.Request, {
  initialize: function($super, container, url, options) {
    this.container = {
      success: (container.success || container),
      failure: (container.failure || (container.success ? null : container))
    };

    options = clone(options);
    var onComplete = options.onComplete;
    options.onComplete = (function(response, json) {
      this.updateContent(response.responseText);
      if (isFunction(onComplete)) onComplete(response, json);
    }).bind(this);

    $super(url, options);
  },

  updateContent: function(responseText) {
    var receiver = this.container[this.success() ? 'success' : 'failure'],
        options = this.options;

    if (!options.evalScripts) responseText = responseText.stripScripts();

    if (receiver = $(receiver)) {
      if (options.insertion) {
        if (isString(options.insertion)) {
          var insertion = { }; insertion[options.insertion] = responseText;
          receiver.insert(insertion);
        }
        else options.insertion(receiver, responseText);
      }
      else receiver.update(responseText);
    }
  }
});

Ajax.PeriodicalUpdater = Class.create(Ajax.Base, {
  initialize: function($super, container, url, options) {
    $super(options);
    this.onComplete = this.options.onComplete;

    this.frequency = (this.options.frequency || 2);
    this.decay = (this.options.decay || 1);

    this.updater = { };
    this.container = container;
    this.url = url;

    this.start();
  },

  start: function() {
    this.options.onComplete = this.updateComplete.bind(this);
    this.onTimerEvent();
  },

  stop: function() {
    this.updater.options.onComplete = undefined;
    clearTimeout(this.timer);
    (this.onComplete || function(){}).apply(this, arguments);
  },

  updateComplete: function(response) {
    if (this.options.decay) {
      this.decay = (response.responseText == this.lastText ?
        this.decay * this.options.decay : 1);

      this.lastText = response.responseText;
    }
    this.timer = this.onTimerEvent.bind(this).delay(this.decay * this.frequency);
  },

  onTimerEvent: function() {
    this.updater = new Ajax.Updater(this.container, this.url, this.options);
  }
});


function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++)
      elements.push($(arguments[i]));
    return elements;
  }
  if (isString(element))
    element = document.getElementById(element);
  return Element.extend(element);
}

if (Prototype.BrowserFeatures.XPath) {
  document._getElementsByXPath = function(expression, parentElement) {
    var results = [];
    var query = document.evaluate(expression, $(parentElement) || document,
      null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, length = query.snapshotLength; i < length; i++)
      results.push(Element.extend(query.snapshotItem(i)));
    return results;
  };
}

*/


Ajax.Request = Request;
Ajax.Response = Response;

export default Ajax;

