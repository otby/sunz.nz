var viewport = require('viewport')
var flow = require('flowtype')
var Swipe = require('swipe')
var bind = require('event').bind

var swipe = new Swipe(document.getElementById('images'))
var left = document.getElementsByTagName('svg')[0].firstChild
var right = document.getElementsByTagName('svg')[1].firstChild

swipe.on('showing', function(i, el){
	if (el.previousSibling) {
		left.classList.remove('hidden')
	} else {
		left.classList.add('hidden')
	}
	if (el.nextSibling) {
		right.classList.remove('hidden')
	} else {
		right.classList.add('hidden')
	}
})

swipe.emit('showing', 0, {nextSibling:true})

bind(window, 'keydown', function(e){
	if (e.which == 37/*left*/)  swipe.prev()
	if (e.which == 39/*right*/) swipe.next()
	if (e.which == 39 || e.which == 37) e.preventDefault()
})

var video = document.querySelector('video')
bind(video, 'click', function() {
	if (video.paused) video.play()
	else video.pause()
})

bind(left,  'mousedown', function(){ swipe.prev() })
bind(right, 'mousedown', function(){ swipe.next() })

flow(document.querySelector('.body'), {
	lineRatio: 1.5,
	minWidth: 300,
	min: 14,
	max: 16
})

viewport.on('resize', function(){
	swipe.refresh()
})
