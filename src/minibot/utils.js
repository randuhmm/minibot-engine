define(
	[],
	function()
	{

		function decorate(object, traits)
		{   
			for (var accessor in traits) {
				object[accessor]= traits[accessor];
			}    
			
			return object;
		}
		
		function declare(qualifiedName, object, scope)
		{
			var nodes= qualifiedName.split('.')
			,   node= scope || window
			,   lastNode
			,   newNode
			,   nodeName;
			
			for (var i= 0, n= nodes.length; i < n; i++) {
				lastNode= node;
				nodeName= nodes[i];
				
				node= (null == node[nodeName] ? node[nodeName] = {} : node[nodeName]);
			}
			
			if (null == object)
				return node;
								
			return lastNode[nodeName]= object;
		}
		
		function define(classInfo, traits, staticTraits)
		{
			if (!classInfo) {
				classInfo= {};
			}
			
			var className= classInfo.name
			,   classParent= classInfo.parent
			,   doExtend= 'function' === typeof classParent
			,   classConstructor
			,   classScope= classInfo.scope || null
			,   prototype
			
			if ('parent' in classInfo && !doExtend) {
				throw new TypeError('Class parent must be Function');
			}
			
			if(doExtend) {
				classConstructor = Class.create(classParent, traits);
			} else {
				classConstructor = Class.create(traits);
			}
			
			if (staticTraits) {
				decorate(classConstructor, staticTraits)
			}
			
			if (className)
			{
				if ('string' !== typeof className)
				{
					throw new TypeError('Class name must be primitive string');
				}
					
				declare(className, classConstructor, classScope);
			}    
			
			return classConstructor;   
		}
		
		(function() {
			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = 
				  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
			}
		 
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
					  timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
		 
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
			
		}());
		
		return {
			define: define,
			declare: declare,
			decorate: decorate
		};
		
	}
);