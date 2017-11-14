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
    function print(txt) {
        RUNNER_ENV.appendToLog(txt);
    }

    function clear() {
        RUNNER_ENV.clearLog();
    }

    function random(from, to) {
        a = from + Math.random()*(to-from+1);
        a = Math.floor(a)
        return a;
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
        print(ex);
        console.log(ex.message)
        console.log(ex.stack)
    }
}