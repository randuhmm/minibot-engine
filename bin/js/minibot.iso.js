

define('minibot.iso/Test',
	[
		'prototype'
	],
	function
	(
		p
	)
	{
		
		var Test = "TESTING 123";
		
		return Test;
		
	}
);

define('minibot.iso',['require','prototype','minibot','minibot.iso/Test'],function(require) {
	
	var minibot_iso = {};
	
	require('prototype');
	require('minibot');
	
	minibot_iso.Test = require('minibot.iso/Test');
	
	return minibot_iso;

});
