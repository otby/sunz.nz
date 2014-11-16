
serve: node_modules
	@node app.js

node_modules: dependencies.json
	@packin install -m $<,package.json,component.json -f $@

built/js/index.js: public/js/index.js
	mkdir -p $$(dirname $@) \
	&& curl http://localhost:3000/js/index.js \
	| minify -l js > $@

built/stylesheets/style.css: public/stylesheets/style.css
	mkdir -p $$(dirname $@) \
	&& curl http://localhost:3000/stylesheets/style.css \
	| minify -l css > $@

build: built/stylesheets/style.css built/js/index.js

test:
	NODE_ENV=production node app.js

.PHONY: build
