define(
	[
		'minibot/graphics/Color'
	],
	function
	(
		Color
	)
	{
		
		var TextStyle = Class.create(
			/** @lends display.scene.TextStyle# */
			{
				
				family: null,
				
				size: null,
				
				align: null,
				
				color: null,

				weight: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} family
				 * @param {int} size
				 * @param {String} color
				 * @param {String} align
				 * @param 
				 */
				initialize: function(family, size, color, align, weight)
				{
					
					this.family = family;
					this.size = size;
					this.color = color;
					this.align = align;
					this.weight = (weight)?(weight):('');
					
				},
				
				getFamily: function()
				{
					return this.family;
				},
				
				getSize: function()
				{
					return this.size;
				},
				
				getColor: function()
				{
					return this.color;
				},
				
				getAlign: function()
				{
					return this.align;
				},
				
				getWeight: function()
				{
					return this.weight;
				}
				
			}
		);
		
		return TextStyle;
	}
);
