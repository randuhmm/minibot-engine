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
			
			radius: null,
			fillStyle: null,
			strokeStyle: null,
			
			initialize: function($super, width, height, radius, fillStyle, strokeStyle)
			{
				$super();
				
				if(fillStyle != undefined) this.fillStyle = fillStyle;
				if(strokeStyle != undefined) this.strokeStyle = strokeStyle;
				
				this.w = width;
				this.h = height;
				
				if( typeof radius === 'string' ) {
					this.radius = [10, 10, 10, 10];
				} else {
					this.radius = radius;
				}
			},
			
			render: function(dt, context, x, y)
			{
				
				var r = this.radius;
				var w = this.w;
				var h = this.h;
				x += this.x;
				y += this.y;
				
				context.beginPath();
				
				
				context.moveTo(x + r[0], y);
				
				context.lineTo(x + w - r[1], y);
				if(r[1] != 0) context.quadraticCurveTo(x + w, y, x + w, y + r[1]);
				
				context.lineTo(x + w, y + h - r[2]);
				if(r[2] != 0) context.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
				
				context.lineTo(x + r[3], y + h);
				if(r[3] != 0) context.quadraticCurveTo(x, y + h, x, y + h - r[3]);
				
				context.lineTo(x, y + r[0]);
				if(r[0] != 0) context.quadraticCurveTo(x, y, x + r[0], y);
				
				context.closePath();
				
				if(this.fillStyle != undefined) {
					context.fillStyle = this.fillStyle;
					context.fill();
				}
				
			}
			
		}
	);
});
