(function(global) {

  function inherit(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  var MyBase = function(name) {
    this.name = name;
  }

  MyBase.prototype.say = function() {
    console.log('Hello, ' + this.name);
  };

  var MyChild = function() {
    MyBase.call(this, 'Child');
  }

  MyChild.prototype = Object.create(MyBase.prototype);
  MyChild.prototype.constructor = MyChild;

  var MyOtherChild = function() {
    MyChild.call(this);
  }

  MyOtherChild.prototype = Object.create(MyChild.prototype);
  MyOtherChild.prototype.constructor = MyOtherChild;

  MyOtherChild.prototype.say = function() {
    console.log('Go away, ' + this.name);
  }

  global.MyBase = MyBase;
  global.MyChild = MyChild;
  global.MyOtherChild = MyOtherChild;

}(window));
