// see a complete list of options here:
// https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
	// all modules loaded are relative to this path
	// e.g. require(["grid/core"]) would grab /lib/grid/core.js
	baseUrl: "../../src",
	
	// target amd loader shim as the main module, path is relative to baseUrl.
	name: "../lib/almond",
	
	include: ["minibot"],
	
	paths: {
        "minibot/system": "minibot/system/wrapper"
	},
	
	optimize: "none",
	
	pragmas: {
		BROWSER: false,
		WRAPPER: true
	},
	
	wrap: {
		startFile:	"start.frag",
		endFile:	"end.frag"
	},
	
	// build file destination, relative to the build file itself
	out: "../../bin/js/minibot.wrapper.js"
	
})
