define(
	[
		'minibot',
		
		'./system/InputSystem',
		'./system/PhysicsSystem',
		'./system/GameDisplaySystem',
		
		'./enum/ComponentType',
		
		'./factory/PlayerFactory',
		'./factory/CameraFactory'
	],
	function
	(
		minibot,
		
		InputSystem,
		PhysicsSystem,
		DisplaySystem,
		
		ComponentType,
		
		PlayerFactory,
		CameraFactory
	)
	{
		
		var Engine = minibot.engine.Engine;
		
		var MyEngine = Class.create(
			Engine,
			{
				
				player: null,
				
				camera: null,
				
				initialize: function($super, scene)
				{
					$super();
					
					this.setUpdateOrder([
						ComponentType.INPUT,
						ComponentType.PHYSICS,
						ComponentType.DISPLAY,
					]);
					
					// Add the systems
					this.addSystem(new InputSystem());
					this.addSystem(new PhysicsSystem());
					this.addSystem(new DisplaySystem(scene));
					
					// Add the camera object
					this.camera = CameraFactory.Create();
					this.addObject(this.camera);
					
					// Add the player object
					this.player = PlayerFactory.Create();
					this.addObject(this.player);
					
				},
				
				render: function(dt)
				{
					this.systemsByType[ComponentType.DISPLAY].render(dt);
				},
				
				getCamera: function()
				{
					return this.camera;
				}
				
			}
			
		);
		
		return MyEngine;
	}
);