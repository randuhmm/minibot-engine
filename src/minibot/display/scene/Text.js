define(
	[
		'minibot/display/scene/SceneDisplayObject'
	],
	function
	(
		SceneDisplayObject
	)
	{
		
		var Text = Class.create(
			SceneDisplayObject,
			/** @lends display.scene.Text# */
			{
				
				text: '',
				
				style: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.scene.SceneDisplayObject
				 * @constructs
				 * @param {String} text
				 * @param {display.scene.TextStyle} style
				 * @param {String} textAlign
				 * @param {Scene 2DContext} context
				 * @param 
				 */
				initialize: function($super, text, style)
				{
					$super();
					
					this.text = text;
					
					if(style != undefined) this.style = style;
					
					/*
					if(font != undefined) this.font = font;
					if(fillStyle != undefined) this.fillStyle = fillStyle;
					if(textAlign != undefined) this.textAlign = textAlign;
					
					if(context != undefined) {
						this.setStyle(context);
						this.metrics = context.measureText(this.text);
					}
					*/
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
				
				render: function(dt, x, y)
				{
					this.scene.drawText("", this.text, this.style, this.x + x, this.y + y);
				}
				
			}
		);
		
		return Text;
	}
);
