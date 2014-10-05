NODE ?= node

all:

shot: screenshot.png

screenshot.png: example.html
	if [ ! -d node_modules/webshot-cli ]; then npm install webshot-cli; fi
	node_modules/webshot-cli/webshot --shot-size=552/all $< $@
