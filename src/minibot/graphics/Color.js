define(
	[
		
	],
	function
	(
		
	)
	{
		
		var Color = Class.create(
			/** @lends graphics.Color# */
			{
				
				r: null,
				
				g: null,
				
				b: null,
				
				h: null,
				
				s: null,
				
				l: null,
				
				a: null,
				
				mode: null,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.canvas.CanvasDisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function(mode, v1, v2, v3, a)
				{
					this.setColor(mode, v1, v2, v3, a);
				},
				
				// Public Methods -->
				
				setColor: function(mode, v1, v2, v3, a)
				{
					this.mode = mode;
					this.a = ((a != undefined)?(a):(1.0));
					if(mode == Color.RGB) {
						this.r = v1;
						this.g = v2;
						this.b = v3;
					} else if(mode == Color.HSL) {
						this.h = v1;
						this.s = v2;
						this.l = v3;
						var rgb = Color.HslToRgb(this.h, this.s, this.l);
						this.r = Math.round(rgb[0]);
						this.g = Math.round(rgb[1]);
						this.b = Math.round(rgb[2]);
					} else {
						throw new Error("Color: unrecognized color mode.");
					}
				},
				
				getAsArray: function(mode)
				{
					if(mode == Color.RGB) {
						return [this.r, this.g, this.b, this.a];
					} else if(mode == Color.HSL) {
						return [this.h, this.s, this.l, this.a];
					} else {
						throw new Error("Color: unrecognized color mode.");
					}
				},
				
				getAsString: function(mode, spacer)
				{
					spacer = ((spacer == undefined)?(","):(spacer));
					return this.getAsArray(mode).join(spacer);
				}
				
				// <-- Public Methods
				
				
				
				
			}
		);
		
		Color.RgbToHsl = function(r, g, b)
		{
		};
		
		Color.HslToRgb = function(h, s, l)
		{
			if(s <= 0) { return [l,l,l]; }
			h = h / 256 * 6;
			s = s / 255;
			l = l / 255
			var	c = (1 - Math.abs(2 * l - 1)) * s,
				x = (1 - Math.abs(h % 2 - 1)) * c,
				m = (l - 0.5 * c),
				r = 0,
				g = 0,
				b = 0;
				
					if(h < 1)	{ r = c; g = x; b = 0 }
			else	if(h < 2)	{ r = x; g = c; b = 0 }
			else	if(h < 3)	{ r = 0; g = c; b = x }
			else	if(h < 4)	{ r = 0; g = x; b = c }
			else	if(h < 5)	{ r = x; g = 0; b = c }
			else				{ r = c; g = 0; b = x }
			
			return [(r+m)*255,(g+m)*255,(b+m)*255]
		};
		
		Color.FromHex = function(hex)
		{
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if(result) {
				return new Color(
					Color.RGB,
					parseInt(result[1], 16), // r
					parseInt(result[2], 16), // g
					parseInt(result[3], 16)  // b
				);
			} else {
				return null;
			}
			return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
			} : null;
		};
		
		Color.RGB = "rgb";
		Color.HSL = "hsl";
		
		return Color;
		
	}
);
