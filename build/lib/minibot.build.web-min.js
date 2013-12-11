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
        "minibot/system": "minibot/system/web"
	},
	
	pragmas: {
		BROWSER: true,
		WINDOWS: false
	},
	
	wrap: {
		startFile:	"start.frag",
		endFile:	"end.frag"
	},
	
	// allow super variables in minified code 
	uglify: {
		except: ["$super"]
	},
	
	// build file destination, relative to the build file itself
	out: "../../bin/js/minibot.web-min.js"
	
})