function CalcUI() {
    
    var DIGITS = "0123456789.n";
    var OPEATORS = "+-*/";
    var EQUAL = "=";
    var BACKSPACE = "<";
    var CLEAR = "C";
    
    function isType(chr, TYPE) {return TYPE.indexOf(chr)>-1;}
    function isDigit(chr) {return isType(chr,DIGITS);}
    function isOperator(chr) {return isType(chr,OPEATORS);}
    function isEqual(chr) {return isType(chr,EQUAL);}
    function isBackspace(chr) {return isType(chr,BACKSPACE);}
    function isClear(chr) {return isType(chr,CLEAR);}
    
    this.onDigit = function(){};
    this.onOperator = function(){};
    this.onEqual = function(){};
    this.onBackspace = function(){};
    this.onClear = function(){};
    
    var othis = this;
    
    function btnToHTML(chr) {
        var btn_txt = {"*":"&times;", "/":"&divide;", "n":"+/-", "<":"del"}
        return btn_txt[chr]?btn_txt[chr]:chr;
    }
    
    function action(sender) {
        var chr = sender.getTxt();
        console.log("action: "+chr);
        if (DIGITS.indexOf(chr)>-1) othis.onDigit(chr=="n"?"-":chr);
        if (OPEATORS.indexOf(chr)>-1) othis.onOperator(chr);
        if (EQUAL.indexOf(chr)>-1) othis.onEqual(chr);
        if (BACKSPACE.indexOf(chr)>-1) othis.onBackspace(chr);
        if (CLEAR.indexOf(chr)>-1) othis.onClear(chr);
        
    };
    

    AFW.View.call(this, {top:0,left:0, background:"black"});
    var view_buttons = new AFW.View({bottom:0,right:0,left:1});
    

    var lbl_display = new AFW.Label({bottom:0,right:"2%",color:"#c93",fontSize:"150%"}, "");
    var lbl_history = new AFW.Label({bottom:0,right:"2%",color:"#888",textAlign:"right",fontSize:"75%"}, "0=0");
    
    
    
    function CalcButton(col, row, txt) {

        var bgcolor = "#456";
        var fgcolor = "#fff";
        if (isDigit(txt))     bgcolor="#444";
        if (isBackspace(txt)) bgcolor="#846";
        if (isClear(txt))     bgcolor="#c33";
        if (isEqual(txt))     bgcolor="#468";

        var lbl_txt = new AFW.Label({top:0,right:0,left:0,bottom:0,color:"#fff"}, btnToHTML(txt));
        var width = "calc(25% - 1px)";
        var height = "calc("+(txt=="="?"40%":"20%")+" - 1px)";
        
        AFW.Button.call(this, {top:row*20+"%",left:col*25+"%",width:width,height:height}, action,
                        function() {this.setBackground(fgcolor);lbl_txt.setForeground(bgcolor);}, 
                        function() {this.setBackground(bgcolor);lbl_txt.setForeground(fgcolor);} );

        this.appendChild(lbl_txt);
        this.getTxt = function() {return txt;}
        
        this.setBackground(bgcolor);
        lbl_txt.setForeground(fgcolor);
    }
    
    var buttons = ["C*/<","789+", "456-", "123=", "n0. "];
    
    for (var row in buttons) {
        for (var col in buttons[row]) {
            if (buttons[row][col] == " ") continue;
            var b0 = new CalcButton(col,row, buttons[row][col]);
            view_buttons.appendChild(b0);
        }
    }
    
    this.appendChild(view_buttons);
    this.appendChild(lbl_display);
    this.appendChild(lbl_history);
    
    
    
    this.setDisplay = function(formulaText) {
        var res = formulaText;
        res = res.replace(/ \* /g,"<span style='color:#39c'>&times;</span>");
        res = res.replace(/ \/ /g,"<span style='color:#39c'>&divide;</span>");
        res = res.replace(/ - /g,"<span style='color:#39c'>&minus;</span>");
        res = res.replace(/-/g,"&#x2011;");
        res = res.replace(/ \+ /g,"<span style='color:#39c'>&plus;</span>");
        res = res.replace(/ \= /g,"<span style='color:#39c'>=</span>");
        res = res.replace(/ \/ /g,"&divide;");
        lbl_display.setHtml(res);
    }
    
    this.setHistory = function(historyText) {
        var res = historyText;
        res = res.replace(/ \* /g, "&times");
        res = res.replace(/ \/ /g, "&divide;");
        res = res.replace(/ - /g, "&minus;");
        res = res.replace(/-/g,"&#x2011;");
        res = res.replace(/ \+ /g,"&plus;");
        res = res.replace(/ \= /g,"=");
        res = res.replace(/ \/ /g,"&divide;");
        lbl_history.setHtml(res);
    }
    
    this.setHistory("");
    
    this.resize = function(w, h) {
        var SIZE = Math.min(w/4, h/6.4);
        var SIZEW = w/4;
        var baseFontSize = Math.round(SIZE/3.5);
        view_buttons.setStyle("height", SIZE*5+2);
        lbl_display.setStyle("bottom", SIZE*5+2);
        lbl_history.setStyle("bottom", SIZE*5+2+SIZE*.5);
        this.setStyle("width", w);
        this.setStyle("height", h);
        this.setStyle("fontSize", baseFontSize);
        //console.log(baseFontSize)
    }
    
    window.onresize = function() {
        this.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
    }.bind(this);

    window.onresize();

}