var dictman = new DictMan(DICT);
var STORAGE_KEY = "DICTIONARY_STORAGE_KEY_INPUT_VALUE";

function onStarClick(o) {
    var now = o.parentElement.className;
    o.parentElement.className = now==""?"star":"";
    return false;
}

function loadInputValue() {
    if (!window.localStorage || !window.localStorage.getItem(STORAGE_KEY)) return "";
    return window.localStorage.getItem(STORAGE_KEY);
}
function saveInputValue(val) {
    if (!window.localStorage || !window.localStorage.setItem) return;
    window.localStorage.setItem(STORAGE_KEY, val);
}

window.onload = function() {
    var load_next = window.document.querySelector("#load_next");
    var clear_btn = window.document.querySelector("#clear_btn");
    var all = window.document.querySelector("#all");
    var result = window.document.querySelector("#result");
    var input = window.document.querySelector("input");

    var start_idx = 0;
    var num_of_records = 0;
    var tofind = "";

    function appendRecord(idx) {
        var item0 = dictman.getWordFrom(idx);
        var item1 = dictman.getWordTo(idx);
        
        var d = document.createElement("div");
        
        if (!dictman.isItemStartFrom(idx, tofind)) {
            d.className = "notmatch";
        } else {
            item0 = "<u>"+(item0.substr(0,tofind.length))+"</u>"+item0.substr(tofind.length)
        }
        d.innerHTML = "<span>"+item0+"</span><span><i>"+item1+"</i></span>";
        all.appendChild(d);
    }
    
    function showMaxFromIdx(idx) {
        for(var i=idx;i<dictman.getLength()&&i<idx+50;i++) {
            appendRecord(i, tofind);
            num_of_records++;
        }
    }
    
    function refresh(str) {
        tofind = str;
        all.innerHTML = "";
        var first = dictman.findFirstIdx(tofind);
        start_idx = first;
        num_of_records = 0;
        showMaxFromIdx(first, tofind);
    }
    
    function loadMoreResults() {
        showMaxFromIdx(start_idx+num_of_records, tofind);
    }
    
    load_next.onmousedown = load_next.ontouchstart = function(e) {
        e.stopPropagation();
        if (this.className=="pressed") return;

        input.blur();
        this.className="pressed";
        window.setTimeout(function() {
            load_next.className="";
            loadMoreResults();
        }, 100);
    }

    input.oninput = function() {
        saveInputValue(input.value);
        var val = input.value.trim();
        refresh(val)
        result.scrollTop = 0;
        clear_btn.style.display = val==""?"none":"block";
    }

    window.document.querySelector("form").onsubmit = function() {
        //console.log("submit")
        input.blur();
        return false;
    }
    input.value = loadInputValue();
    input.oninput();
    
    clear_btn.ontouchend = clear_btn.onmouseup = function() {
        input.value = "";
        input.blur();
        window.setTimeout(function(){input.focus();input.oninput();}, 0);
    }
    
    input.addEventListener("touchstart", function(e) {
        this.className="focused";
        window.setTimeout(function(){input.focus()}, 0);

    }, false);

    
    all.ontouchstart = function(e) {
        //console.log(this.scrollTop)
        e.stopPropagation();
        input.blur();
        //if (result.scrollTop == 0) result.scrollTop = 1;
    }
    

    //input.ontouchstart=
    input.onfocus = function(e) {
        this.className="focused";
        //this.setSelectionRange(0, this.value.length);
    }
    input.onblur = function(e) {this.className="";}
    input.className="focused"
    window.setTimeout(function(){input.focus()}, 0);
}
