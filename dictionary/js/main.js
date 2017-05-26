var dictman = new DictMan(DICT);

function onStarClick(o) {
    var now = o.parentElement.className;
    o.parentElement.className = now==""?"star":"";
    return false;
}

window.onload = function() {
    var fav = window.document.querySelector("#fav");
    var all = window.document.querySelector("#all");
    var result = window.document.querySelector("#result");
    var input = window.document.querySelector("input");



    function refresh(tofind) {
        tofind = tofind.toLowerCase();
        var fav_html = "";
        var all_html = "";
        var totalFound = 0;
        //var first = findFirst(tofind);
        var first = dictman.findFirstIdx(tofind);
        console.log("!!!!!!!!!"+first)
        for(var i=first;i<dictman.getLength()&&i<first+100;i++) {
            
            var item0 = dictman.getWordFrom(i);
            var item1 = dictman.getWordTo(i);
            
            if (!dictman.normalizeString(item0).startsWith(dictman.normalizeString(tofind))) {
                console.log(item0.toLowerCase(), tofind)
                break;
            }
            totalFound++;
            item0 = "<u>"+item0.substr(0,tofind.length)+"</u>" +item0.substr(tofind.length)
            
            all_html += "<div class=star><span>"+item0+"</span><span>"+item1+"</span>"
            all_html += "<!--i class='fa fa-star-o' onclick=onStarClick(this)></i><i class='fa fa-star star' onclick=onStarClick(this)></i--></div>";

        }
        console.log("Total: "+totalFound);
        
        all_html += "<div style=text-align:center;color:gray;background:#eee>total:"+totalFound+"</div>";
        
        fav.innerHTML = fav_html;
        all.innerHTML = all_html;
    }
    refresh("");

    input.oninput = function() {
        refresh(input.value.trim())
        result.scrollTop = 1;
    }
    //ontouchstart='this.focus()'
    //input.onclick = function(e) {e.preventDefault();}
    //input.onmousedown = function(e) {e.preventDefault();}
    input.addEventListener("touchstart", function(e) {
        this.className="focused";
        window.setTimeout(function(){input.focus()}, 0);

    }, false);

    //body.ontouchstart  = function(e) {e.preventDefault();}
    result.ontouchstart = function(e) {
        //console.log(this.scrollTop)
        e.stopPropagation();
        input.blur();
        if (this.scrollTop == 0) this.scrollTop = 1;
    }


    //input.ontouchstart=
    input.onfocus = function(e) {this.className="focused";}
    input.onblur = function(e) {this.className="";}
    input.className="focused"
    window.setTimeout(function(){input.focus()}, 0);
}
