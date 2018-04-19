function Number(defaultNumber) {
    
    var num = "";
    var sign = "";
    function isDot(chr) { return (chr == "."); }
    function isMinus(chr) { return (chr == "-"); }
    
    function hasDot() { return (num.indexOf(".") > -1); }
    
    function changeSign() {
        sign = (sign==""?"-":"");
    }
    
    this.addDigit = function(chr) {
        if (chr==",") chr = "."
        if (num == "0" && !isDot(chr)) num = chr
        else if (isDot(chr) && hasDot()) return;
        else if (isDot(chr) && num == "") num = "0.";
        else if (isMinus(chr)) changeSign();
        else num += chr;
    }
    this.backspace = function() {
        if (num!= "") {
            num = num.slice(0, -1);
        } else if (sign!="") {
            sign = "";
        }
    }
    
    this.getDisplay = function() {return sign+num;}
    this.finalize = function() {
        if (num == "") num = defaultNumber;
        num = eval(num)+"";
    }
}

function Operator() {
    var oper = "";
    
    this.set = function(chr) {oper = chr;}
    this.isSet = function() { return (oper != "");}
    this.getDisplay = function() {return oper==""?"":(" " +oper+ " ");}
}

function NumberOperator(defaultNumber) {
    var num = new Number(defaultNumber);
    var opr = new Operator();
    
    this.canAddDigit = function() {return !opr.isSet();}
    this.addDigit = function(chr) {num.addDigit(chr);}
    this.setOperator = function(chr) {num.finalize();opr.set(chr);}
    this.getDisplay = function() {return num.getDisplay() + opr.getDisplay();}
    this.backspace = function() {
        if (opr.isSet()) {
            opr.set("");
        } else {
            num.backspace();
        }
    }
}

function Formula(defaultNumber) {
    var formula = [new NumberOperator(defaultNumber)];
    
    function lastNumOpr() {return formula[formula.length-1];}
    
    this.addDigit  = function(chr) {
        if (!lastNumOpr().canAddDigit()) formula.push(new NumberOperator(defaultNumber));
        lastNumOpr().addDigit(chr);
    }
    
    this.setOperator  = function(chr) {lastNumOpr().setOperator(chr);}
    
    this.getDisplay = function() {
        var str = "";
        for (var no of formula) str += no.getDisplay();
        return str;
    }
    
    this.evaluate = function() {
        this.setOperator("");
        if (this.getDisplay()=="") this.addDigit("0");
        return eval(this.getDisplay()) + "";
    }
    
    this.backspace = function() {
        lastNumOpr().backspace();
        if (lastNumOpr().getDisplay() == "" && formula.length>1) {
            formula.pop();
        }
    }
}

/////////////////////////////


function testCALC() {
    
    var tests = [
        ["", ""],
        ["n00", "-0"],
        ["n.n", "0."],
        ["=", "0 = 0 "],
        ["n100+nn222=+1n=", "-100 + 222 = 122 122 + -1 = 121 "],
        ["1/3=", "1 / 3 = 0.3333333333333333 "],
        ["1+2=", "1 + 2 = 3 "],
        ["1+02.0=.01n0", "1 + 2 = 3 -0.010"],
        ["0/1=+1=", "0 / 1 = 0 0 + 1 = 1 "],
        ["0010", "10"],
        ["0.1", "0.1"],
        [".20", "0.20"],
        ["00301.1.20.2", "301.1202"],
        ["2.01000+-/*", "2.01 * "],
        ["22+1+3+3", "22 + 1 + 3 + 3"],
        ["22+1-10", "22 + 1 - 10"],
        ["022+1+*-10.000*", "22 + 1 - 10 * "],
        ["2.+", "2 + "],
        ["1/3=", "1 / 3 = 0.3333333333333333 "],
    ];
    
    
    for (var test of tests) {
        var calc = new CALC();
        var input = test[0];
        var out = test[1];
        
        for (var chr of input) {
            if ("-+*/".indexOf(chr) > -1) {
                calc.addOperator(chr);    
            }
            else if (chr == "=") {
                calc.solve();
            } else if (chr == "n") {
                calc.addDigit("-");    
            } else {
                calc.addDigit(chr);
            }
        }
        
        var actual = calc.getDisplay();
        var pass = (out == actual ? "  PASS":"! FAIL")
        
        console.log(pass + " (IN: >"+input + "< EXPECTED: >" + out + "< ACTUAL: >" + actual + "<)")
    }
    
    
    
    
}

//testCALC();