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
				},
				
				shakeScreen: function()
				{
					
				}
				
			}
		);
		
		return Camera;
		
	}
);
