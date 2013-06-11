/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[],
	function()
	{
		
		var Rectangle = Class.create(
			/** @lends geom.Rectangle# */
			{
				
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 */
				initialize: function(x, y, w, h)
				{
					this.x = x;
					this.y = y;
					this.w = w;
					this.h = h;
				}
				
				
			}
		);
		
		return Rectangle;
		
	}
);
