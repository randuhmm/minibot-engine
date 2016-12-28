

var BindAsEventListener = function(fx, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function(event) {
    var a = [event];
    for (var i = args.length - 1; i >= 0; i--) {
      a[1 + i] = args[i];
    }
    fx.apply(ctx, a);
  };
};


var Bind = function(fx, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function() {
    var _args;
    if(arguments.length > 0) {
      _args = args.concat(Array.prototype.slice.call(arguments))
    } else {
      _args = args;
    }
    fx.apply(ctx, _args);
  };
};


var Defer = function(fx, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  setTimeout(function() {
    fx.apply(ctx, args);
  }, 0);
};


var StringToQueryParams = function(str, separator) {
  var match = str.trim().match(/([^?#]*)(#.*)?$/);
  var params = {};
  if(match) {
    var segments = match[1].split(separator || '&');
    var pair, key, value;
    for(var i = 0; i < segments.length; i++) {
      pair = segments[i];
      if((pair = pair.split('='))[0]) {
        key = decodeURIComponent(pair.shift());
        value = pair.length > 1 ? pair.join('=') : pair[0];
        if (key in params) {
          if (!Object.isArray(params[key])) params[key] = [params[key]];
          params[key].push(value);
        } else {
          params[key] = value;
        }
      }
    }
  }
  return params;
};

// var ParamsToQueryString = function(params) {
//   var results = [];
//   var key, value;
//   for(key in params) {
//     value = params[key];
//     key = encodeURIComponent(key);

//     if (value && typeof value == 'object') {
//       if (isArray(value)) {
//         var queryValues = [];
//         for (var i = 0, len = values.length, value; i < len; i++) {
//           value = values[i];
//           queryValues.push(toQueryPair(key, value));
//         }
//         return results.concat(queryValues);
//       }
//     } else results.push(toQueryPair(key, values));
//   }
//     return results;
//   }).join('&');
// }


export {
  Bind,
  BindAsEventListener,
  Defer,
  StringToQueryParams
};


