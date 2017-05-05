MSG_CELL_LINE_TOGGLE_1 = "MSG_CELL_LINE_TOGGLE_1";
MSG_CELL_LINE_TOGGLE_2 = "MSG_CELL_LINE_TOGGLE_2";

function init() {
	InitGameFieldController();
	InitSound() 
	function syncModelWithView() {
		if (GM.isInitiated()) {
			$("#lbl_taps_count").html(GM.getTapsCount());
			$("#lbl_game_mode").html(GM.getGameName());
		}
		for(var i=0; i<COLS; i++) {
			for(var j=0; j<ROWS; j++) {
				syncCellWithView(i, j);
			}
		}
	}
	
	function syncCellWithView(i, j) {
		var cell = GM.getCell(i, j);
		var kind_full_class = "cell ";
		kind_full_class += kindToClass(cell.kind);
		if (cell.isLive) kind_full_class += "alive ";
		if (cell.isServer) kind_full_class += "server ";
		else if (cell.isExit()) kind_full_class += "exit ";
		cell.data.$cell.attr("class", kind_full_class+((j+i)%2==0?" odd":""));
		//console.log(kind_full_class)
	}
	
	function kindToClass(kind) {
		if (kind==0) return "empty ";
		var kind_class = "";
		for(var f = 0; f<4;f++) {
			if (kind&FLAGS[f]) kind_class += FLAG_CLASSES[f]+" ";
		}
		return kind_class;
	}
	
	function animateTeardown (callback, param) {
		$("#screen").addClass("inactive");
		$("#game_div").addClass("pause_animation");
		function hideRow(j) {
			var cells = GM.getActiveCells();
			if (j<0) {
				$("#game_div").addClass("pause_animation");
				window.setTimeout(hideRow, 30, j+1);
				return;
			}
			NC.postNotification(MSG_CELL_LINE_TOGGLE_1);
			for(var i=0; i<5&&j<cells.length;i++) {
				cells[j].data.$cell.attr("class", "cell empty"+((j+i)%2==0?" odd":""));
				j++;
			}

			if (j<cells.length) window.setTimeout(hideRow, 30, j);
			else window.setTimeout(callback, 30, param);
		}
		hideRow(-1);
	}
	
	function animateSetup (mode) {
		GM.randomize(mode);
		
		
		function showCol(j) {
			var cells = GM.getActiveCells();
			if (j>=cells.length) { 
				$("#game_div").removeClass("pause_animation"); 
				$("#screen").removeClass("inactive");
				$("#lbl_taps_count").html(GM.getTapsCount());
				$("#lbl_game_mode").html(GM.getGameName());
				var best = GameStorage.getRecordByMode(mode);
				if (best>0 && best < 999) {
					$("#lbl_record").html("best is " + GameStorage.getRecordByMode(mode) + " turns");
				} else {
					$("#lbl_record").html("never was solved");
				}
				return; 
			}
			NC.postNotification(MSG_CELL_LINE_TOGGLE_2);
			
			for(var i=0; i<5&&j<cells.length;i++) {
				syncCellWithView(cells[j].col,cells[j].row);
				j++;
			}

			window.setTimeout(showCol, 30, j);
		}
		showCol(0);
	}

	NotificationCenter.addObserver(MSG_GAME_SOLVED, function(msg, options){
		$("#lbl_taps_count_total").html(GM.getTapsCount());
		$("#lbl_taps_count_needed").html(GM.getTapsNeededToSolve());
		$("#lbl_taps_count_useless").html(GM.getTapsCount()-GM.getTapsNeededToSolve());
		$("#screen").addClass("menu");
		window.setTimeout(function() {$("#view_main_shadow").removeClass("paused");showFromRight($("#view_game_solved"))}, 300 );
	});
	
	NotificationCenter.addObserver(MSG_GAME_FIELD_CELL_ROTATED, function(msg, options){
		$("#lbl_taps_count").html(GM.getTapsCount());
	});
	
	{
		var mode_selected = 0;
		function startNewGame(mode) {
			mode_selected = mode;
			if (!$("#screen").hasClass("inactive")) {
				showNewGameSure();
				return;
			} else {
				startNewGameSure();
			}
		}
		function startNewGameSure() {
			//PlayBGMusic();
			hideToLeft($($current_view));
			$("#screen").removeClass("menu");
			if (!$("#screen").hasClass("inactive")) {
				animateTeardown(animateSetup, mode_selected);
			} else {
				animateSetup(mode_selected);
			}
		}
		var $current_view = "#view_menu_newgame";
		function showMenu() {
			//StopBGMusic();
			$("#screen").addClass("menu");
			showFromLeft($("#view_menu"));
		}
		function hideMenu() {
			//PlayBGMusic();
			$("#screen").removeClass("menu");
			hideToLeft($("#view_menu"));
		}
		function showSubMenu($view_id) {
			$current_view = $view_id;
			hideToRightWithRotation($("#view_menu"), showFromRightWithRotation, $($view_id));
		}
		function showNewGameSure($view_id) {
			$current_view = "#view_menu_newgame_sure";
			hideToRightWithRotation($("#view_menu_newgame"), showFromRightWithRotation, $("#view_menu_newgame_sure"));
		}
		function backToMenu() {
			hideToLeftWithRotation($($current_view), showFromLeftWithRotation, $("#view_menu"));
		}
		function backToNewGame() {
			$current_view = "#view_menu_newgame";
			hideToLeftWithRotation($("#view_menu_newgame_sure"), function() {showFromLeftWithRotation($("#view_menu_newgame"));});
		}
		
		BUTTONS_UI.createButtonsFor($("a[data-action]"), function(btn){
			eval(btn.data("action"));
		});
	}
	
	
	BUTTONS_UI.createButtonsFor($("#btn_back_to_menu_from_game_solved"), function(){
		hideToRight($("#view_game_solved"), function() {
			$("#view_main_shadow").addClass("paused");
			//$("#view_main_shadow").addClass("loading");
			//animateTeardown(showFromLeft, $("#view_menu"));
			animateTeardown(function() {IOS('iad');});
		});
	});
	NotificationCenter.addObserver('MSG_AD_END', function(msg, options){
		showFromLeft($("#view_menu"));
		//$("#view_main_shadow").removeClass("loading");
		//SetBgMusic(GameStorage.isMusicOn());
	});


	//GM.randomize(4);
	GM.clear();
	syncModelWithView();

	function syncSettingsWithView() {
		$("#lbl_settings_sound").html(GameStorage.isSoundOn()?"On":"Off");
		$("#lbl_settings_music").html(GameStorage.isMusicOn()?"On":"Off");
		$("#lbl_settings_rotate_right").html(GameStorage.isRotateRight()?"Right":"Left");
		$("#screen").removeClass("rotate_right");
		$("#screen").removeClass("rotate_left");
		if (GameStorage.isRotateRight()) $("#screen").addClass("rotate_right");
		if (!GameStorage.isRotateRight()) $("#screen").addClass("rotate_left");
	}
	
	syncSettingsWithView();
	
	
	
	//
	function animateRandomExit() {
		var cells = GM.getExitCells();
		
		if (cells.length > 0) {
			var idx = rndIdx(cells.length-1);
			var cell = cells[idx];
			//console.log("Anime: " + idx);
			cell.data.$cell.addClass("anime");
			if (rndIdx(1)==0) cell.data.$cell.addClass("animeleft");
			window.setTimeout(function(){cell.data.$cell.removeClass("anime animeleft");}, 1);
		}
		window.setTimeout(animateRandomExit, Math.random()*3000.0+500.0);
	}
	animateRandomExit();

	window.setTimeout(showMenu, 500);
	
	//$("#screen").addClass("menu");
	//$("#view_main_shadow").removeClass("paused");
	//$("#view_main_shadow").addClass("loading");
	//showFromRight($("#view_game_solved"));
	
	
	window.setTimeout(function(){IOS('onload');}, 200);
	window.setTimeout(function(){SetBgMusic(GameStorage.isMusicOn());}, 500);
	
	
}