# See the README for installation instructions.

NODE_PATH ?= ./node_modules
JS_COMPILER = $(NODE_PATH)/uglify-js/bin/uglifyjs
JS_TESTER = $(NODE_PATH)/vows/bin/vows

JS_FILES = \
	d3.tsv.js

all: \
	$(JS_FILES) \
	$(JS_FILES:.js=.min.js) \
	package.json

d3.tsv.js: \
	src/start.js \
	src/tsv/tsv.js \
	src/tsv/parse.js \
	src/tsv/format.js \
	src/end.js

test: all
	@$(JS_TESTER)

%.min.js: %.js Makefile
	@rm -f $@
	$(JS_COMPILER) < $< > $@

d3.%: Makefile
	@rm -f $@
	cat $(filter %.js,$^) > $@
	@chmod a-w $@

install:
	mkdir -p node_modules
	npm install

package.json: d3.tsv.js src/package.js
	node src/package.js > $@

clean:
	rm -f d3*.js
