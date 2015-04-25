
serve: node_modules
	@node --harmony-generators app.js

node_modules: package.json
	@packin install -m $< -f $@

built/js/index.js: public/js/index.js
	mkdir -p $$(dirname $@) \
	&& curl http://localhost:3000/js/index.js \
	| minify -js > $@

built/stylesheets/style.css: public/stylesheets/style.css
	mkdir -p $$(dirname $@) \
	&& curl http://localhost:3000/stylesheets/style.css \
	| minify -css > $@

build: built/stylesheets/style.css built/js/index.js

test:
	NODE_ENV=production node app.js

.PHONY: build
