define(
['minibot/utils', 'minibot/display/canvas/CanvasDisplayObject'],
function(utils, CanvasDisplayObject)
{
	return utils.define(
		{
			name: 'minibot.display.canvas.Rect',
			parent: CanvasDisplayObject
		},
		{		
			fillStyle: null,
			strokeStyle: null,
			
			initialize: function($super, width, height, fillStyle, strokeStyle)
			{
				$super();
				
				if(fillStyle != undefined) this.fillStyle = fillStyle;
				if(strokeStyle != undefined) this.strokeStyle = strokeStyle;
				
				this.w = width;
				this.h = height;
			},
			
			render: function(dt, context, x, y)
			{
				if(this.fillStyle != undefined) {
					context.fillStyle = this.fillStyle;
					context.fillRect(this.x + x, this.y + y, this.w, this.h);
				}
			}
			
		}
	);
});
