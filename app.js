
var cookieParser = require('cookie-parser')
var errorHandler = require('errorhandler')
var favicon = require('serve-favicon')
var compress = require('compression')
var express = require('express')
var logger = require('morgan')
var mktmp = require('mktmp')
var path = require('path')
var gm = require('gm').subClass({ imageMagick: true })
var fs = require('fs')

var app = express()

app.engine('jade', require('jade').__express)
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.locals.title = 'Sea Urchin New Zealand'
app.use(favicon(__dirname + '/public/images/favicon.ico'))
if (app.get('env') == 'development') app.use(logger('dev'))
app.use(compress())
app.use(cookieParser())

app.get('/', function index(req, res){
	res.render('index')
})

var dir = mktmp.createDirSync('XXX-resized-images') + path.sep

app.get('/images/:name', function(req, res, next){
	var max = req.cookies.resolution
	var master = path.join(__dirname, 'public', req.path)
	if (!max) res.sendFile(master)
	var name = dir + max + ':' + req.params.name
	fs.exists(name, function(exists){
		if (exists) return res.sendFile(name)
		gm(master)
			.resize(max, max, '>')
			.write(name, function(e){
				if (e) return next(e)
				res.sendFile(name)
			})
	})
})

if (app.get('env') == 'development') {
	var Duo = require('duo')
	app.get('/js/index.js', function(req, res, next){
		Duo(__dirname)
			.entry('./public/js/index.js')
			.development(true)
			.run(function(err, src){
				if (err) return next(err)
				res.type('application/javascript')
				res.end(src)
			})
	})
}

if (app.get('env') == 'production') {
	app.use(express.static(path.join(__dirname, 'built')))
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(errorHandler())

app.listen(app.get('port'), function(){
	console.log('http://localhost:%d', app.get('port'))
})
