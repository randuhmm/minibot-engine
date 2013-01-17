define(
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Mask',
			parent: CanvasDisplayObject
		},
		{
			
			base: null,
			mask: null,
			
			maskCanvas: null,
			maskContext: null,
			
			initialize: function($super, base, mask)
			{
				$super();
				
				this.base = base;
				this.mask = mask;
				
				// Setup the mask canvas
				this.maskCanvas = new Element('canvas');
				this.maskCanvas.width = this.base.w + this.base.x;
				this.maskCanvas.height = this.base.h + this.base.y;
				this.maskContext = this.maskCanvas.getContext('2d');
				
				// Draw the mask pixels to the canvas
				this.mask.render(0, this.maskContext, this.base.x, this.base.y);
				
				this.maskContext.globalCompositeOperation = 'source-in';
				
				this.base.render(0, this.maskContext, 0, 0);
				
				this.w = this.maskCanvas.width;
				this.h = this.maskCanvas.height;
				
			},
			
			render: function(dt, context, x, y)
			{
				context.drawImage(
					this.maskCanvas,
					0, //sx,
					0, //sy,
					this.maskCanvas.width, //sw,
					this.maskCanvas.height, //sh,
					this.x + x, //dx,
					this.y + y, //dy,
					this.w, //dw,
					this.h //dh
				)
			}
			
		}
	);
});
