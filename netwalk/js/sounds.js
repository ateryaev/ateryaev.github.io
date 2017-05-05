function InitSound() {
	function playEffect(mp3, vol, pitch) {
		if (!GameStorage.isSoundOn()) return;
		//console.log(mp3);
        if (!vol) vol = 1;
        if (!pitch) pitch = 1;
        //window.location.href="ios://play/"+mp3+":"+vol+":"+pitch;
        IOS('play', mp3+":"+vol+":"+pitch);
	}
	
	NotificationCenter.addObserver(MSG_GAME_FIELD_CELL_ROTATED, function(msg, options){
		playEffect("sfx/cell_end.mp3", 1, 1);
		//playEffect("MSG_GAME_FIELD_CELL_TOUCHSTART");
	});
	
	NotificationCenter.addObserver(MSG_GAME_FIELD_CELL_TOUCHSTART, function(msg, options){
		playEffect("sfx/cell_over.mp3", 1, 1);
		//playEffect("MSG_GAME_FIELD_CELL_ROTATED");
	});
	
	NotificationCenter.addObserver(MSG_GAME_SOLVED, function(msg, options){
		//playEffect("MSG_GAME_SOLVED");
		//playEffect("sfx/gameover.mp3", 1, 1);
		window.setTimeout(playEffect, 500, "sfx/gameover.mp3");
	});
	
	NotificationCenter.addObserver(MSG_BUTTON_TOUCHSTART, function(msg, options){
		playEffect("sfx/short.mp3", 1, 2.0);

	});
	NotificationCenter.addObserver(MSG_BUTTON_TOUCHEND, function(msg, options){
		playEffect("sfx/short.mp3", 1, 2.2);

	});
	
	NotificationCenter.addObserver(MSG_CELL_LINE_TOGGLE_1, function(msg, options){
		//playEffect("MSG_CELL_LINE_TOGGLE");
		playEffect("sfx/short.mp3", 0.6, 1.8);
	});
	NotificationCenter.addObserver(MSG_CELL_LINE_TOGGLE_2, function(msg, options){
		//playEffect("MSG_CELL_LINE_TOGGLE");
		playEffect("sfx/short.mp3", 0.6, 2.0);
	});
	
	
}

function SetBgMusic(on) {
	window.setTimeout(function(){
		//window.location.href=on?"ios://playbg/sfx/relaxing.mp3:1.0:1.0":"ios://stopbg/";
		if (on) IOS('playbg', "sfx/relaxing.mp3:1.0:1.0" );
		else IOS('stopbg');
	}, 100);

}
