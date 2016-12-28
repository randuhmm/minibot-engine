define(
	[
		'minibot',
		'../enum/ComponentType',
		'../object/PlayerObject'
	],
	function
	(
		minibot,
		ComponentType,
		PlayerObject
	)
	{
		
		var DisplayComponent = minibot.engine.component.DisplayComponent;
		
		var PlayerDisplayComponent = Class.create(
			DisplayComponent,
			{
				
				camera: null,
				
				initialize: function($super)
				{
					$super(ComponentType.DISPLAY);
				},
				
				update: function(dt)
				{
					
				},
				
				onAddedToObject: function($super)
				{
					this.addEventListener(
						PlayerObject.SCREEN_SHAKE, 
						this.handleScreenShake.bindAsEventListener(this)
					);
				},
				
				onAddedToSystem: function($super)
				{
					$super();
					this.camera = this.getSystem().getCamera();
				},
				
				render: function(dt, layer, x, y)
				{
					this.scene.drawRect('', x + this.getProperty("x"), y + this.getProperty("y"), 50, 50);
				},
				
				handleScreenShake: function()
				{
					this.camera.shakeScreen();
				},
				
				getLayers: function()
				{
					return [0];
				}
				
			}
		);
		
		return PlayerDisplayComponent;
		
	}
	
);
