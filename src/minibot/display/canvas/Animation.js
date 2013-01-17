define(
	[
		'minibot/display/canvas/CanvasDisplayObject'
	],
	function
	(
		CanvasDisplayObject
	)
	{
		var Animation = Class.create(
			CanvasDisplayObject,
			/** @lends display.canvas.Animation# */
			{
				
				animation: null,
				
				currentFrame: 0,
				
				currentSprite: null,
				
				currentDelay: null,
				
				time: 0,
				
				loops: 0,
				
				playing: false,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param {resource.AnimationResource} animation
				 * @param {bool} play
				 * @param {int} loops
				 * @param
				 */
				initialize: function($super, animation, play, loops)
				{
					$super();
					
					this.loops = Animation.INFINITE_LOOPS;
					
					this.setAnimation(animation, play, loops);
				},
				
				setAnimation: function(animation, play, loops)
				{
					this.playing = (play == undefined || play);
					
					if(loops == undefined) {
						this.loops == Animation.INFINITE_LOOPS;
					} else {
						this.loops = loops;
					}
					
					this.currentFrame = 0;
					this.time = 0;
					
					this.animation = animation;
					this.setupFrame();
				},
				
				setupFrame: function()
				{
					if(this.animation == null) return;
					this.currentSprite = this.animation.getSprite(this.currentFrame);
					this.currentDelay = this.animation.getDelay(this.currentFrame);
					if(this.w == 0) this.w = this.currentSprite.w;
					if(this.h == 0) this.h = this.currentSprite.h;
				},
				
				stop: function()
				{
					this.playing = false;
					this.currentFrame = 0;
					this.time = 0;
					this.setupFrame();
				},
				
				play: function(loops)
				{
					this.playing = true;
					
					if(loops == undefined) {
						this.loops == Animation.INFINITE_LOOPS;
					} else {
						this.loops = loops;
					}
				},
				
				render: function(dt, context, x, y)
				{
					if(this.animation == null) return;
					
					if(this.playing) {
						this.time += dt;
						while(this.time >= this.currentDelay) {
							
							// Handle looping
							if(this.loops != Animation.INFINITE_LOOPS) {
								if(this.animation.atEnd(this.currentFrame)) {
									if(this.loops == 0) {
										this.stop();
										this.setupFrame();
										break;
									} else {
										this.loops -= 1;
									}
								}
							}
							
							this.time -= this.currentDelay;
							this.currentFrame = this.animation.nextFrame(this.currentFrame);
							this.setupFrame();
						}
					}
					
					context.drawImage(
						this.currentSprite.img,
						this.currentSprite.x, //sx,
						this.currentSprite.y, //sy,
						this.currentSprite.w, //sw,
						this.currentSprite.h, //sh,
						this.x + x, //dx,
						this.y + y, //dy,
						this.w, //dw,
						this.h //dh
					);
				}
				
			}
		);
		
		Animation.INFINITE_LOOPS = -1;
		
		return Animation;
	}
);
