
requirejs.config({
	paths: {
		'minibot': '../../src/minibot',
		'minibot/system': '../../src/minibot/system/web',
		'prototype': '../../lib/prototype'
	}
});

requirejs(['main']);
