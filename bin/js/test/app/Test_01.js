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
		,	AnimationResource = minibot.resource.AnimationResource
		,	CanvasScene = minibot.display.html.CanvasScene
		,	Button = minibot.display.scene.Button
		,	Sprite = minibot.display.scene.Sprite
		,	Animation = minibot.display.scene.Animation
		,	MouseEvent = minibot.event.MouseEvent
		;
		
		var Test_01 = Class.create(
			{

				resourceManager: null,
				
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
					this.resourceManager.addType(
						AnimationResource.TYPE,
						AnimationResource
					);
					
					this.resourceManager.addResource(
						ImageResource.TYPE,
						'sonic',
						{
							id: 'sonic',
							src: 'img/sonic.png'
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'run_01',
						{
							id: 'run_01',
							imageId: 'sonic',
							x: 0,
							y: 0,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'run_02',
						{
							id: 'run_02',
							imageId: 'sonic',
							x: 48*1,
							y: 0,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'run_03',
						{
							id: 'run_03',
							imageId: 'sonic',
							x: 48*2,
							y: 0,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'run_04',
						{
							id: 'run_04',
							imageId: 'sonic',
							x: 48*3,
							y: 0,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'run_05',
						{
							id: 'run_05',
							imageId: 'sonic',
							x: 48*4,
							y: 0,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'run_06',
						{
							id: 'run_01',
							imageId: 'sonic',
							x: 48*5,
							y: 0,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'sprint_01',
						{
							id: 'sprint_01',
							imageId: 'sonic',
							x: 48*0,
							y: 48,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'sprint_02',
						{
							id: 'sprint_02',
							imageId: 'sonic',
							x: 48*1,
							y: 48,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'sprint_03',
						{
							id: 'sprint_03',
							imageId: 'sonic',
							x: 48*2,
							y: 48,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'sprint_04',
						{
							id: 'sprint_04',
							imageId: 'sonic',
							x: 48*3,
							y: 48,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'zoom_01',
						{
							id: 'zoom_01',
							imageId: 'sonic',
							x: 48*0,
							y: 96,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'zoom_02',
						{
							id: 'zoom_02',
							imageId: 'sonic',
							x: 48*1,
							y: 96,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'zoom_03',
						{
							id: 'zoom_03',
							imageId: 'sonic',
							x: 48*2,
							y: 96,
							w: 48,
							h: 48
						}
					);
					
					this.resourceManager.addResource(
						SpriteResource.TYPE,
						'zoom_04',
						{
							id: 'zoom_04',
							imageId: 'sonic',
							x: 48*3,
							y: 96,
							w: 48,
							h: 48
						}
					);
					
					var sonic_run_delay = 92;
					this.resourceManager.addResource(
						AnimationResource.TYPE,
						'sonic_run',
						{
							id: 'sonic_run',
							frames: [
								{
									sprite_id: 'run_01',
									delay: sonic_run_delay
								},
								{
									sprite_id: 'run_02',
									delay: sonic_run_delay
								},
								{
									sprite_id: 'run_03',
									delay: sonic_run_delay
								},
								{
									sprite_id: 'run_04',
									delay: sonic_run_delay
								},
								{
									sprite_id: 'run_05',
									delay: sonic_run_delay
								},
								{
									sprite_id: 'run_06',
									delay: sonic_run_delay
								},
							]
						}
					);
					
					var sonic_sprint_delay = 64;
					this.resourceManager.addResource(
						AnimationResource.TYPE,
						'sonic_sprint',
						{
							id: 'sonic_sprint',
							frames: [
								{
									sprite_id: 'sprint_01',
									delay: sonic_sprint_delay
								},
								{
									sprite_id: 'sprint_02',
									delay: sonic_sprint_delay
								},
								{
									sprite_id: 'sprint_03',
									delay: sonic_sprint_delay
								},
								{
									sprite_id: 'sprint_04',
									delay: sonic_sprint_delay
								}
							]
						}
					);
					
					var sonic_zoom_delay = 64;
					this.resourceManager.addResource(
						AnimationResource.TYPE,
						'sonic_zoom',
						{
							id: 'sonic_zoom',
							frames: [
								{
									sprite_id: 'zoom_01',
									delay: sonic_zoom_delay
								},
								{
									sprite_id: 'zoom_02',
									delay: sonic_zoom_delay
								},
								{
									sprite_id: 'zoom_03',
									delay: sonic_zoom_delay
								},
								{
									sprite_id: 'zoom_04',
									delay: sonic_zoom_delay
								}
							]
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
					
					var sonic_run = new Animation(
						this.resourceManager.getResource(AnimationResource.TYPE, 'sonic_run')
					);
					//this.scene.addChild(sonic_run);
					//sonic_run.addEventListener(MouseEvent.MOUSE_DOWN, this.toggleAnimation.bindAsEventListener(this));
					
					var sonic_sprint = new Animation(
						this.resourceManager.getResource(AnimationResource.TYPE, 'sonic_sprint')
					);
					//this.scene.addChild(sonic_sprint);
					//sonic_sprint.addEventListener(MouseEvent.MOUSE_DOWN, this.toggleAnimation.bindAsEventListener(this));
					//sonic_sprint.x = 50;
					
					var sonic_zoom = new Animation(
						this.resourceManager.getResource(AnimationResource.TYPE, 'sonic_zoom')
					);
					//this.scene.addChild(sonic_zoom);
					//sonic_zoom.addEventListener(MouseEvent.MOUSE_DOWN, this.toggleAnimation.bindAsEventListener(this));
					//sonic_zoom.x = 100;
					
					
					var button = new Button(
						sonic_run,
						sonic_sprint,
						sonic_zoom
					);
					this.scene.addChild(button);
					
					minibot.system.SetRenderCallback(this.scene.render.bind(this.scene));
					minibot.system.Run();
				},
				
				toggleAnimation: function(event)
				{
					if(event.target.isPlaying()) {
						event.target.stop();
					} else {
						event.target.play();
					}
				}
				
			}
		);
		
		return Test_01;

	}
);
