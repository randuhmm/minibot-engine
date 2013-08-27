define(
	[
		'../object/PlayerObject',
		'../component/PlayerPhysicsComponent',
		'../component/PlayerInputComponent',
		'../component/PlayerDisplayComponent'
	],
	function
	(
		PlayerObject,
		PlayerPhysicsComponent,
		PlayerInputComponent,
		PlayerDisplayComponent
	)
	{
		var PlayerFactory = {};
		
		PlayerFactory.Create = function(world)
		{
			var player = new PlayerObject()
			player.setProperty("health", 5)
			
			player.addComponent(new PlayerPhysicsComponent(world))
			player.addComponent(new PlayerInputComponent())
			player.addComponent(new PlayerDisplayComponent())
			
			return player
		};
		
		return PlayerFactory;
	}
	
);