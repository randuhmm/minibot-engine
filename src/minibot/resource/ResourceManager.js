/** 
 * @fileoverview 
 *
 * @author Jonny Morrill jonny@morrill.me
 * @version 0.1
 */
define(
	[
		'minibot/core/Manager'
	],
	function
	(
		Manager
	)
	{
		var ResourceManager = Class.create(
			Manager,
			/** @lends resource.ResourceManager# */
			{
				
				typeOrder: null,
				typeCount: null,
				
				typeMap: null,
				
				resourceMap: null,
				
				resourceCount: 0,
				loadedCount: 0,
				typeIndex: null,
				typeLoadedCount: 0,
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @extends core.Manager
				 * @constructs
				 * @param {String} key The instance key.
				 * @param 
				 */
				initialize: function($super, key)
				{
					$super(key);
					this.typeOrder = [];
					this.typeCount = [];
					this.typeMap = {};
					this.resourceMap = {};
				},
				
				addType: function(type, className)
				{
					this.typeOrder.push(type);
					this.typeCount.push(0);
					this.typeMap[type] = className;
					this.resourceMap[type] = {};
				},
				
				addResource: function(type, id, data)
				{
					if(this.typeMap[type] == undefined) return;
					var className = this.typeMap[type];
					var resource = new className(id, data);
					this.resourceMap[type][id] = resource;
					this.resourceCount += 1;
					
					for(var i = 0; i < this.typeOrder.length; i++) {
						if(type == this.typeOrder[i]) {
							this.typeCount[i] += 1;
							break;
						}
					}
					
				},
				
				loadAll: function(progressCallback, completeCallback)
				{
					this.progressCallback = progressCallback;
					this.completeCallback = completeCallback;
					
					this.typeIndex = null;
					this.loadNextType();
					
				},
				
				loadNextType: function()
				{
					if(this.typeIndex == null) {
						this.typeIndex = 0;
					} else {
						this.typeIndex += 1;
					}
					
					if(this.typeIndex >= this.typeOrder.length) {
						this.completeCallback.bind(this).defer();
						return;
					}
					
					this.typeLoadedCount = 0;
					
					var type = this.typeOrder[this.typeIndex];
					var resources;
					var id;
					resources = this.resourceMap[type];
					for(id in resources) {
						this.loadResource(type, id);
					}
				},
				
				loadResource: function(type, id)
				{
					var resource = this.resourceMap[type][id];
					if(resource.isLoaded()) {
						this.handleResourceLoaded();
					} else {
						resource.load(this, this.handleResourceLoaded.bind(this));
					}
				},
				
				handleResourceLoaded: function()
				{
					this.typeLoadedCount += 1;
					var progress = Number(1 / this.resourceCount);
					this.progressCallback(progress);
					
					if(this.typeLoadedCount >= this.typeCount[this.typeIndex]) {
						this.loadNextType.bind(this).defer();
					}
				},
				
				getResource: function(type, id)
				{
					if(this.resourceMap[type] == undefined) return null;
					if(this.resourceMap[type][id] == undefined) return null;
					
					return this.resourceMap[type][id];
				}
				
			}
			
		);
		
		Object.extend(
			ResourceManager,
			/** @lends core.Manager */
			{
				getInstance: function(key)
				{
					if (!Manager.hasCore(key)) {
						new ResourceManager(key);
					}
					var retVal = Manager.getInstance(key);
					return retVal;
				}
			}
		);
		
		return ResourceManager;
		
	}
);
