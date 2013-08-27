define(
	[
		'minibot',
		'../enum/ObjectType'
	],
	function
	(
		minibot,
		ObjectType
	)
	{
		
		var EngineObject = minibot.engine.EngineObject;
		
		var Player = Class.create(
			EngineObject,
			{
				
				initialize: function($super)
				{
					$super(ObjectType.PLAYER);
				}
				
			}
		);
		
		Player.START_MOVE = 1;
		Player.STOP_MOVE = 2;
		
		return Player;
		
	}
);
