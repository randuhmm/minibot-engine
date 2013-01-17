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
		
		var Manager = Class.create(
			/** @lends core.Manager# */
			{
				
				/**
				 * Description of constructor.
				 * @class Short description of class.
				 * Long Description of class.
				 * @constructs
				 * @param {String} key The instance key.
				 */
				initialize: function(key)
				{
					if(Manager.instanceMap[key] != null) {
						throw new Error(Manager.MULTITON_MSG);
					}
					Manager.instanceMap[key] = this;
				}
			
			}
		);
		
		Object.extend(Manager,
			/** @lends core.Manager */
			{
				
				/**
				 * The array of instances.
				 * @type Array
				 */
				instanceMap: [],
				
				/**
				 * Error message.
				 * @type String
				 */
				MULTITON_MSG: "Manager instance for this Multiton key already constructed!",
				
				/** 
				 * Static function description.
				 */
				getInstance: function(key)
				{
					if (null == key)
						return null;	
					if(Manager.instanceMap[key] == null) {
						Manager.instanceMap[key] = new Manager(key);
					}
					return Manager.instanceMap[key];
				},
				
				/** 
				 * Static function description.
				 */
				hasCore: function(key)
				{
					return Manager.instanceMap[key] != null;
				},
				
				/** 
				 * Static function description.
				 */
				removeCore: function(key)
				{
					if(Manager.instanceMap[key] == null)
						return;
					delete Manager.instanceMap[key];
				}
			}
		);
		
		return Manager;
		
	}
);
