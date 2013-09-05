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
				
				queue: null,
				
				initialize: function($super)
				{
					$super(ComponentType.INPUT);
				},
				
				onAddedToObject: function()
				{
					Event.observe(document, 'keydown', function() {
						var event = this.buildEvent(PlayerObject.START_MOVE, null);
						this.dispatchEvent(event);
					}.bindAsEventListener(this));
				},
				
				update: function(dt)
				{
					// dispatch the events
				}
				
			}
		);
		
		return PlayerInputComponent;
		
	}
	
);
