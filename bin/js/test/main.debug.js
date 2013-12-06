
requirejs.config({
	paths: {
		'minibot': '../../../src/minibot',
		'minibot/system': '../../../src/minibot/system/web'
	}
});

requirejs(['minibot', 'startup']);
