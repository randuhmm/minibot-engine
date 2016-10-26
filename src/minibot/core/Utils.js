

var BindAsEventListener = function(fx, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function(event) {
    var a = [event];
    for (var i = args.length - 1; i >= 0; i--) {
      a[1 + i] = args[i]
    }
    fx.apply(ctx, a);
  };
};


var Bind = function(fx, ctx) {
  return function() {
    fx.apply(ctx, arguments);
  };
};


var Defer = function(fx, ctx) {
  var args = Array.prototype.slice.call(arguments, 2);
  setTimeout(function() {
    fx.apply(ctx, args)
  }, 0);
};


export {
  Bind,
  BindAsEventListener,
  Defer
};
