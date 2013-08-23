define(
	[
		'minibot'
	],
	function
	(
		minibot
	)
	{
		
		var	CanvasScene = minibot.display.html.CanvasScene;
		
		var BaseDemo = Class.create(
			{
				
				element: null,
				
				canvasElement: null,
				
				scene:  null,
				
				initialize: function(element)
				{
					this.element = element;
					this.canvasElement = new Element(
						'canvas', 
						{
							width: 640,
							height: 320
						}
					);
					this.canvasElement.innerHTML = 
						'<p>' + 
							'<b>Error:</b> You are using a browser that does not support the <i>&lt;canvas&gt;</i> tag.' +
							'Please view this page using a browser that supports this feature. Thanks!' +
						'</p>';
					this.scene = new CanvasScene(this.canvasElement);
					this.element.insert(this.canvasElement);
					
				},
				
				run: function()
				{
					minibot.system.setRenderCallback(this.render.bind(this));
					minibot.system.run();
				},
				
				destroy: function()
				{
					this.canvasElement.remove();
					minibot.system.stop();
					minibot.system.setRenderCallback(null);
				},
				
				render: function()
				{
					
				}
				
			}
			
		);
		
		return BaseDemo;
	}
);