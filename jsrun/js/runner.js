//global functions to be used in programms

var RUNNER_ENV = {
    appendToLog:function(txt) {console.log(txt);},
    clearLog:function() {}
}

function RUN(code) {

    
    function isNormalInteger(str) {
        var n = Math.floor(Number(str));
        return String(n) === str && n >= 0;
    }
    var numOfPrints = 0;
    
    function print(txt) {
        numOfPrints++;
        if (numOfPrints>500) throw("ERROR: Too many prints");
        RUNNER_ENV.appendToLog(("00"+numOfPrints).substr(("00"+numOfPrints).length-3)+": "+txt);
        
    }

    function clear() {
        RUNNER_ENV.clearLog();
    }

    function random(from, to) {
        return Math.floor(from + Math.random()*(to-from+1));
    }
    
    function alert(msg) {
        print("ALERT: "+msg);
        window.alert(msg);
    }
    
    function prompt(msg) {
        print("PROMPT: "+msg);
        var answer = window.prompt(msg);
        print(">>>>>>> "+answer);
        if (isNormalInteger(answer)) return answer*1;
        return answer;
    }
    
    
    rnd = random;
    input = prompt;
    
    try {
        eval(code);
    } catch (ex) {
        RUNNER_ENV.appendToLog(ex);
        //console.log(ex.message)
        //console.log(ex.stack)
    }
}