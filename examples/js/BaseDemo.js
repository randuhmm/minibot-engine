define(
	[
		'minibot'
	],
	function
	(
		minibot
	)
	{

		var	CanvasScene = minibot.display.html.CanvasScene;

		var BaseDemo = Class.create(
			{

				element: null,

				canvasElement: null,

				scene:  null,

				initialize: function(element, options)
				{
					if(options === null || options === undefined) {
						options = {};
					}
					this.element = element;
					this.canvasElement = new Element(
						'canvas',
						{
							width: 640,
							height: 320
						}
					);
					this.canvasElement.innerHTML =
						'<p>' +
							'<b>Error:</b> You are using a browser that does not support the <i>&lt;canvas&gt;</i> tag.' +
							'Please view this page using a browser that supports this feature. Thanks!' +
						'</p>';
					options['element'] = this.canvasElement;
					this.scene = new CanvasScene(options);
					this.element.insert(this.canvasElement);
				},

				run: function()
				{
					minibot.system.SetUpdateCallback(this.update.bind(this));
					minibot.system.SetRenderCallback(this.render.bind(this));
					minibot.system.Run();
				},

				destroy: function()
				{
					this.canvasElement.remove();
					minibot.system.Stop();
					minibot.system.SetRenderCallback(null);
				},

				update: function(dt)
				{
					// Override in subclass
				},

				render: function(dt)
				{
					// Override in subclass
				}

			}

		);

		return BaseDemo;
	}
);
