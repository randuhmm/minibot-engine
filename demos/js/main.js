
requirejs.config({
	paths: {
		'minibot': '../minibot',
		'minibot.iso': '../minibot.iso',
		'prototype': '../../../lib/prototype'
	},
	shim: {
		'prototype': {
            exports: 'Prototype'
        }
	}
});

requirejs(['startup']);
