NODE ?= node

all:

shot: screenshot.png

.example.html: example.html
	cat $< | sed '/<meta charset/a <base href="file://$(PWD)/">' > $@

screenshot.png: .example.html
	if [ ! -d node_modules/webshot ]; then npm install webshot; fi
	echo "require('webshot')('$<', '$@', {siteType: 'file', shotSize: {width: 552, height: 'all'}}, function () {});" | $(NODE)
