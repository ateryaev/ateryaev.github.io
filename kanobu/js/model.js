var GAME_CHOICE_NAME = ["Rock", "Scisors", "Paper"];
var GAME_CHOICES = {"R":"Rock", "S":"Scisors", "P":"Paper"};
var GAME_RESULT_DRAW = 0;
var GAME_RESULT_WIN = 1;
var GAME_RESULT_LOST = 2;
var GAME_RESULT_WAIT = 3;
var GAME_RESULT_EMPTY = 4;


function gameResult(your_choice, enemy_choice) {
    if (!GAME_CHOICES[your_choice]) return GAME_RESULT_EMPTY;
    if (!GAME_CHOICES[enemy_choice]) return GAME_RESULT_WAIT;
    if (your_choice == enemy_choice) return GAME_RESULT_DRAW;
    switch (your_choice+enemy_choice) {
        case "RS":
        case "SP":
        case "PR":
            return GAME_RESULT_WIN;
    }
    return GAME_RESULT_LOST;
}

function Model() {
    
    var userId = "tetet:V3hs1VjAkp2T9GQ3"//"2asdasd:WLbBNSxqX92YlO6V"//234:5pePeY5nbNg0SZn6";//"Anton:123";
    //var userId = "";
    
    userId = getLocalStorageValue("UserId");
    if (!userId) userId = "";
    this.userId = userId;
    
    var results = getLocalStorageValue("GamesHistory");;
    if (!results) results = [];
    
    LOG("LOADING: "+userId, results);
    
// SETTERS
    this.setResults = function(res) {
        setLocalStorageValue("GamesHistory", res);
        results = res;
    }
    
    this.reset = function() {
        this.setUserId("");
        this.setResults([]);
    }
    
    this.setUserId = function(id) {
        userId = id;
        setLocalStorageValue("UserId", id);
    }
    
// GETTERS    
    this.getResults = function() {return results;}
    
    this.getUserId = function() {
        return userId;
    }
    
    this.getUserName = function() {
        if (!userId) return "";
        return userId.split(":")[0];
    }
    
    this.getLastGame = function() {
        return lastgame;
    }

    this.needSignUp = function() {
      return (userId.split(":").length < 2);
    }
    
    this.isWaiting = function() {
        if (results.length==0) return false;
        if (!results[0].answer) return true;
        return false;
    }
}