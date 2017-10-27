var sfg_size = 10;
var dx = 10;
var dy = 10;

var fingers = 
[
    [
        [[1,3], [1,0]],
        [[1,2], [1,0]],
        [[1,1], [1,0]],
        [[1,0], [1,0]],
        [[0,0], [1,0], [0,1]]
    ],
    [
        [[1,3], [1,0]],
        [[1,2], [1,0]],
        [[1,1], [1,0]],
        [[1,0], [1,0]],
        [[0,0], [1,0], [0,1]]
    ],
    [
        [[1.5,3], [1.5,0]],
        [[1.5,2], [1.5,0]],
        [[1.5,1], [1.5,0]],
        [[1.5,0], [1.5,0]],
        [[0,-0.35], [0.71,-0.71], [0.71,-0.71]]
    ],
]
//fingers = [ [[0,0], [1,0], [0,1]] ]
var finger_colors = ["#ddd", "#eee", "#ddd", "#eee", "#fff"];

function path(points, scale, dx, dy) {

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


function getSvg(fingers) {

    var svg = '<svg viewBox="0 0 50 50" style="position:absolute;bottom:0;top:0;left:0;right:0;margin:auto;padding:0;width:50px;xbackground:#888;transform:rotate(-90deg)">';
    
    var d = path([[0.0,0.5],[0,2]], sfg_size, dx, dy);
    var p =  ''//<path stroke-linecap="square " fill="none" stroke="#888" stroke-width="'+(sfg_size*2+2)+'" d="'+d+'"/>'
        p += '<path stroke-linecap="square " fill="none" stroke="#ccc" stroke-width="'+(sfg_size*2+0)+'" d="'+d+'"/>'
    svg += p;
    for (var i in fingers) {
        var d = path(fingers[i], sfg_size, dx, dy);
        var p = '<path stroke-linecap="square " fill="none" stroke="#888" stroke-width="'+(sfg_size+2)+'" d="'+d+'"/>'
        //svg += p;
        var d = path(fingers[i], sfg_size, dx, dy);
        var p = '<path stroke-linecap="square " fill="none" stroke="'+finger_colors[i]+'" stroke-width="'+sfg_size+'" d="'+d+'"/>'
        svg += p;
    }
    svg += '</svg>';
    return svg;
}