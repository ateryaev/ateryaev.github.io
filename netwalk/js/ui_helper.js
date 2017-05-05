/*
	add bind/fire functionality to any object
*/
var BIND_TOUCHSTART = "touchstart"
var BIND_TOUCHMOVE = "touchmove"
var BIND_TOUCHEND = "touchend"
var BIND_TOUCHCANCEL = "touchcancel"

var IS_IPHONE = true;
var IS_IPHONE_568 = false;
var IS_IPAD = false;

function is_touch_device() {
  return !!('ontouchstart' in window);
}
if (!is_touch_device()) {
	BIND_TOUCHSTART = "mousedown"
	BIND_TOUCHMOVE = "mousemove"
	BIND_TOUCHEND = "mouseup"
	BIND_TOUCHCANCEL = "mousecancel"	
}


if (window.innerWidth>330) {
 // document.getElementsByName('viewport')[0].setAttribute('content', 'width=device-width,initial-scale=2.4,user-scalable=no');
  IS_IPAD = true;
  IS_IPHONE = false;
  
} else {
	if (window.innerHeight >480) IS_IPHONE_568 = true;	
}
//alert(window.innerHeight)

/*
function setObservable(obj) {
	obj.event_listners = [];

	
	obj.bind = function(event_type, handler) {
		if (!this.event_listners[event_type]) this.event_listners[event_type] = [];
		this.event_listners[event_type].push(handler);
	}
	
	obj.fire = function(event_type, param) {
//		console.log("EVENT FIRED: "+event_type);
		if (!this.event_listners[event_type]) return;
		for(var tp in this.event_listners[event_type]) {
			this.event_listners[event_type][tp](obj, param);
		}
	}
}
*/
/*
	Make touch and mouse events similar
	X&Y are relative container element
*/
function normalize_jevent(jevent, container) {
	var myevent = jevent.originalEvent;
	if (myevent.touches) {
		myevent.pageY = myevent.touches[0].pageY;
		myevent.pageX = myevent.touches[0].pageX;
	}
	myevent.X = myevent.pageX;
	myevent.Y = myevent.pageY;
    
	if (container) {
		var o = container[0].getBoundingClientRect();//container.position();
		myevent.X -=o.left;
		myevent.Y -=o.top;
        console.log(myevent.X, myevent.Y, container[0].getBoundingClientRect())
        console.log(myevent.X, myevent.Y, container.position().left)
	}
    
	return myevent;
}
