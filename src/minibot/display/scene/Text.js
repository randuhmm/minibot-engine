define(
	[
		'minibot/display/canvas/CanvasDisplayObject'
	],
	function
	(
		CanvasDisplayObject
	)
	{
		
		var Text = Class.create(
			CanvasDisplayObject,
			/** @lends display.canvas.Text# */
			{
				
				text: '',
				
				font: null,
				
				fillStyle: null,
				
				textAlign: null,
				
				metrics: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param {String} text
				 * @param {String} font
				 * @param {String} fillStyle
				 * @param {String} textAlign
				 * @param {Canvas 2DContext} context
				 * @param 
				 */
				initialize: function($super, text, font, fillStyle, textAlign, context)
				{
					$super();
					
					this.text = text;
					
					if(font != undefined) this.font = font;
					if(fillStyle != undefined) this.fillStyle = fillStyle;
					if(textAlign != undefined) this.textAlign = textAlign;
					
					if(context != undefined) {
						this.setStyle(context);
						this.metrics = context.measureText(this.text);
					}
				},
				
				setStyle: function(context)
				{
					if(this.font != null) context.font = this.font;
					if(this.textAlign != null) context.textAlign = this.textAlign;
					if(this.fillStyle != null) context.fillStyle = this.fillStyle;
				},
				
				getText: function()
				{
					return this.text;
				},
				
				getMetrics: function()
				{
					return this.metrics;
				},
				
				setText: function(text)
				{
					this.text = text;
				},
				
				render: function(dt, context, x, y)
				{
					//context.font = 'bold 24px/30px Arial, san-serif';
					//context.fillStyle = '#FFFFFF';
					this.setStyle(context);
					context.fillText(this.text, this.x + x, this.y + y);
				}
				
			}
		);
		
		return Text;
	}
);
