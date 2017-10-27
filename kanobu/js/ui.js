var GameButton = function(p_bounds, txt, p_action) {
    var lbl_txt = new AFW.Label({top:0,right:0,left:0,bottom:0,color:"#fff"}, txt);
    p_bounds.background = "#000";
    AFW.Button.call(this, p_bounds, p_action, function() {this.setBackground("#eee");lbl_txt.setForeground("#000");}, function() {this.setBackground("#222");lbl_txt.setForeground("#eee");});
    this.appendChild(lbl_txt);

    this.activate = function() {
        this.setActive(true);
        this.setBackground("#222");
        lbl_txt.setForeground("#eee");
    }.bind(this);
    
    this.deactivate = function() {
        this.setActive(false);
        this.setBackground("#ddd");
        lbl_txt.setForeground("#fff");
    }.bind(this);
    
    this.activate();
}

var WindowBase = function(inner_height, action) {
    AFW.View.call(this, {top:0,right:0,left:0,bottom:0,height:inner_height+10+50, width:300, background:"#fff"});

    var view_content = new AFW.View({top:55,left:5,bottom:5,right:5});
    var view_title = new AFW.Label({top:0,left:0,height:50,right:0,color:"#444"});
    
    this.appendChild(view_title);
    this.appendChild(view_content);
    
    this.appendChild = view_content.appendChild.bind(view_content);
    this.removeChild = view_content.removeChild.bind(view_content);
    
    this.setAction = function(p_action) {action=p_action;}
    this.act = function(args) {
        window.setTimeout( action, 1, args);
    }
    
    this.actor = function(args) {return function(){this.act(args)}.bind(this)}
    
    this.setTitle = function(txt) {
        if (!txt || txt=="") {
            view_title.setHtml("");
            view_content.applyStyles({top:5});
            this.applyStyles({height:inner_height+10});
        } else {
            view_content.applyStyles({top:55})
            this.applyStyles({height:inner_height+10+50});
            view_title.setHtml(txt);
        }
    }
}

var WindowLogin = function(p_action) {
    
    WindowBase.call(this, 105, p_action);
    this.setTitle("Kanobu");
    var inp_login, btn_login;
    
    function onLoginInput() {
        LOG( inp_login.getValue());
        if (inp_login.getValue().length<3) {
            btn_login.deactivate();
        } else {
            btn_login.activate();
        }
    }
    
    inp_login = new AFW.TextField({top:0,right:0,left:0,height:50,background:"#eee"}, "your name here...");
    btn_login = new GameButton({top:55,right:0,left:0,height:50}, "GO", this.actor(this));

    this.appendChild(inp_login);
    this.appendChild(btn_login);
    
    this.getLogin = function() {return normalizeString(inp_login.getValue());}
    this.setLogin = function(login) {inp_login.setValue(normalizeString(login));}
    
    this.focus = inp_login.focus;
    
    this.sync = function() {
      this.getLogin(M.getUserName());
    }
}

var WindowError= function(p_action) {
    WindowBase.call(this, 105, p_action);
    this.setTitle("");
    
    var lbl_msg = new AFW.Label({top:0,right:"auto",left:0,height:50,color:"#f43"}, "MSG");
    var btn_ok = new GameButton({top:55,right:0,left:0,height:50}, "OK", this.actor());
    
    this.setError = function(msg) {lbl_msg.setHtml(msg)};
    this.appendChild(lbl_msg);
    this.appendChild(btn_ok);
}

var WindowLoading= function() {
    WindowBase.call(this, 50);
    this.setTitle();
    
    var lbl_msg = new AFW.Label({top:0,right:"auto",left:0,height:50,bxxackground:"#ddd"}, "LOADING...");
    this.appendChild(lbl_msg);
    var tick = 0;
    var txt = ["LOADING.", "LOADING..", "LOADING...", "LOADING<span style=color:#fff>.</span>.." , "LOADING<span style=color:#fff>..</span>.", "LOADING"]
    window.setInterval(function(){
        lbl_msg.setHtml(""+txt[tick%txt.length]+"");
        tick++;
    }, 100);
}

var WindowGamePlay = function(p_action) {
    WindowBase.call(this, 160);
    this.setTitle("New Game");
    
    var lbl_footer = new AFW.Label({top:100,right:0,left:0,height:48, xbackground:"#999",xfontSize:10, color:"#666"}, "player: ANTON");
    this.appendChild(lbl_footer);
    
    var btn_r = new GameButton({top:0,left:0,height:50,right:0}, "ROCK", function() {p_action("R");});
    var btn_s = new GameButton({top:55,left:0,height:50,right:0}, "SCISSORS", function() {p_action("S");});
    var btn_p = new GameButton({top:110,left:0,height:50,right:0}, "PAPER",function() {p_action("P");});
    this.appendChild(btn_r);
    this.appendChild(btn_s);
    this.appendChild(btn_p);
}

