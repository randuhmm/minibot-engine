define(
	[
		'minibot'
	],
	function
	(
		minibot
	)
	{
		
		var	ResourceManager = minibot.resource.ResourceManager
		,	ImageResource = minibot.resource.ImageResource
		,	SpriteResource = minibot.resource.SpriteResource
		,	CanvasScene = minibot.display.html.CanvasScene
		,	Button = minibot.display.scene.Button
		,	Sprite = minibot.display.scene.Sprite
		,	MouseEvent = minibot.event.MouseEvent
		;
		
		var Test_01 = Class.create(
			{

				resourceManager: null,
				sprite: null,
				canvas: null,
				
				moveBfx: null,
				endBfx: null,
				
				initialize: function()
				{
					
					this.resourceManager = new ResourceManager();
					this.resourceManager.addType(
						ImageResource.TYPE,
						ImageResource
					);
					this.resourceManager.addType(
						SpriteResource.TYPE,
						SpriteResource
					);
					
					this.resourceManager.addResource(
						ImageResource.TYPE,
						'button',
						{
							id: 'button',
							src: 'img/button.png'
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'button_up',
						{
							id: 'button_up',
							imageId: 'button',
							x: 0,
							y: 0,
							w: 185,
							h: 30
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'button_over',
						{
							id: 'button_over',
							imageId: 'button',
							x: 0,
							y: 30,
							w: 185,
							h: 30
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'button_down',
						{
							id: 'button_down',
							imageId: 'button',
							x: 0,
							y: 60,
							w: 185,
							h: 30
						}
					);
					
					this.resourceManager.loadAll(
						function(progress) {
							console.log('progressCallback - ' + progress);
						},
						function() {
							console.log('completeCallback');
							this.handleResourcesLoaded();
						}.bind(this)
					);
				},
				
				handleResourcesLoaded: function()
				{
					
					this.scene = new CanvasScene();
					this.scene.setWidth(400);
					this.scene.setHeight(400);
					$$('body')[0].insert(this.scene.getElement());
					
					this.button = new Button(
						new Sprite(this.resourceManager.getResource(SpriteResource.TYPE, 'button_up')),
						new Sprite(this.resourceManager.getResource(SpriteResource.TYPE, 'button_down')),
						new Sprite(this.resourceManager.getResource(SpriteResource.TYPE, 'button_over'))
					);
					this.scene.addChild(this.button);
					this.button.x = 25;
					
					
					var b = new Button(
						new Sprite(this.resourceManager.getResource(SpriteResource.TYPE, 'button_up')),
						new Sprite(this.resourceManager.getResource(SpriteResource.TYPE, 'button_down')),
						new Sprite(this.resourceManager.getResource(SpriteResource.TYPE, 'button_over'))
					);
					b.x = 100;
					b.y = 100;
					this.scene.addChild(b);
					
					this.button.addEventListener(MouseEvent.CLICK, function(event) {
						alert("Button 1 Clicked");
					});
					b.addEventListener(MouseEvent.CLICK, function(event) {
						alert("Button 2 Clicked");
					});
					
					minibot.system.setRenderCallback(this.scene.render.bind(this.scene));
					minibot.system.run();
				}
				
			}
		);
		
		return Test_01;

	}
);
