NODE ?= node

all:

shot: screenshot.png

screenshot.png: example.html
	if [ ! -d node_modules/webshot ]; then npm install webshot; fi
	echo "require('webshot')('file://$(PWD)/$<', '$@', {shotSize: {width: 552, height: 'all'}}, function (e) {if (e) throw e;});" | $(NODE)
