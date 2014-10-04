NODE ?= node

all:

shot: screenshot.png

screenshot.png: example.html
	[ ! -f node_modules/webshot ] && npm install webshot
	echo "require('webshot')('$<', '$@', {siteType: 'file', shotSize: {width: 552, height: 'all'}}, function () {});" | $(NODE)
