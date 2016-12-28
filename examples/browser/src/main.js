(function(){

  var main = function() {

    var demoElement = document.getElementById('demoScene');
    var currentDemo = null;
    var demoMap = {
      'demo.01.graphics': require('./demos/GraphicsDemo').default,
      'demo.02.text': require('./demos/TextDemo').default,
      'demo.03.events': require('./demos/EventsDemo').default
    };

    var handleButtonClick = function(event) {

      // destruct current demo if it exists
      if(currentDemo != null) {
        currentDemo.destroy();
        currentDemo = null;
      }

      var id = event.target.id;
      if(id in demoMap) {
        // Create the new demo
        currentDemo = new demoMap[id](demoElement);
      }

    };

    var buttons = document.getElementById('demoButtons').children;
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function(event) {
        handleButtonClick.call(this, event);
      });
    }

  };

  window.onload = main;

})();
