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
		
		var Camera = Class.create(
			EngineObject,
			{
				
				initialize: function($super)
				{
					$super(ObjectType.CAMERA);
				}
				
			}
		);
		
		//Camera.START_MOVE = 1;
		//Camera.STOP_MOVE = 2;
		
		return Camera;
		
	}
);
