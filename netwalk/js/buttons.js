MSG_BUTTON_TOUCHSTART = "MSG_BUTTON_TOUCHSTART";
MSG_BUTTON_TOUCHEND = "MSG_BUTTON_TOUCHEND";

var BUTTONS_UI = new(function() {
	//setObservable(this);
	var THIS = this;
	var p_pressed_button = null;
	var $p_pressed_button = null;
	this.createButtonsFor = function($elements, callback) {
		$elements.unbind();
		
		

		//$elements.bind("mousedown touchstart", function(event){
		$elements.bind(BIND_TOUCHSTART, function(event){
			//console.log("START");
			if ($(this).hasClass("disabled")) return;
			if (p_pressed_button != null) return;
			p_pressed_button = this;
			$p_pressed_button = $(this);
			NotificationCenter.postNotification("button_pressed", this);
			event = normalize_jevent(event);
			this.lastX = event.pageX;
			this.lastY = event.pageY;
			$(this).addClass("pressed");
			NC.postNotification(MSG_BUTTON_TOUCHSTART);
		});

		//$elements.bind("mousemove touchmove", function(event){
		$elements.bind(BIND_TOUCHMOVE, function(event){
			//console.log("MOVE");
			if (p_pressed_button != this) return;
			if ($p_pressed_button.hasClass("disabled")) return;
			if (!$p_pressed_button.hasClass("pressed")) return;
			event = normalize_jevent(event);
			if (Math.abs(event.pageX-this.lastX) > 10 || Math.abs(event.pageY-this.lastY) > 10) {
				$p_pressed_button.removeClass("pressed");		
				NotificationCenter.postNotification("button_canceled", $p_pressed_button);
				p_pressed_button = null;
			}
		});

		//$elements.bind("mouseup touchend", function(event){
		$elements.bind(BIND_TOUCHEND, function(event){
			//console.log("END");
			if (p_pressed_button != this) return;
			if ($p_pressed_button.hasClass("disabled")) return;
			if ($p_pressed_button.hasClass("pressed")) {
				
				if (callback) {
					//var _$p_pressed_button =$p_pressed_button;
					//window.setTimeout(function(){
						//window.location.href = "ios://play";
						//IOS('play');
							callback($p_pressed_button);
							$p_pressed_button.removeClass("pressed");
							//_$p_pressed_button=null;
							p_pressed_button = null;
							NotificationCenter.postNotification("button_released");
					//	},0);
				}
				NC.postNotification(MSG_BUTTON_TOUCHEND);
				
				
			} 
			p_pressed_button = null;
			
		});

/*		$elements.bind(BIND_TOUCHCANCEL, function(event){
			if (p_pressed_button != this) return;
			$p_pressed_button.removeClass("pressed");
			THIS.fire("button_canceled");
//			console.log("button_canceled");
			p_pressed_button = null;
		});*/

	}
	this.destroyButtonsFor = function($elements) {
		$elements.unbind();
	}


});
