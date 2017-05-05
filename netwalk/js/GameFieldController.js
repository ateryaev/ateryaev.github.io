MSG_GAME_FIELD_CELL_ROTATED = "GAME_FIELD_CELL_ROTATED";
MSG_GAME_FIELD_CELL_TOUCHSTART = "MSG_GAME_FIELD_CELL_TOUCHSTART"
MSG_GAME_SOLVED = "GAME_SOLVED";

function InitGameFieldController() {
	var last_pressed_cell = null;
	var rotation_timer = null;
	var $game_div = $("#game_div");
	
	function getCellByCoors(x,y) {
		//y+=20;
		var idx = {col:0,row:0};
		var col = Math.floor(x/SIZE);
		var row = Math.floor(y/SIZE);
		return GM.getCell(col, row);
	}

	function isCellRotatable(cell) {
		return (last_pressed_cell.kind != 0 && last_pressed_cell.kind != 15);
	}


	$game_div.bind(BIND_TOUCHSTART, function(e){
		if (last_pressed_cell) last_pressed_cell.data.$cell.removeClass("pressed");
		e = normalize_jevent(e,$game_div);
		last_pressed_cell = getCellByCoors(e.X, e.Y);
		if (last_pressed_cell.kind == 0 || last_pressed_cell.kind == 15) return;
		last_pressed_cell.data.$cell.addClass("pressed");
		NC.postNotification(MSG_GAME_FIELD_CELL_TOUCHSTART);
		return false;
	});
	
	$game_div.bind(BIND_TOUCHMOVE, function(e){
		if (!last_pressed_cell) return false;
		e = normalize_jevent(e,$game_div);
		var on_cell = getCellByCoors(e.X, e.Y);
		if (last_pressed_cell != on_cell) {
			last_pressed_cell.data.$cell.removeClass("pressed");
			last_pressed_cell = on_cell;
			if (isCellRotatable(last_pressed_cell)) NC.postNotification(MSG_GAME_FIELD_CELL_TOUCHSTART);
		}
		if (isCellRotatable(last_pressed_cell)) last_pressed_cell.data.$cell.addClass("pressed");
		return false;
	});

	function syncKindOfCellWithAnimation(cell) {
		var $cell = cell.data.$cell;
		window.clearTimeout(rotation_timer);
		$cell.removeClass("rotate");
		window.setTimeout(function(){
			for(var f=0; f<4; f++) {
				if (cell.kind & FLAGS[f]) {
					$cell.addClass(FLAG_CLASSES[f]);
				} else {
					$cell.removeClass(FLAG_CLASSES[f]);
				}
			}
			$cell.addClass("rotate");
			rotation_timer = window.setTimeout(function(){
				//GM.rotateCellAndUpdateTaps(cell.col, cell.row);
				$cell.removeClass("rotate");
				rotation_timer=null;
				syncAliveStateForCells( GM.refreshConnections());
			}, 200);
		}, 1);
	}

	function syncAliveStateForCells(cells) {
		for(var i=0; i<cells.length; i++) {
			var $cell = cells[i].data.$cell;
			if (cells[i].isLive) {
				$cell.addClass("alive");
				if (cells[i].isExit()) {
					$cell.addClass("anime");
					if (rndIdx(1)==0) $cell.addClass("animeleft");
					window.setTimeout(function(c){c.removeClass("anime animeleft");}, 1,$cell);
				}
			}
			else $cell.removeClass("alive");
		}
		if (GM.isSolved()) NC.postNotification(MSG_GAME_SOLVED);
	}

	$game_div.bind(BIND_TOUCHEND, function(e){
		if (!last_pressed_cell) return false;
		last_pressed_cell.data.$cell.removeClass("pressed");
		if (isCellRotatable(last_pressed_cell)) {
			GM.rotateCellAndUpdateTaps(last_pressed_cell.col, last_pressed_cell.row);
			NC.postNotification(MSG_GAME_FIELD_CELL_ROTATED);
			syncKindOfCellWithAnimation(last_pressed_cell);
		}
		last_pressed_cell = null;
		return false;
	});
}