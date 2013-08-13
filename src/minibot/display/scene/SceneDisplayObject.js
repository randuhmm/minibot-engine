define(
	[
		'minibot/display/DisplayObject'
	],
	function
	(
		DisplayObject
	)
	{
		
		var SceneDisplayObject = Class.create(
			DisplayObject,
			/** @lends display.scene.SceneDisplayObject# */
			{
				
				x: 0,
				
				y: 0,
				
				w: 0,
				
				h: 0,
				
				root: null,
				
				scene: null,
				
				isVisible: true,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
				},
				
				render: function(dt, x, y)
				{
					// This function must be overloaded in the sub class
				},
				
				onAddedToScene: function()
				{
					// This callback is triggered when a scene object is added to a scene
				},
				
				onRemovedFromScene: function()
				{
					// This callback is triggered when a scene object is removed from a scene
				},
				
				getSceneX: function()
				{
					var sceneX = 0;
					if(this.parent != null) {
						sceneX += this.parent.getSceneX();
					}
					sceneX += this.x;
					return sceneX;
				},
				
				getSceneY: function()
				{
					var sceneY = 0;
					if(this.parent != null) {
						sceneY += this.parent.getSceneY();
					}
					sceneY += this.y;
					return sceneY;
				},
				
				setRoot: function(root)
				{
					this.root = root;
				},
				
				setScene: function(scene)
				{
					this.scene = scene;
				},
				
				setWidth: function(width)
				{
					this.w = width;
				},
				
				setHeight: function(height)
				{
					this.h = height;
				},
				
				hide: function()
				{
					this.isVisible = false;
				},
				
				show: function()
				{
					this.isVisible = true;
				}
				
			}
		);
		
		return SceneDisplayObject;
		
	}
);
