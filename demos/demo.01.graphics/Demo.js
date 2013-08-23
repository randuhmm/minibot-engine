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
		
		var	CanvasScene = minibot.display.html.CanvasScene
		,	Color = minibot.graphics.Color
		,	Vector2 = minibot.geom.Vector2
		;
		
		var Demo = Class.create(
			BaseDemo,
			{
				
				color: null,
				
				mul: null,
				mul_dir: null,
				
				line: null,
				angle: null,
				
				initialize: function($super, element)
				{
					$super(element);
					
					this.color = new Color(Color.HSL, 255, 128, 128);
					
					this.mul = 1.0;
					this.mul_dir = 1;
					
					this.line = new Vector2(100, 0);
					this.angle = 0;
					
					this.run();
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
					
					var s = 100*this.mul;
					
					this.scene.setFillColor(this.color);
					this.scene.drawRect("", 100 + (100-s)/2, 100 + (100-s)/2, s, s);
					
					this.line.rotate(Demo.ANGLE_SPEED * dt);
					this.scene.drawLine(400, 150, 400 + this.line.x, 150 + this.line.y);
					
				}
				
			}
			
		);
		
		Demo.HUE_SPEED = 32 / 1000;
		Demo.MUL_SPEED = 0.5 / 1000;
		Demo.ANGLE_SPEED = 90 / 1000;
		
		return Demo;
	}
);