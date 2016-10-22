define(
	[
		'minibot',
		'BaseDemo',
		'./MyEngine'
	],
	function
	(
		minibot,
		BaseDemo,
		MyEngine
	)
	{

		var Scene = minibot.display.scene.Scene;

		var Demo = Class.create(
			BaseDemo,
			{

				engine: null,

				initialize: function($super, element)
				{

					var scene_options = {
						'eventTypes': Scene.MOUSE_EVENTS | Scene.KEYBOARD_EVENTS
					};
					$super(element, scene_options);

					this.engine = new MyEngine(this.scene);

					this.run();
				},

				update: function(dt)
				{
					this.engine.update(dt);
				},

				render: function(dt)
				{
					this.scene.clear();

					this.engine.render(dt);

					this.scene.render(dt);
				}

			}

		);

		return Demo;
	}
);