var GameDetails = function(p_top) {
    AFW.View.call(this, {top:p_top,right:0,left:0,height:50, background:"#eee"});
    
    var lbl_left = new AFW.Label({top:0,left:5,height:40,width:"auto"}, "");
    var lbl_right = new AFW.Label({top:0,right:5,height:40}, "");
    var lbl_vs = new AFW.Label({top:0,left:0,right:0,height:40,xcolor:"rgba(0,0,0,0.5)"}, "vs");
    
    var lbl_player_name = new AFW.Label({bottom:0,left:5,height:25,color:"rgba(0,0,0,0.5)",fontSize:10}, "");
    var lbl_when = new AFW.Label({bottom:0,left:5,right:5,height:25,color:"rgba(0,0,0,0.5)",fontSize:10}, "");
    var lbl_enemy = new AFW.Label({bottom:0,right:5,height:25,color:"rgba(0,0,0,0.5)",fontSize:10}, "");
    
   // lbl_vs.appendChild(new AFW.Label({bottom:0,left:5,height:25,width:"auto",color:"#888",fontSize:10}, "Dec 12, 07:56:24"));
    
    this.appendChild(lbl_right);
    this.appendChild(lbl_left);
    this.appendChild(lbl_vs);
    this.appendChild(lbl_when);
    this.appendChild(lbl_enemy);
    this.appendChild(lbl_player_name);
    
    
    this.setEmpty = function() {
        this.setBackground("#eee");
        lbl_left.setHtml("");
        lbl_right.setHtml("");
        lbl_when.setHtml("NOTHING TO SHOW");
        lbl_enemy.setHtml("");
        lbl_player_name.setHtml("");
        lbl_when.setStyle("height", "50px");
        lbl_vs.setHtml("");
    }
    
    var blinkTimer = null;
  
    function secToStr(seconds) {
      function r(v) {return Math.round(v);}
      if (seconds>60*60*24) return [r(seconds/(60*60*24))+" days ago", 60*60];
      if (seconds>60*60) return [r(seconds/(60*60))+" hours ago", 60*10];
      if (seconds>60) return [r(seconds/60)+" minutes ago", 10];
      return [r(seconds) + " seconds ago", 1]
    }
  
    var agoTimer = null;
  
    function setWhen(p_when) {
        window.clearTimeout(agoTimer);
        if (!p_when) {
            lbl_when.setHtml("waiting");
            return;
        }
    
      
        var match = p_when.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/)
        var when = new Date(Date.UTC(match[1], match[2] - 1, match[3], match[4], match[5], match[6]));
        var now =  new Date();
        var diff = (now.getTime()-when.getTime())/1000;
        lbl_when.setHtml( secToStr(diff)[0]);
        agoTimer = window.setTimeout(setWhen, secToStr(diff)[1]*1000, p_when+"");
    }
  
    this.setResult = function(p_your_choice, p_enemy_choice, p_enemy_name, p_when) {

        lbl_when.setStyle("height", "25px");
        lbl_vs.setHtml("vs");
        lbl_player_name.setHtml(M.getUserName());
        
        var p_your_choice_txt = "...";
        var p_enemy_choice_txt = "";
        if (p_your_choice) p_your_choice_txt = GAME_CHOICES[p_your_choice].toUpperCase();
        if (p_enemy_choice) p_enemy_choice_txt = GAME_CHOICES[p_enemy_choice].toUpperCase();
        
        if (!p_enemy_name) p_enemy_name = "???";
        
        setWhen(p_when);
         
        
        lbl_left.setHtml(p_your_choice_txt);
        lbl_right.setHtml(p_enemy_choice_txt);
        //lbl_when.setHtml(p_when);
        lbl_enemy.setHtml(p_enemy_name);
        
        var res = gameResult(p_your_choice,p_enemy_choice);
        
        function blink() {
            if (!blink.cnt) blink.cnt = 0;

            if (blink.cnt%2==1) {
                lbl_right.setHtml("");
            } else {
                lbl_right.setHtml(GAME_CHOICE_NAME[Math.floor(blink.cnt/2)%3].toUpperCase());    
            }
            
            lbl_right.setStyle("color","#777")
            blinkTimer = window.setTimeout(blink, 200);
            blink.cnt++;
        }
        
        lbl_right.setStyle("color","#000") 
        
        if (res == GAME_RESULT_WIN) {
            this.setBackground("#afa");
        } else if (res == GAME_RESULT_LOST) {
            this.setBackground("#faa");
        } else if (res == GAME_RESULT_DRAW) {
            this.setBackground("#fe8");
        } else if (res == GAME_RESULT_WAIT) {
            this.setBackground("#eee");
            if (!blinkTimer) {blink();}
        } else {
            this.setBackground("#eee");
        }
        
        if (res != GAME_RESULT_WAIT && blinkTimer) {
            window.clearTimeout(blinkTimer);
            blinkTimer = null;
        }
        
    }.bind(this);
}

  
var WindowResult = function(p_action) {
    WindowBase.call(this, 215, p_action);
    
    this.setTitle("Games History");

    var game = [new GameDetails(0), new GameDetails(55),new GameDetails(110)];
    for (var g of game) this.appendChild(g);
    
    var lbl_footer = new AFW.Label({top:165,left:0,right:0,fontSize:10,height:50, color:"#444"}, "GAME IN PROGRESS");
    this.appendChild(lbl_footer);
    var btn_newgame = new GameButton({top:165,right:0,left:0,height:50}, "NEW GAME", this.actor());
    this.appendChild(btn_newgame);
    
    this.sync = function() {
        if (M.isWaiting()) {
            this.appendChild(lbl_footer);
            this.removeChild(btn_newgame);
        } else {
            this.appendChild(btn_newgame);
            this.removeChild(lbl_footer);
        }
        
        var results = M.getResults();
        
        for (var i=0;i<3;i++) {
            if (!results[i]) {
                game[i].setEmpty();
                continue;
            }
            game[i].setResult(results[i].choice, results[i].answer, results[i].answer_by, results[i].created_on);
        }
        return;
    }
}
