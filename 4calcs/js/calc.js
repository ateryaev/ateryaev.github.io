function Number(defaultNumber) {
    
    var num = "";
    var sign = "";
    function isDot(chr) { return (chr == "."); }
    function isMinus(chr) { return (chr == "-"); }
    
    function isNegative() { return (num != "" && isMinus(num[0])); }
    
    
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
}
//
//function Stack() {
//    var stack = [new Formula("0")];
//    
//    this.getCurrentFormula = function() {
//        return stack[stack.length-1];
//    }
//    
//    this.startNewFormula = function() {
//        var lastEval = this.getCurrentFormula().evaluate();
//        return stack[stack.push(new Formula(lastEval))-1];
//    }
//    
//    this.getDisplay = function() {
//        var str = "";
//        for (var i=0;i<stack.length;i++) {
//            var formula = stack[i];
//            str += formula.getDisplay();
//            if (i < stack.length-1) {
//                str += " = " + formula.evaluate() + " ";
//            }
//        }
//        
//        return str;
//    }
//}
//
//
//var CALC = function() {
//    
//    var stack = new Stack();
//    
//    this.addDigit = function(chr) {
//        var formula = stack.getCurrentFormula();
//        formula.addDigit(chr);
//    }
//    
//    this.addOperator = function(chr) {
//        var formula = stack.getCurrentFormula();
//        formula.setOperator(chr);
//    }
//    
//    this.solve = function() {
//        stack.startNewFormula();
//    }
//    
//    this.getDisplay = function() {
//        return stack.getDisplay();
//    }
//}


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