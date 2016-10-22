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
		
		var	Button = minibot.display.scene.Button
		,	Color = minibot.graphics.Color
		,	Rect = minibot.display.scene.Rect
		,	Container = minibot.display.scene.Container
		,	Text = minibot.display.scene.Text
		,	TextStyle = minibot.display.scene.TextStyle
		,	MouseEvent = minibot.event.MouseEvent
		;
		
		var CustomButton = Class.create(
			Button,
			{
				
				initialize: function($super, text)
				{
					
					var style = new TextStyle("monospace", 19, new Color(Color.RGB, 0, 0, 0), "left")
					
					var upText = new Text(text + " - Up", style);
					upText.x = 30;
					upText.y = 30;
					var overText = new Text(text + " - Over", style);
					overText.x = 30;
					overText.y = 30;
					var downText = new Text(text + " - Down", style);
					downText.x = 30;
					downText.y = 30;
					
					var upRect = new Rect(280, 40, "", Color.FromHex("#990000"));
					var overRect = new Rect(280, 40, "", Color.FromHex("#CC0000"));
					var downRect = new Rect(280, 40, "", Color.FromHex("#0000CC"));
					
					var upContainer = new Container();
					upContainer.addChild(upRect);
					upContainer.addChild(upText);
					
					var overContainer = new Container();
					overContainer.addChild(overRect);
					overContainer.addChild(overText);
					
					var downContainer = new Container();
					downContainer.addChild(downRect);
					downContainer.addChild(downText);
					
					$super(upContainer, downContainer, overContainer);
				}
				
			}
		);
		
		
		var Demo = Class.create(
			BaseDemo,
			{
				
				initialize: function($super, element)
				{
					$super(element);
					
					var button1 = new CustomButton("Button 1");
					button1.x = 80;
					button1.y = 40;
					
					var button2 = new CustomButton("Button 2");
					button2.x = 100;
					button2.y = 200;
					
					var button3 = new CustomButton("Button 3");
					button3.x = 200;
					button3.y = 140;
					
					var button4 = new CustomButton("Button 4");
					button4.x = 240;
					button4.y = 160;
					
					this.scene.addChild(button1);
					this.scene.addChild(button2);
					this.scene.addChild(button3);
					this.scene.addChild(button4);
					
					button1.addEventListener(MouseEvent.CLICK, this.handleButtonClick.bindAsEventListener(this, "Button 1"));
					button2.addEventListener(MouseEvent.CLICK, this.handleButtonClick.bindAsEventListener(this, "Button 2"));
					button3.addEventListener(MouseEvent.CLICK, this.handleButtonClick.bindAsEventListener(this, "Button 3"));
					button4.addEventListener(MouseEvent.CLICK, this.handleButtonClick.bindAsEventListener(this, "Button 4"));
					
					this.run();
				},
				
				handleButtonClick: function(event, name)
				{
					alert("'" + name + "' was clicked!");
				},
				
				render: function(dt)
				{
					this.scene.clear();
					this.scene.render(dt);
				}
				
			}
			
		);
		
		return Demo;
	}
);