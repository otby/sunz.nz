
var cookieParser = require('cookie-parser')
var errorHandler = require('errorhandler')
var favicon = require('serve-favicon')
var compress = require('compression')
var express = require('express')
var logger = require('morgan')
var http = require('http')
var path = require('path')
var gm = require('gm').subClass({ imageMagick: true })
var fs = require('fs')

if (!fs.existsSync(__dirname + '/tmp')) {
	fs.mkdirSync(__dirname + '/tmp')
}

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

if (app.get('env') == 'development') {
	app.use(require('serve-js')(path.join(__dirname, 'public')))
}

if (app.get('env') == 'production') {
	app.use(express.static(path.join(__dirname, 'built')))
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function index(req, res){
	res.render('index')
})

app.get('/images/:name', function(req, res, next){
	var max = req.cookies.resolution
	var master = __dirname + '/public' + req.path
	if (!max) res.sendfile(master)
	var name = __dirname + '/tmp/' + max + ':' + req.params.name
	fs.exists(name, function(exists){
		if (exists) return res.sendfile(name)
		gm(master)
			.resize(max, max, '>')
			.write(name, function(e){
				if (e) return next(e)
				res.sendfile(name)
			})
	})
})

app.use(errorHandler())

http.createServer(app).listen(app.get('port'), function(){
	console.log('http://localhost:%d', app.get('port'))
})
