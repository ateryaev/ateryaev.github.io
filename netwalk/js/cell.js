var TOP_FLAG =    1<<0;
var RIGHT_FLAG =  1<<1;
var BOTTOM_FLAG = 1<<2;
var LEFT_FLAG =   1<<3;

var TOP_IDX =    0;
var RIGHT_IDX =  1;
var BOTTOM_IDX = 2;
var LEFT_IDX =   3;
var LAST_IDX =   3;

var FLAGS = [TOP_FLAG, RIGHT_FLAG, BOTTOM_FLAG, LEFT_FLAG];
var MIRROW_FLAGS = [BOTTOM_FLAG, LEFT_FLAG, TOP_FLAG, RIGHT_FLAG];
var DROWS = [-1, 0, 1, 0];
var DCOLS = [0, 1, 0, -1];

var Pos = (function(col,row){
	this.col = col;
	this.row = row;
});


var Cell =  (function(col, row) {

	this.kind = 0;
	this.isLive = false;
	this.isServer = false;
	this.col=col;
	this.row=row;
	this.isFlaged = false;
	this.data = {};
	this.neighbors = [];
	
	this.getNeighborRow = function(direction_index) {
		return this.row + DROWS[direction_index];
	}
	this.getNeighborCol = function(direction_index) {
		return this.col + DCOLS[direction_index];
	}
	this.getRotatedKind = function() {
		var k = this.kind;
		if (!GameStorage.isRotateRight()) {
			k = k>>1;
			if (this.kind & FLAGS[0]) {
				k = k | FLAGS[LAST_IDX];
				k = k & (TOP_FLAG|RIGHT_FLAG|BOTTOM_FLAG|LEFT_FLAG);
			}
		} else {
			k = k<<1;
			if (this.kind & FLAGS[LAST_IDX]) {
				k = k | FLAGS[0];
				k = k & (TOP_FLAG|RIGHT_FLAG|BOTTOM_FLAG|LEFT_FLAG);
			}
		}
		return k;
	}
	
	this.rotate = function() {
		this.kind = this.getRotatedKind();
	}
	
	this.isEmpty = function() {
		return this.kind==0;
	}
	
	this.isExit = function() {
		var k = this.kind;
		return (k == TOP_FLAG || k == RIGHT_FLAG || k == BOTTOM_FLAG || k == LEFT_FLAG);
	}
	
	this.getNumberOfRotatesForLoop = function () {
		var k = this.kind;
		if (k == 0 || (k==(TOP_FLAG|RIGHT_FLAG|BOTTOM_FLAG|LEFT_FLAG))) return 0;
		if (k == (TOP_FLAG|BOTTOM_FLAG) ||  k == (LEFT_FLAG|RIGHT_FLAG)) return 2;
		return 4;
	}
	
});