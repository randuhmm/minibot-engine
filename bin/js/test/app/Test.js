define(['minibot'],
function(minibot)
{
	
	var ResourceManager = minibot.resource.ResourceManager;
	var ResourceType = minibot.resource.ResourceType;
	var ImageResource = minibot.resource.ImageResource;
	var SpriteResource = minibot.resource.SpriteResource;
	var UIEvent = minibot.event.UIEvent;
	
	var Sprite = minibot.display.canvas.Sprite;
	var Canvas = minibot.display.html.Canvas;
	
	var members = {

		resourceManager: null,
		sprite: null,
		canvas: null,
		
		moveBfx: null,
		endBfx: null,
		
		initialize: function()
		{
			
			this.moveBfx = this.moveSprite.bindAsEventListener(this);
			this.endBfx = this.touchEnd.bindAsEventListener(this);
			
			this.resourceManager = new ResourceManager();
			this.resourceManager.addType(
				ResourceType.IMAGE,
				ImageResource
			);
			this.resourceManager.addType(
				ResourceType.SPRITE,
				SpriteResource
			);
			
			this.resourceManager.addResource(
				ResourceType.IMAGE,
				'test',
				{
					id: 'test',
					src: 'img/test.png'
				}
			);
			
			this.resourceManager.addResource(
				ResourceType.SPRITE,
				'test',
				{
					id: 'test',
					imageId: 'test'
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
			
			this.canvas = new Canvas();
			this.canvas.setWidth(400);
			this.canvas.setHeight(400);
			$$('body')[0].insert(this.canvas.element);
			
			this.sprite = new Sprite(
				this.resourceManager.getResource(ResourceType.SPRITE, 'test')
			);
			this.canvas.addChild(this.sprite);
			this.sprite.addEventListener(UIEvent.TOUCH_START, function(event) {
				this.canvas.container.addEventListener(UIEvent.TOUCH_MOVE, this.moveBfx);
				this.canvas.container.addEventListener(UIEvent.TOUCH_END, this.endBfx);
			}.bind(this));
			
			/*
			sprite.addEventListener(minibot.event.UIEvent.TOUCH_START, function(event) {
				sprite.addEventListener(minibot.event.UIEvent.TOUCH_MOVE, moveSprite.bindAsEventListener(sprite);
			});
			*/
			
			/*
			var text = new minibot.display.canvas.Text('TESTING!');
			text.y = 20;
			this.canvas.addChild(text);
			*/
			
			this.canvas.render(0);
		},
		
		moveSprite: function(event)
		{
			console.log('moving sprite');
			this.canvas.element.width = this.canvas.element.width;
			this.sprite.x = event.x;
			this.sprite.y = event.y;
			this.canvas.render(0);
		},
		
		touchEnd: function(event)
		{
			this.canvas.container.removeEventListener(UIEvent.TOUCH_MOVE, this.moveBfx);
			this.canvas.container.removeEventListener(UIEvent.TOUCH_END, this.endBfx);
			this.canvas.render(0);
		}
		
	};
	
	return minibot.utils.define({}, members);
});
