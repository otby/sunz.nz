var viewport = require('viewport')
var flow = require('flowtype')
var Swipe = require('swipe')
var bind = require('event').bind

var swipe = new Swipe(document.getElementById('images'))
var svg = document.getElementsByTagName('svg')[0]
var left = svg.firstChild
var right = svg.lastChild

function place(arrow, offset){
	var d = arrow.getAttribute('d')
	arrow.setAttribute('d', d.replace(/-?\d+/, offset.toFixed(0)))
}

function placeArrows(){
	place(left, -(viewport.width/2) + 50)
	place(right, (viewport.width/2) - 50)
}

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
	placeArrows()
})

viewport.emit('resize')
