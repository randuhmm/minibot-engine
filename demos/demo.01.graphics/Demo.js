define(
	[
		'minibot'
	],
	function
	(
		minibot
	)
	{
		
		var	CanvasScene = minibot.display.html.CanvasScene
		,	Color = minibot.graphics.Color
		;
		
		var Demo = Class.create(
			{
				
				element: null,
				
				scene:  null,
				
				color: null,
				
				mul: null,
				mul_dir: null,
				
				initialize: function(element)
				{
					this.element = element;
					var canvasElement = new Element(
						'canvas', 
						{
							width: 640,
							height: 320
						}
					);
					canvasElement.innerHTML = 
						'<p>' + 
							'<b>Error:</b> You are using a browser that does not support the <i>&lt;canvas&gt;</i> tag.' +
							'Please view this page using a browser that supports this feature. Thanks!' +
						'</p>';
					this.scene = new CanvasScene(canvasElement);
					this.element.insert(canvasElement);
					
					this.color = new Color(Color.HSL, 255, 128, 128);
					
					this.mul = 1.0;
					this.mul_dir = 1;
					
					minibot.system.setRenderCallback(this.render.bind(this));
					minibot.system.run();
				},
				
				destroy: function()
				{
					this.element.remove();
				},
				
				render: function(dt)
				{
					this.scene.clear();
					
					this.mul += (this.mul_dir * Demo.MUL_SPEED * dt);
					if(this.mul >= 2) {
						this.mul = 2;
						this.mul_dir *= -1;
					}
					if(this.mul <= 1) {
						this.mul = 1;
						this.mul_dir *= -1;
					}
					
					var hsl = this.color.getAsArray(Color.HSL);
					this.color.setColor(Color.HSL, (hsl[0]+(dt*Demo.HUE_SPEED))%255, hsl[1], hsl[2]);
					
					this.scene.setFillColor(this.color);
					this.scene.drawRect("", 20, 20, 100*this.mul, 100*this.mul);
					
				}
				
			}
			
		);
		
		Demo.HUE_SPEED = 32 / 1000;
		Demo.MUL_SPEED = 0.5 / 1000;
		
		return Demo;
	}
);