define(
	[
		'minibot',
		'BaseDemo'
	],
	function
	(
		minibot,
		BaseDemo
	)
	{
		
		var	Text = minibot.display.scene.Text
		,	TextStyle = minibot.display.scene.TextStyle
		,	Color = minibot.graphics.Color
		;
		
		var Demo = Class.create(
			BaseDemo,
			{
				
				text: null,
				
				stringArray: null,
				
				initialize: function($super, element)
				{
					$super(element);
					
					this.stringArray = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
					
					this.textStyle = new TextStyle("monospace", 19, new Color(Color.RGB, 255, 0, 0), "left");
					
					this.text = new Text(this.stringArray.join(""), this.textStyle);
					this.text.x = 100;
					this.text.y = 100;
					
					this.scene.addChild(this.text);
					
					this.run();
				},
				
				render: function(dt)
				{
					this.scene.clear();
					
					var pos = Math.floor(Math.random() * this.stringArray.length);
					
					this.stringArray[pos] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
					
					this.text.setText(this.stringArray.join(""));
					
					this.scene.render();
				}
				
			}
			
		);
		
		return Demo;
	}
);