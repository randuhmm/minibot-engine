
requirejs.config({
	paths: {
		'minibot': '../../bin/js/minibot',
		'prototype': '../../lib/prototype'
	}
});

requirejs(['main']);
