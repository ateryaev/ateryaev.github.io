var COLS=10;
var ROWS=12;

var GAME_MODES = [
	{id:0,border:2,spaces:25, name:"Too young to loose"},
	{id:1,border:1,spaces:25, name:"Hey, not too rough"},
	{id:2,border:1,spaces:15, name:"Hurt me plenty"},
	{id:3,border:0,spaces:5,  name:"Ultra-Violence"},
	{id:4,border:-1,spaces:0,  name:"Nightmare"}
]

var GameModel = new (function() {
	var SERVER_COL=5;
	var SERVER_ROW=6;
	var CELLS = [];
	var EXIT_CELLS = [];
	var ACTIVE_CELLS_SHUFFLED = [];
	var TAPS_COUNT = 0;
	var TAPS_NEEDED_TO_SOLVE = 0;
	var BORDER_SIZE = 0;
	var GAME_MODE = null;
	var IS_SOLVED = false;
	var LAST_ROTATED_CELL = null;
	var LAST_ROTATED_CELL_KIND = 999;


	this.getExitCells = function() {return EXIT_CELLS;}
	this.getActiveCells = function() {return ACTIVE_CELLS_SHUFFLED;}
	
	this.getCell = function(col,row) {
		return CELLS[mod(col,COLS)][mod(row,ROWS)];
	}
	
	for(var i=0; i<COLS;i++) {
		CELLS[i] = []; 
		for(var j=0;j<ROWS;j++) {
			CELLS[i][j] = new Cell(i, j);
		}
	}

	for(var i=0; i<COLS;i++) for(var j=0;j<ROWS;j++) {
		CELLS[i][j].n = [];
		CELLS[i][j].n[0] = this.getCell(i,j-1);
		CELLS[i][j].n[1] = this.getCell(i+1,j);
		CELLS[i][j].n[2] = this.getCell(i,j+1);
		CELLS[i][j].n[3] = this.getCell(i-1,j);
	}
	
	function refreshConnectionsStep(cell, changed_cells) {
		cell.isFlaged = true;
		if (!cell.isLive) {
			cell.isLive = true;
			changed_cells.push(cell);
		}
		for (var k=0; k<=LAST_IDX; k++) {
			if ( (cell.kind & FLAGS[k]) && (cell.n[k].kind  & FLAGS[(k+2)%4]) && (!cell.n[k].isFlaged) ) {
				refreshConnectionsStep(cell.n[k], changed_cells);
			}
		}
	}
	this.refreshConnections = function() {
		var changed_cells = [];
		
		refreshConnectionsStep(CELLS[SERVER_COL][SERVER_ROW], changed_cells);
		var total_cnt = 0;
		var alive_cnt = 0;
		for(var i=0; i<COLS;i++) for(var j=0;j<ROWS;j++) {
			if (!CELLS[i][j].isFlaged && CELLS[i][j].isLive) {
				CELLS[i][j].isLive = false;
				changed_cells.push(CELLS[i][j]);
			}
			CELLS[i][j].isFlaged = false;
			if (CELLS[i][j].kind>0) {
				total_cnt++;
				if (CELLS[i][j].isLive) alive_cnt++;
			}
		}
		IS_SOLVED = (alive_cnt==total_cnt);

		return changed_cells;
		
	}

	function maxCellWithBorder(border) {
		if (border<=0) return COLS*ROWS;
		return COLS*ROWS-border*COLS*2-border*ROWS*2+border*border*4;
	}
	function canGoFromDirBorder(col, row, dir, border) {
		var flag = FLAGS[dir];
		if (flag==LEFT_FLAG && col==border) return false;
		if (flag==RIGHT_FLAG && col==COLS-border-1) return false;
		if (flag==TOP_FLAG && row==border) return false;
		if (flag==BOTTOM_FLAG && row==ROWS-border-1) return false;
		return true;
	}
	this.clear = function() {
		GAME_MODE = null;
		TAPS_COUNT = 0;
		LAST_ROTATED_CELL = null;
		IS_SOLVED = false;
		EXIT_CELLS = [];
		ACTIVE_CELLS_SHUFFLED = [];
		for(var i=0; i<COLS;i++) for(var j=0;j<ROWS;j++) {
			CELLS[i][j].kind = 0;
			CELLS[i][j].isFlaged = false;
			CELLS[i][j].isLive = false;
			CELLS[i][j].isServer = false;
			CELLS[i][j].isClient = false;
		}

	}
	
	this.randomize = function(mode) {
		this.clear();
		GAME_MODE = GAME_MODES[mode];
		var startfromitems = [CELLS[SERVER_COL][SERVER_ROW]];
		
		while (startfromitems.length < maxCellWithBorder(GAME_MODE.border)) {
			item = startfromitems[rndIdx(startfromitems.length-1)];
			while (true) {
				var dir = rndIdx(3);
				if (!canGoFromDirBorder(item.col, item.row, dir, GAME_MODE.border)) break;
				//if (item.n[dir].col==0 || item.n[dir].row==0) break;
				
				if (item.n[dir].kind == 0) {
					item.kind |= FLAGS[dir];
					item.n[dir].kind |= FLAGS[(dir+2)%4];
					startfromitems.push(item.n[dir]);
				} else {
					break;
				}
			}
		}
		CELLS[SERVER_COL][SERVER_ROW].isServer = true;
		
		for (var sp = 0; sp<GAME_MODE.spaces; sp++) 
		{
			//make spaces
			var exitCells = [];
			for(var i=0; i<COLS;i++) for(var j=0;j<ROWS;j++) {
				if (this.getCell(i,j).isServer) continue;
				if (this.getCell(i,j).isExit()) exitCells.push(this.getCell(i,j));
			}

			var toClearCell = exitCells[rndIdx(exitCells.length-1)];3
			
			for(var i=0; i<4;i++)
			{
				if (toClearCell.kind==FLAGS[i])
				{
					var nCell = toClearCell.n[i];
					toClearCell.kind = 0;
					nCell.kind &= ~MIRROW_FLAGS[i];
				}
			}
		}
		//shufle
		TAPS_NEEDED_TO_SOLVE = 0;

		for(var i=0; i<COLS;i++) for(var j=0;j<ROWS;j++) {
			
			var cell = this.getCell(i,j);
			var maxRot = cell.getNumberOfRotatesForLoop();
			if (!cell.isEmpty()) ACTIVE_CELLS_SHUFFLED.push(cell);
			if (maxRot<2) continue;
			var m = rndIdx(maxRot-1);
			//console.log(m);
			if (m>0) TAPS_NEEDED_TO_SOLVE++;
			for(var mm = 0; mm<m; mm++) {
				cell.rotate();
			}
			if (this.isCellClient(i,j)) EXIT_CELLS.push(cell);
		}
		//EXIT_CELLS.push(CELLS[SERVER_COL][SERVER_ROW]);
		//console.log(TAPS_NEEDED_TO_SOLVE);
		this.refreshConnections();
		shuffle(ACTIVE_CELLS_SHUFFLED);
		//console.log(ACTIVE_CELLS_SHUFFLED);
	}
	
	this.getTapsNeededToSolve = function() {
		return TAPS_NEEDED_TO_SOLVE;
	}
	this.getTapsCount = function () {
		return TAPS_COUNT;
	}
	this.isInitiated = function() {
		return GAME_MODE!=null;
	}
	this.getGameName = function () {
		return GAME_MODE.name;
	}
	this.getGameModeId = function() {return GAME_MODE!=null?GAME_MODE.id:-1;}
	this.isSolved = function () {
		return IS_SOLVED;
	}

	
	this.getCellKind = function(col, row) {
		return this.getCell(col,row).kind;
	}
	this.isCellServer = function(col, row) {
		return this.getCell(col,row).isServer;
	}
	this.isCellClient = function(col, row) {
		var cell = this.getCell(col,row);
		return (cell.kind == TOP_FLAG || cell.kind == RIGHT_FLAG || cell.kind == BOTTOM_FLAG || cell.kind == LEFT_FLAG);
	}
	this.isCellAlive = function(col, row) {
		return this.getCell(col,row).isLive;
	}
	
	//var rotationDelayTimer = null;
	
	this.rotateCellAndUpdateTaps = function(col, row) {
		var cell = this.getCell(col,row);
		if (LAST_ROTATED_CELL != cell ) {
			updateTapsForRotateNewCell(cell);
		} else {
			updateTapsForRotateSameCell();
		}
		cell.rotate();
	}
	
	function updateTapsForRotateNewCell(cell) {
		if (cell.kind != cell.getRotatedKind()) {
			LAST_ROTATED_CELL_KIND = cell.kind;
			LAST_ROTATED_CELL = cell;
			TAPS_COUNT++;
		}
	}
	function updateTapsForRotateSameCell() {
		if (LAST_ROTATED_CELL_KIND == LAST_ROTATED_CELL.getRotatedKind()) {
			LAST_ROTATED_CELL = null;
			TAPS_COUNT--;
		}
	}
	
	this.getCols = function() {return COLS;}
	this.getRows = function() {return ROWS;}
	
})();

var GM = GameModel;