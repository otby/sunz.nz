!function t(e,n,i){function r(t){if(n[t])return n[t].exports;if(e[t])return s(t,r);throw new Error('cannot find module "'+t+'"')}function s(r,s){var o=n[r]={exports:{}},h=e[r],a=h[2],c=h[0];return c.call(o.exports,function(t){var n=e[r][1][t];return s(n?n:t)},o,o.exports,t,e,n,i),a&&(n[a]=n[r]),n[r].exports}var o=function(){return this}();for(var h in i)i[h]?o[i[h]]=r(h):r(h);return r.duo=!0,r.cache=n,r.modules=e,r}({1:[function(t){var e=t("component/event").bind,n=t("jkroso/viewport"),i=t("component/swipe"),r=t("jkroso/flowtype"),s=new i(document.getElementById("images")),o=document.getElementsByTagName("svg")[0].firstChild,h=document.getElementsByTagName("svg")[1].firstChild;s.on("showing",function(){s.isFirst()?o.classList.add("hidden"):o.classList.remove("hidden"),s.isLast()?h.classList.add("hidden"):h.classList.remove("hidden")}),s.show(0),e(window,"keydown",function(t){37==t.which&&s.prev(),39==t.which&&s.next(),(39==t.which||37==t.which)&&t.preventDefault()});var a=document.querySelector("video");e(a,"click",function(){a.paused?a.play():a.pause()}),e(o,"mousedown",function(){s.prev()}),e(h,"mousedown",function(){s.next()}),r(document.querySelector(".body"),{lineRatio:1.5,minWidth:300,min:14,max:16}),n.on("resize",function(){s.refresh()})},{"component/event":2,"jkroso/viewport":3,"component/swipe":4,"jkroso/flowtype":5}],2:[function(t,e,n){var i=window.addEventListener?"addEventListener":"attachEvent",r=window.removeEventListener?"removeEventListener":"detachEvent",s="addEventListener"!==i?"on":"";n.bind=function(t,e,n,r){return t[i](s+e,n,r||!1),n},n.unbind=function(t,e,n,i){return t[r](s+e,n,i||!1),n}},{}],3:[function(t,e,n){function i(){n.height=o.clientHeight,n.width=o.clientWidth}function r(){n.top=window.scrollY,n.left=window.scrollX,n.right=n.left+n.width,n.bottom=n.top+n.height}var s=t("emitter");s(n);var o=document.getElementsByTagName("html")[0];window.addEventListener("resize",function(){i(),r(),n.emit("resize",n)},!0),window.addEventListener("scroll",function(){r(),n.emit("scroll",n)},!0),i(),r()},{emitter:6}],6:[function(t,e){function n(t){return t?r(t,n.prototype):void 0}function i(t){return r({},t)}var r=t("merge"),s=Object.hasOwnProperty,o=Function.call;e.exports=n,n.prototype.emit=function(t){var e=this._events;if(!e||!(e=e[t]))return this;if("function"==typeof e)switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;case 4:e.call(this,arguments[1],arguments[2],arguments[3]);break;default:t=this,o.apply(e,arguments)}else{var n=0,i=e.length;switch(arguments.length){case 1:for(;i>n;)e[n++].call(this);break;case 2:for(;i>n;)e[n++].call(this,arguments[1]);break;case 3:for(;i>n;)e[n++].call(this,arguments[1],arguments[2]);break;case 4:for(;i>n;)e[n++].call(this,arguments[1],arguments[2],arguments[3]);break;default:for(t=this;i>n;)o.apply(e[n++],arguments)}}return this},n.prototype.on=function(t,e){s.call(this,"_events")||(this._events=i(this._events));var n=this._events;return n[t]="function"==typeof n[t]?[n[t],e]:n[t]?n[t].concat(e):e,this},n.prototype.off=function(t,e){if(!this._events)return this;s.call(this,"_events")||(this._events=i(this._events));var n=this._events;if(null==t)for(var r in n)delete n[r];else if(null==e)delete n[t];else{var o=n[t];if(!o)return this;"function"==typeof o?o===e&&delete n[t]:(o=n[t]=o.filter(function(t){return t!==e}),1==o.length?n[t]=o[0]:o.length||delete n[t])}return this},n.prototype.once=function(t,e){var n=this;return this.on(t,function i(){n.off(t,i),e.apply(this,arguments)})},n.hasSubscription=function(t,e,i){var r=n.subscriptions(t,e);return null==i?Boolean(r.length):r.indexOf(i)>=0},n.subscriptions=function(t,e){var n=t._events;return n&&(n=n[e])?"function"==typeof n?[n]:n.slice():[]}},{merge:7}],7:[function(t,e){e.exports=function(t,e){for(var n in e)t[n]=e[n];return t}},{}],4:[function(t,e){function n(t){if(!(this instanceof n))return new n(t);if(!t)throw new TypeError("Swipe() requires an element");this.child=t.children[0],this.touchAction("none"),this.currentEl=this.children().visible[0],this.currentVisible=0,this.current=0,this.el=t,this.refresh(),this.interval(5e3),this.duration(300),this.fastThreshold(200),this.threshold(.5),this.show(0,0,{silent:!0}),this.bind()}function i(t,e){for(var n=0;n<t.length;n++)if(t[n]==e)return n;return-1}function r(t){return"none"!=c(t).display}var s=t("transitionend-property"),o=t("transform-property"),h=t("touchaction-property"),a=t("has-translate3d"),c=t("computed-style"),u=t("emitter"),l=t("event"),d=t("events"),f=Math.min,p=Math.max;e.exports=n,u(n.prototype),n.prototype.threshold=function(t){this._threshold=t},n.prototype.fastThreshold=function(t){this._fastThreshold=t},n.prototype.refresh=function(){var t=this.children(),e=t.visible.length,n=this.visible||e,r=i(t.visible,this.currentEl);n>e&&r<=this.currentVisible&&r>=0?this.currentVisible-=this.currentVisible-r:e>n&&r>this.currentVisible&&(this.currentVisible+=r-this.currentVisible),this.visible=e,this.childWidth=this.el.getBoundingClientRect().width,this.width=Math.ceil(this.childWidth*e),this.child.style.width=this.width+"px",this.child.style.height=this.height+"px",this.show(this.currentVisible,0,{silent:!0})},n.prototype.bind=function(){this.events=d(this.child,this),this.docEvents=d(document,this),this.events.bind("mousedown","ontouchstart"),this.events.bind("mousemove","ontouchmove"),this.docEvents.bind("mouseup","ontouchend"),this.events.bind("touchstart"),this.events.bind("touchmove"),this.docEvents.bind("touchend"),this.events.bind("PointerDown","ontouchstart"),this.events.bind("PointerMove","ontouchmove"),this.docEvents.bind("PointerUp","ontouchstart")},n.prototype.unbind=function(){this.events.unbind(),this.docEvents.unbind()},n.prototype.ontouchstart=function(t){this.transitionDuration(0),this.dx=0,this.updown=null;var e=this.getTouch(t);this.down={x:e.pageX,y:e.pageY,at:new Date}},n.prototype.ontouchmove=function(t){if(this.down&&!this.updown){var e=this.getTouch(t);if(e){var n=this.down,i=e.pageX,r=this.childWidth,s=this.currentVisible;if(this.dx=i-n.x,null==this.updown){var o=e.pageY,h=o-n.y,a=h/this.dx;if(a>1||-1>a)return void(this.updown=!0);this.updown=!1}t.preventDefault();var c=this.dx<0?1:0;this.isFirst()&&0==c&&(this.dx/=2),this.isLast()&&1==c&&(this.dx/=2),this.translate(s*r+-this.dx)}}},n.prototype.ontouchend=function(t){if(t.stopPropagation(),this.down){var e=this.getTouch(t),n=this.dx,i=(e.pageX,this.childWidth),r=new Date-this.down.at,s=r<this._fastThreshold?i/10:i*this._threshold,o=0>n?1:0,h=Math.abs(n)>=s;return this.down=null,this.isFirst()&&1==o&&h?this.next():this.isFirst()?this.prev():this.isLast()&&1==o?this.next():1==o&&h?this.next():0==o&&h?this.prev():void this.show(this.currentVisible)}},n.prototype.duration=function(t){return this._duration=t,this},n.prototype.interval=function(t){return this._interval=t,this},n.prototype.play=function(){return this.timer?void 0:(this.timer=setInterval(this.cycle.bind(this),this._interval),this)},n.prototype.stop=function(){return clearInterval(this.timer),this.timer=null,this},n.prototype.cycle=function(){this.isLast()?(this.currentVisible=-1,this.next()):this.next()},n.prototype.isFirst=function(){return 0==this.currentVisible},n.prototype.isLast=function(){return this.currentVisible==this.visible-1},n.prototype.prev=function(){return this.show(this.currentVisible-1),this},n.prototype.next=function(){return this.show(this.currentVisible+1),this},n.prototype.show=function(t,e,n){n=n||{},null==e&&(e=this._duration);var r=this,o=this.children();if(t=p(0,f(t,o.visible.length-1)),this.currentVisible=t,this.currentEl=o.visible[t],this.current=i(o.all,this.currentEl),this.transitionDuration(e),this.translate(this.childWidth*t),!n.silent){if(this.emit("showing",this.current,this.currentEl),!e)return this;l.bind(this.child,s,function h(){r.current==t&&r.emit("show",r.current,r.currentEl),l.unbind(r.child,s,h)})}return this},n.prototype.children=function(){for(var t=this.child.children,e={all:t,visible:[],hidden:[]},n=0;n<t.length;n++){var i=t[n];r(i)?e.visible.push(i):e.hidden.push(i)}return e},n.prototype.transitionDuration=function(t){var e=this.child.style;e.webkitTransition=t+"ms -webkit-transform",e.MozTransition=t+"ms -moz-transform",e.msTransition=t+"ms -ms-transform",e.OTransition=t+"ms -o-transform",e.transition=t+"ms transform"},n.prototype.translate=function(t){var e=this.child.style;t=-t,e[o]=a?"translate3d("+t+"px, 0, 0)":"translateX("+t+"px)"},n.prototype.touchAction=function(t){var e=this.child.style;h&&(e[h]=t)},n.prototype.getTouch=function(t){var e=t;return t.changedTouches&&t.changedTouches.length>0&&(e=t.changedTouches[0]),e}},{"transitionend-property":8,"transform-property":9,"touchaction-property":10,"has-translate3d":11,"computed-style":12,emitter:13,event:2,events:14}],8:[function(t,e){var n={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},i=document.createElement("p");for(var r in n)if(null!=i.style[r]){e.exports=n[r];break}},{}],9:[function(t,e){for(var n,i=["webkitTransform","MozTransform","msTransform","OTransform","transform"],r=document.createElement("p"),s=0;s<i.length;s++)if(n=i[s],null!=r.style[n]){e.exports=n;break}},{}],10:[function(t,e){function n(t){t||(t=document);var e=t.createElement("div"),n=null;return"touchAction"in e.style?n="touchAction":"msTouchAction"in e.style&&(n="msTouchAction"),e=null,n}e.exports=n()},{}],11:[function(t,e){var n=t("transform-property");if(n&&window.getComputedStyle){var i={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"},r=document.createElement("div");r.style[n]="translate3d(1px,1px,1px)",document.body.insertBefore(r,null);var s=getComputedStyle(r).getPropertyValue(i[n]);document.body.removeChild(r),e.exports=null!=s&&s.length&&"none"!=s}else e.exports=!1},{"transform-property":9}],12:[function(t,e){e.exports=window.getComputedStyle,e.exports||(e.exports=function(t){return t.currentStyle})},{}],13:[function(t,e){function n(t){return t?i(t):void 0}function i(t){for(var e in n.prototype)t[e]=n.prototype[e];return t}e.exports=n,n.prototype.on=n.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks[t]=this._callbacks[t]||[]).push(e),this},n.prototype.once=function(t,e){function n(){i.off(t,n),e.apply(this,arguments)}var i=this;return this._callbacks=this._callbacks||{},n.fn=e,this.on(t,n),this},n.prototype.off=n.prototype.removeListener=n.prototype.removeAllListeners=n.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks[t];if(!n)return this;if(1==arguments.length)return delete this._callbacks[t],this;for(var i,r=0;r<n.length;r++)if(i=n[r],i===e||i.fn===e){n.splice(r,1);break}return this},n.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks[t];if(n){n=n.slice(0);for(var i=0,r=n.length;r>i;++i)n[i].apply(this,e)}return this},n.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks[t]||[]},n.prototype.hasListeners=function(t){return!!this.listeners(t).length}},{}],14:[function(t,e){function n(t,e){if(!(this instanceof n))return new n(t,e);if(!t)throw new Error("element required");if(!e)throw new Error("object required");this.el=t,this.obj=e,this._events={}}function i(t){var e=t.split(/ +/);return{name:e.shift(),selector:e.join(" ")}}var r=t("event"),s=t("delegate");e.exports=n,n.prototype.sub=function(t,e,n){this._events[t]=this._events[t]||{},this._events[t][e]=n},n.prototype.bind=function(t,e){function n(){var t=[].slice.call(arguments).concat(u);a[e].apply(a,t)}var o=i(t),h=this.el,a=this.obj,c=o.name,e=e||"on"+c,u=[].slice.call(arguments,2);return o.selector?n=s.bind(h,o.selector,c,n):r.bind(h,c,n),this.sub(c,e,n),n},n.prototype.unbind=function(t,e){if(0==arguments.length)return this.unbindAll();if(1==arguments.length)return this.unbindAllOf(t);var n=this._events[t];if(n){var i=n[e];i&&r.unbind(this.el,t,i)}},n.prototype.unbindAll=function(){for(var t in this._events)this.unbindAllOf(t)},n.prototype.unbindAllOf=function(t){var e=this._events[t];if(e)for(var n in e)this.unbind(t,n)}},{event:2,delegate:15}],15:[function(t,e,n){var i=t("closest"),r=t("event");n.bind=function(t,e,n,s,o){return r.bind(t,n,function(n){var r=n.target||n.srcElement;n.delegateTarget=i(r,e,!0,t),n.delegateTarget&&s.call(t,n)},o)},n.unbind=function(t,e,n,i){r.unbind(t,e,n,i)}},{closest:16,event:2}],16:[function(t,e){var n=t("matches-selector");e.exports=function(t,e,i,r){for(t=i?{parentNode:t}:t,r=r||document;(t=t.parentNode)&&t!==document;){if(n(t,e))return t;if(t===r)return}}},{"matches-selector":17}],17:[function(t,e){function n(t,e){if(!t||1!==t.nodeType)return!1;if(s)return s.call(t,e);for(var n=i.all(e,t.parentNode),r=0;r<n.length;++r)if(n[r]==t)return!0;return!1}var i=t("query"),r=Element.prototype,s=r.matches||r.webkitMatchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector;e.exports=n},{query:18}],18:[function(t,e,n){function i(t,e){return e.querySelector(t)}n=e.exports=function(t,e){return e=e||document,i(t,e)},n.all=function(t,e){return e=e||document,e.querySelectorAll(t)},n.engine=function(t){if(!t.one)throw new Error(".one callback required");if(!t.all)throw new Error(".all callback required");return i=t.one,n.all=t.all,n}},{}],5:[function(t,e){var n=t("viewport"),i=t("merge");e.exports=function(t,e){function r(){var e=parseFloat(getComputedStyle(t).width),n=(e-s)/h,i=a+c*n;t.style.lineHeight=i*u+"px",t.style.fontSize=i+"px"}e=i({min:14,max:18,lineRatio:1.45,minWidth:getComputedStyle(t).minWidth,maxWidth:getComputedStyle(t).maxWidth},e);var s=parseFloat(e.minWidth),o=parseFloat(e.maxWidth),h=o-s,a=e.min,c=e.max-a,u=e.lineRatio;n.on("resize",r),r()}},{viewport:3,merge:7}]},{},{1:""});