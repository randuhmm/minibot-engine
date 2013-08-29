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
		
		var EngineComponent = minibot.engine.EngineComponent;
		
		var PlayerInputComponent = Class.create(
			EngineComponent,
			{
				
				initialize: function($super)
				{
					$super(ComponentType.INPUT);
				},
				
				onAddedToObject: function()
				{
					Event.observe(document, 'keydown', function() {
						this.sendMessage({type: PlayerObject.START_MOVE});
					}.bindAsEventListener(this));
				},
				
				update: function(dt)
				{
				}
				
			}
		);
		
		return PlayerInputComponent;
		
	}
	
);
