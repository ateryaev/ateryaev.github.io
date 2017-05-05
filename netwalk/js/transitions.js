var TRANSITION_ROTATION_DELAY =210;
var TRANSITION_MOVE_DELAY = 300;

function hideToRightWithRotation($div, callback, callback_args) {
			$div.addClass("hide_to_right_up");
			window.setTimeout(function(){
				$div.addClass("hidden").removeClass("hide_to_right_up");
				if (callback) window.setTimeout(callback, 10, callback_args);
				
			}, TRANSITION_ROTATION_DELAY);
}

function showFromRightWithRotation($div, callback) {
			$div.removeClass("hidden").addClass("show_from_right_up");
			window.setTimeout(function(){
				$div.removeClass("show_from_right_up");
				if (callback) window.setTimeout(callback, 10);
			}, TRANSITION_ROTATION_DELAY);
}

function hideToLeftWithRotation($div, callback, callback_args) {
			$div.addClass("hide_to_left_up");
			window.setTimeout(function(){
				$div.addClass("hidden").removeClass("hide_to_left_up");
				if (callback) window.setTimeout(callback, 10, callback_args);
			}, TRANSITION_ROTATION_DELAY);
}
function showFromLeftWithRotation($div, callback) {
			$div.removeClass("hidden").addClass("show_from_left_up");
			window.setTimeout(function(){
				$div.removeClass("show_from_left_up");
				if (callback) window.setTimeout(callback, 10);
			}, TRANSITION_ROTATION_DELAY);
}

function showFromLeft($div, callback) {
			$div.removeClass("hidden").addClass("show_from_left");
			window.setTimeout(function(){
				$div.removeClass("show_from_left");
				if (callback) window.setTimeout(callback, 10);
			}, TRANSITION_MOVE_DELAY);
}

function showFromRight($div, callback) {
			$div.removeClass("hidden").addClass("show_from_right");
			window.setTimeout(function(){
				$div.removeClass("show_from_right");
				if (callback) window.setTimeout(callback, 10);
			}, TRANSITION_MOVE_DELAY);
}

function hideToRight($div, callback) {
			$div.removeClass("hidden").addClass("hide_to_right");
			window.setTimeout(function(){
				$div.addClass("hidden").removeClass("hide_to_right");
				if (callback) window.setTimeout(callback, 10);
			}, TRANSITION_MOVE_DELAY);
}
function hideToLeft($div, callback) {
			$div.removeClass("hidden").addClass("hide_to_left");
			window.setTimeout(function(){
				$div.addClass("hidden").removeClass("hide_to_left");
				if (callback) window.setTimeout(callback, 10);
			}, TRANSITION_MOVE_DELAY);
}