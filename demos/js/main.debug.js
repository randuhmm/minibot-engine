
requirejs.config({
	paths: {
		'minibot': '../../../src/minibot',
		'minibot.iso': '../../../src/minibot.iso',
		'prototype': '../../../lib/prototype'
	},
	shim: {
		'prototype': {
            exports: 'Prototype'
        }
	}
});

requirejs(['startup']);