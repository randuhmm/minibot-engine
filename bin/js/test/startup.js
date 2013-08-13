
requirejs(
	['minibot', 'app/Test_01'],
	function(minibot, Test)
	{
		var test = new Test();
	}
);