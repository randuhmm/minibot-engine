
requirejs.config({
	paths: {
		'minibot': '../../bin/js/minibot.web',
		'prototype': '../../lib/prototype'
	}
});

requirejs(['main']);
