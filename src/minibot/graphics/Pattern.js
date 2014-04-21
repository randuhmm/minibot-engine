define(
	[

	],
	function
	(

	)
	{
		var Pattern = Class.create(
			/** @lends graphics.Pattern# */
			{
				/** The sprite.
				 * @type resource.SpriteResource
				 */
				sprite: null,

				pattern: null,

				repeat: null,

				/**
				 * Creates a new Pattern instance.
				 * @class Creates a sprite to be rendered.
				 * @constructs
				 * @param {resource.SpriteResource} sprite The sprite to be used.
				 * @param
				 */
				initialize: function(sprite, repeat)
				{
					if(repeat == undefined) repeat = Pattern.REPEAT;

					this.repeat = repeat;
					this.type = Pattern.TYPE;
					this.sprite = sprite;
				},

				hasPattern: function() 
				{
					return this.pattern != null;
				},

				setPattern: function(pattern) 
				{
					this.pattern = pattern;
				},

				getPattern: function() 
				{
					return this.pattern;
				}

				
			}
		);
		
		Pattern.TYPE = "pattern";

		Pattern.REPEAT = 'repeat';
		Pattern.REPEAT_Y = 'repeat-y';
		Pattern.REPEAT_X = 'repeat-x';

		return Pattern;
		
	}
);