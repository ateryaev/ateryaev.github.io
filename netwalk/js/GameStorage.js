var GameStorage = new (function() {
	var gameData = {
		settings: {
			sound_on: true,
			music_on: true,
			rotate_right: true
		},
		record_for_mode: []
	};
	this.load = function() {
		if (localStorage.getItem('gameData')) {
			gameData = JSON.parse(localStorage.getItem('gameData'));
		}
		//if (gameData.settings.music_on) PlayBGMusic(); else StopBGMusic();
	}
	this.isSoundOn = function() {return gameData.settings.sound_on;}
	this.isMusicOn = function() {return gameData.settings.music_on;}
	this.isRotateRight = function() {return gameData.settings.rotate_right;}
	this.setSoundOn = function(on) {gameData.settings.sound_on = on; this.save();}
	this.setMusicOn = function(on) {
		gameData.settings.music_on = on; this.save();
		//if (gameData.settings.music_on) PlayBGMusic(); else StopBGMusic();
	}
	this.setRotateRight = function(on) {gameData.settings.rotate_right = on; this.save();}
	this.getRecordByMode = function(mode) {
		if (!gameData.record_for_mode[mode]) return 999;
		return gameData.record_for_mode[mode];
	}
	this.setRecord = function(mode, record) {
		gameData.record_for_mode[mode] = record;
	}
	this.save = function() {
		localStorage.setItem( 'gameData', JSON.stringify(gameData));
		this.load();
	}
	
	NotificationCenter.addObserver(MSG_GAME_SOLVED, function(msg, options){
		if (GameStorage.getRecordByMode(GM.getGameModeId()) > GM.getTapsCount()) 
			GameStorage.setRecord(GM.getGameModeId(),GM.getTapsCount());
		GameStorage.save();
	});
	
	this.load();
})();