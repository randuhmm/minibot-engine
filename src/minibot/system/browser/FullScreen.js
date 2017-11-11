

var FullScreen = {}

FullScreen.start = function(root, options) {
    if(FullScreen.isActive) return false;

    if(root === null || root === undefined) {
        throw new Error("FullScreen: Required parameter 'root' is not present");
    }
    if(options === null || options === undefined) options = {};
    if(!('backgroundColor' in options)) options.backgroundColor = '#000000';

    FullScreen.isActive = true;
    FullScreen.root = root;
    FullScreen.options = options;
    FullScreen._request();
    return true;
};


FullScreen.exit = function() {
    document.webkitExitFullscreen();
};


FullScreen.size = function() {
    return FullScreen.root.getBoundingClientRect();
};


FullScreen._init = function() {
    FullScreen.isActive = false;
    FullScreen.isReady = false;
    FullScreen.root = null;
    FullScreen.options = null;
};


FullScreen._onReady = function() {
    FullScreen.isReady = true;
    // Callback, wait 200ms for the screen & DOM to normalize
    setTimeout(function() {
        if(FullScreen.options && 'onReady' in FullScreen.options) FullScreen.options.onReady();
    }, 200);
}


FullScreen._onExit = function() {
    // Callback
    if(FullScreen.options && 'onExit' in FullScreen.options) FullScreen.options.onExit();
    FullScreen._init();
}


FullScreen._request = function() {
    // Request fullscreen
    // TODO: Allow cross-platform with polyfill or other
    var root = FullScreen.root;
    if (root.webkitRequestFullscreen) {
        document.addEventListener('webkitfullscreenchange', FullScreen._onFullscreenChange);
        root.webkitRequestFullscreen();
    }
}


FullScreen._onFullscreenChange = function(event) {
    var root = FullScreen.root;
    if(document.webkitIsFullScreen) {
        console.log("Enter Fullscreen");
        root.style.width = '100%';
        root.style.height = '100%';
        root.style.backgroundColor = FullScreen.options.backgroundColor;
        FullScreen._onReady();
    } else {
        console.log("Exit Fullscreen");
        FullScreen._onExit();
    }
};

FullScreen._init();

export default FullScreen;
