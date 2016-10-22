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
		
		Player.START_MOVE_LEFT		= 1;
		Player.START_MOVE_UP		= 2;
		Player.START_MOVE_RIGHT		= 3;
		Player.START_MOVE_DOWN		= 4;
		
		Player.STOP_MOVE_LEFT		= 5;
		Player.STOP_MOVE_UP			= 6;
		Player.STOP_MOVE_RIGHT		= 7;
		Player.STOP_MOVE_DOWN		= 8;
		
		Player.SHAKE_SCREEN	= 9;
		
		return Player;
		
	}
);
