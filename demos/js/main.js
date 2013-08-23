(function() {
	
	parentElement = $('demoScene');
	
	currentDemo = null;
	
	var handleButtonClick = function(event)
	{
		
		// destruct current demo if it exists
		if(currentDemo != null) {
			currentDemo.destroy();
		}
		
		// setup new demo
		require
		(
			[
				'../' + event.target.id + '/Demo'
			],
			function
			(
				Demo
			)
			{
				currentDemo = new Demo(parentElement);
			}.bind(this)
		);
	};
	
	var buttons = $$('#demoButtons input');
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].observe('click', handleButtonClick.bindAsEventListener(this));
	}
	
}());