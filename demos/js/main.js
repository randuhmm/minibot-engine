(function() {
	
	parentElement = $('demoScene');
	
	currentDemo = null;
	
	var handleButtonClick = function(event)
	{
		
		// destruct current demo if it exists
		
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
				var demo = new Demo(parentElement);
			}
		);
	};
	
	var buttons = $$('#demoButtons input');
	for(var i = 0; i < buttons.length; i++) {
		buttons[i].observe('click', handleButtonClick.bindAsEventListener(this));
	}
	
}());