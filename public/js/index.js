
/**
 * module dependencies
 */

var bind = require('component/event').bind
var viewport = require('jkroso/viewport')
var Swipe = require('component/swipe')
var flow = require('jkroso/flowtype')

/**
 * initialize a new Swipe instance. This just turns what
 * would of been a plain list of images into a swipe-able
 * slideshow which only shows one image at a time
 */

var swipe = new Swipe(document.getElementById('images'))

/**
 * get references to the left an right arrows shown over the
 * top images
 */

var left = document.getElementsByTagName('svg')[0].firstChild
var right = document.getElementsByTagName('svg')[1].firstChild

/**
 * show/hide the arrows when the swipe instance is showing
 * the first or last image
 */

swipe.on('showing', function(){
	if (swipe.isFirst()) {
		left.classList.add('hidden')
	} else {
		left.classList.remove('hidden')
	}
	if (swipe.isLast()) {
		right.classList.add('hidden')
	} else {
		right.classList.remove('hidden')
	}
})

/**
 * initially show the first image
 */

swipe.show(0)

/**
 * handle left/right keyboard keys
 * @param {Event} e
 */

bind(window, 'keydown', function(e){
	if (e.which == 37/*left*/)  swipe.prev()
	if (e.which == 39/*right*/) swipe.next()
	if (e.which == 39 || e.which == 37) e.preventDefault()
})

/**
 * handle clicks on the swipe arrows
 */

bind(left,  'mousedown', function(){ swipe.prev() })
bind(right, 'mousedown', function(){ swipe.next() })

/**
 * swipe needs to know when the window changes size
 */

viewport.on('resize', function(){
	swipe.refresh()
})

/**
 * pause/play the video when it is clicked
 */

var video = document.querySelector('video')
bind(video, 'click', function() {
	if (video.paused) video.play()
	else video.pause()
})

/**
 * initialize flow on the document. It adjusts the font-size
 * to match the screen width
 */

flow(document.querySelector('.body'), {
	lineRatio: 1.5,
	minWidth: 300,
	min: 14,
	max: 16
})

