define(
	[
		'../object/CameraObject',
		'../component/CameraInputComponent',
		'../component/CameraPhysicsComponent'
	],
	function
	(
		CameraObject,
		CameraInputComponent,
		CameraPhysicsComponent
	)
	{
		var CameraFactory = {};
		
		CameraFactory.Create = function(world)
		{
			var camera = new CameraObject()
			camera.setProperty("x", 0)
			camera.setProperty("y", 0)
			
			camera.addComponent(new CameraInputComponent())
			camera.addComponent(new CameraPhysicsComponent())
			
			return camera
		};
		
		return CameraFactory;
	}
	
);