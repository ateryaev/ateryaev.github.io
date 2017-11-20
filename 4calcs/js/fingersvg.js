var sfg_size = 10;
var dx = 7;
var dy = 21;

var clear_after = [-1,3,0];
var FINGERS = 
[
    [
        
        [[1,2], [1,0]],
        [[1,1], [1.0,0.0]],
        [[1,0], [1.0,0]],
        [[0,0], [1.0,0], [0,1.0]]
    ],
    [
        
        [[1.0,2], [2.0,0.0]],
        [[1.0,1], [2.0,0.0]],
        [[1.0,0], [2.0,0]],
        [[0,0], [1.0,-1.4]],
        
        //[[0.5,-0.5],[0,4]],
        
        
        
    ],
    [
        
        //[[1,3], [1,0]],
        [[1.0,0], [2.5,0]],
        [[1,2], [1,0]],
        [[1.5,1], [1.8,0.75]],
        
        [[0,0], [1,0.5], [0,1.0]]
    ],
]
//fingers = [ [[0,0], [1,0], [0,1]] ]
var finger_colors = ["#ddd", "#eee", "#ddd", "#eee", "#ccc", "#fff"];

function path(points, scale, dx, dy) {

    var d;
    function pair(point, sdx, sdy) {
        if (!sdx) sdx = 0;
        if (!sdy) sdy = 0;
        return (point[0]*scale+sdx)+","+(point[1]*scale+sdy);
    }
    d = "M"+pair(points[0], dx, dy);

    for(var i=1;i<points.length;i++) {
        d += " l"+pair(points[i], 0, 0);
    }
    return d;
}
function pathTag(d, color, width, linecap) {
    if (!linecap) linecap = "round";
    p = '<path stroke-linecap="'+linecap+' " fill="none" stroke-linejoin="round" stroke="'+color+'" stroke-width="'+(width)+'" d="'+d+'"/>'
    return p;
}

function getSvg(choice) {

    var dark = "#888";
    var light = "#fff";
    fingers =  FINGERS[choice];
    var d, p;
    var svg = '<svg viewBox="0 0 50 50" style="display:inline-block;margin:0;width:100px;height:100px;background:#eee;xtransform:rotate(-90deg)">';
    //butt, square, round
    d = path([[0.5,-0.5],[0,4]], sfg_size, dx, dy);
    p =  ''//<path stroke-linecap="butt " fill="none" stroke="#888" stroke-width="'+(sfg_size*2+2)+'" d="'+d+'"/>'
        p += '<path stroke-linecap="butt " fill="none" stroke="#ccc" stroke-width="'+(sfg_size+0)+'" d="'+d+'"/>'
   // svg += p;

    
    for (var i in fingers) {
       // var d, p;
        
        if (i==0) {
            //d = path([[0,0], [0,3], [1.5,0],[-0.5,0], [0,-3], [0.5,0],[-1.5,0]], sfg_size, dx, dy);
            d = path([[0,0], [0,2], [1.0,0], [0,-2],[-1.0,0]], sfg_size, dx, dy);
            svg += pathTag(d, dark, (sfg_size*1.1));
            svg += pathTag(path([[0,0], [0,2]], sfg_size, dx, dy), light, (sfg_size*1.0));
            svg += pathTag(path([[1,0], [0,2]], sfg_size, dx, dy), light, (sfg_size*1.0), "square");
            svg += pathTag(path([[0.5, 0], [0,2]], sfg_size, dx, dy), light, (sfg_size*1.0), "square");
        }

        svg += pathTag(path(fingers[i], sfg_size, dx, dy), dark, (sfg_size*1.1));
        svg += pathTag(path(fingers[i], sfg_size, dx, dy), light, (sfg_size*1.0));
        
        if (i==clear_after[choice]) {
            svg += pathTag(path([[0,0], [0,2]], sfg_size, dx, dy), light, (sfg_size*1.0));
            svg += pathTag(path([[1,0], [0,2]], sfg_size, dx, dy), light, (sfg_size*1.0), "square");
            svg += pathTag(path([[0.5, 0], [0,2]], sfg_size, dx, dy), light, (sfg_size*1.0), "square");
        }
        //break;
    }
        svg += '</svg>';
   
    return svg;
}