# sunz.nz

Sunz Website

## Navigating the project

[app.js](app.js) is the HTTP server. Most of the code in it is just configuration crap though hopefully you can pick out where the request handlers are defined. It responds to `GET "/"` requests by rendering [views/index.jade](views/index.jade) ([jade](http://jade-lang.com) is just being used as a syntax layer over HTML in this case). This sends all the HTML to the browser in one go. As the browser parses it it will make requests for the [images](public/images), [javascript](public/js/index.js), and [css](public/stylesheets/style.css). Conceptually the server responds to these requests by just sending the corresponding file so you don't really need to know much there. However assuming this is the case you would expect the code to be super simple so I'll explain why it is not. I've tried to make it a bit more clever with the images so as not to send big images to small phones which get bogged down trying to render them. So the server downsizes the image if necessary. Also the server resolves all dependencies in the javascript it sends and bundles them with it so it all goes as one big file. All of this gets cached in production too of course.

The javascript is commented to explain what it is doing. The css is and always will be a brainfuck so I'm not even going to bother explaining that.

## Running the server locally

If you have [make](http://www.gnu.org/software/make/) and [packin](http://github.com/jkroso/packin) installed you only have to run `make` in your console. Otherwise run:

```sh
npm install
node app.js
```