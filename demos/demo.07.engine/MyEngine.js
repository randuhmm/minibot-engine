define(
	[
		'minibot',
		
		'./system/InputSystem',
		'./system/PhysicsSystem',
		'./system/DisplaySystem',
		
		'./enum/ComponentType',
		
		'./factory/PlayerFactory'
	],
	function
	(
		minibot,
		
		InputSystem,
		DisplaySystem,
		PhysicsSystem,
		
		ComponentType,
		
		PlayerFactory
	)
	{
		
		var Engine = minibot.engine.Engine;
		
		var MyEngine = Class.create(
			Engine,
			{
				
				player: null,
				
				initialize: function($super)
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
					this.addSystem(new DisplaySystem());
					
					// Add the player object
					this.player = PlayerFactory.Create();
					this.addObject(this.player);
					
				},
				
				render: function(dt)
				{
					
				}
				
			}
			
		);
		
		return MyEngine;
	}
);