# minibot-engine

NODE_PATH=./src
export NODE_PATH


while inotifywait.exe -e modify dist/minibot-browser.js; do \
sleep 1; echo copying...; cp dist/minibot-browser.js ../html5-prototype-mode7/dist/browser/js/lib/; done