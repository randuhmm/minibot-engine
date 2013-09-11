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
				/** The x position of the SceneDisplayObject.
				 * @type Number
				 */
				x: 0,
				/** The y position of the SceneDisplayObject.
				 * @type Number
				 */
				y: 0,
				/** The width of the SceneDisplayObject.
				 * @type Number
				 */
				w: 0,
				/** The height position of the SceneDisplayObject.
				 * @type Number
				 */
				h: 0,
				/** The root directory.
				 * @type String
				 */
				root: null,
				/** The current scene.
				 * @type display.scene
				 */
				scene: null,
				/** Indicates whether or not the SceneDisplayObject is able to be seen.
				 * @type boolean
				 */
				isVisible: true,
				
				/**
				 * Creates a new SceneDisplayObject instance.
				 * @class The scenedisplay object manages both the scene as well as the objects to be displayed. 
				 * Objects can be added and removed from the scene while choosing what is to be rendered.
				 * @extends display.DisplayObject
				 * @constructs
				 * @param 
				 */
				initialize: function($super)
				{
					$super();
				},
				/** Renders the SceneDisplayObject and its components.
				 * @param {Number} dt The change in time.
				 * @param {Number} x The x position at which the rendering occurs.
				 * @param {Number} y The y position at which the rendering occurs.
				 */
				render: function(dt, x, y)
				{
					// This function must be overloaded in the sub class
				},
				/** Actions to be triggered when a scene object is added to a scene.
				 *
				 */
				onAddedToScene: function()
				{
					// This callback is triggered when a scene object is added to a scene
				},
				/** Actions to be triggered when a scene object is removed from a scene.
				 *
				 */
				onRemovedFromScene: function()
				{
					// This callback is triggered when a scene object is removed from a scene
				},
				/** Retrieves the scene's X field.
				 * @returns display.scene
				 */
				getSceneX: function()
				{
					var sceneX = 0;
					if(this.parent != null) {
						sceneX += this.parent.getSceneX();
					}
					sceneX += this.x;
					return sceneX;
				},
				/** Retrieves the scene's Y field.
				 * @returns display.scene
				 */
				getSceneY: function()
				{
					var sceneY = 0;
					if(this.parent != null) {
						sceneY += this.parent.getSceneY();
					}
					sceneY += this.y;
					return sceneY;
				},
				/** Sets a root directory.
				 * @param {String} root The root specified.
				 */
				setRoot: function(root)
				{
					this.root = root;
				},
				/** Chooses the current scene.
				 * @param {display.scene} scene The scene to be set.
				 */
				setScene: function(scene)
				{
					this.scene = scene;
				},
				/** Sets the sceneDisplayObject's width.
				 * @param {Number} width The specified width.
				 */
				setWidth: function(width)
				{
					this.w = width;
				},
				/** Sets the sceneDisplayObject's height.
				 * @param {Number} height The specified height.
				 */
				setHeight: function(height)
				{
					this.h = height;
				},
				/** Sets the sceneDisplayObject to be invisible. */
				hide: function()
				{
					this.isVisible = false;
				},
				/** Sets the sceneDisplayObject to be visible. */
				show: function()
				{
					this.isVisible = true;
				}
				
			}
		);
		
		return SceneDisplayObject;
		
	}
);
