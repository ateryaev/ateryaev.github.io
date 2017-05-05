var ScoreGeneratorUI = function(index) {

	AFW.View.call(this,{top:100+index*70, left:0, right:0, height:80}, "#fff");
	this.setForeground("#555");
    this.getStyle().margin="10px 20px";
    //this.getStyle().border="2px solid #eee";
	
	var lbl_income = new GameNumberLabel({top:0,left:0,right:0,bottom:0}, 16, "#000", "center", "+99,117,13");
	this.appendChild(lbl_income);
	
	var lbl_every = new AFW.Label({top:"50%",bottom:0,left:0,right:0}, 10, "#444", "center", "every 5s");
	//this.appendChild(lbl_every);
    
    //this.appendChild(new AFW.Label({top:"20%",height:"20%",left:0}, 10, "#000", "center", "LEVEL: 15"));
    //this.appendChild(new AFW.Label({top:"40%",height:"20%",left:0}, 10, "#000", "center", "PERIOD: 2s"));
    //this.appendChild(new AFW.Label({top:"60%",height:"20%",left:0}, 10, "#444", "center", "UPGRADE: 91,000p"));
	
	var lbl_next_round_in = new AFW.Label({top:20,left:"50%"}, 12, "#fff", "left", "next round in 4s");
	lbl_next_round_in.getHtmlDiv().style.lineHeight = "20px"
	lbl_next_round_in.getHtmlDiv().style.margin = "10px"
	//this.appendChild(lbl_next_round_in);

	
	var btn_upgrade = new AFW.View({right:0,width:80,top:0,bottom:0,height:36}, "green");
    btn_upgrade.appendChild(new AFW.Label({top:0,left:0,bottom:0,right:0}, 10, "#fff", "center", "UPGRADE<br>123,456,789"));
	btn_upgrade.getStyle().borderRadius = "0px"
	//btn_upgrade.getHtmlDiv().style.marginLeft = "150px"
	this.appendChild(btn_upgrade);
	
    var view_timer = new AFW.View({left:0,width:36,top:0,bottom:0,height:36}, "#fff");
    view_timer.getStyle().borderRadius = "50%"
    view_timer.getStyle().border = "1px solid gray"
	//this.appendChild(view_timer);
    
    this.appendChild(new AFW.Label({top:0,bottom:0,left:0,width:80}, 10, "#000", "center", "PERIOD: 2s"));
	
	var lbl_level = new AFW.Label({top:0,left:0}, 12, "#000", "left", "LVL<br>2");
	lbl_level.getHtmlDiv().style.lineHeight = "20px"
	lbl_level.getHtmlDiv().style.margin = "5px 10px"
	//btn_upgrade.appendChild(lbl_level);
	
    
    
	var lbl_upgrade_cost = new GameNumberLabel({right:0,top:0}, 12, "#000", "right", "UPGRADE<br>");
	lbl_upgrade_cost.getHtmlDiv().style.lineHeight = "20px"
	lbl_upgrade_cost.getHtmlDiv().style.margin = "5px 10px"
	//btn_upgrade.appendChild(lbl_upgrade_cost);
	
	
	btn_upgrade.addTouchStartListner(function(x,y){
		btn_upgrade.setBackground("#8f8");
		lbl_level.setForeground("#000");
		lbl_upgrade_cost.setForeground("#000");
	});
	
	btn_upgrade.addTouchEndListner(function(x,y){
		btn_upgrade.setBackground("#eee");
		lbl_level.setForeground("#000");
		lbl_upgrade_cost.setForeground("#000");
		
		NotificationCenter.postNotification("UPGRADE_BUTTON_PRESSED", {sender:this});
	}.bind(this));
	
	
	this.setIncome = function(num) {
		lbl_income.setGameNumber(num);
	}
	
	this.setLevel = function(num) {
		lbl_level.setHtml("LVL<br>"+num);
	}
	
	this.setUpgradeCost = function(num) {
		lbl_upgrade_cost.setHtml("UPGRADE<br>"+num);
        lbl_upgrade_cost.setGameNumber(num)
	}
	
	this.setEvery = function(num) {
		
		lbl_every.setHtml("EVERY "+num+" SEC");
	}
	
	this.setNextRoundIn= function(num) {
		var s = Math.floor( num/1000 );
		var ms = num - s*1000;
		ms = Math.floor( ms/100 );;
		
		lbl_next_round_in.setHtml("next round in "+s+"."+ms+"s");
		//lbl_next_round_in.setHtml("in game only");
	}
	
	this.setStateLocked = function(pointsToUnlock) {
		lbl_every.setHtml        ("<span style=color:#888>..... .. ......");
		lbl_next_round_in.setHtml("<span style=color:#888>.... ..... .. .");
		lbl_level.setHtml("");
		
		lbl_income.setHtml("<span style=color:#888>###</span>");
		
		lbl_upgrade_cost.setHtml("UNLOCK<br>"+pointsToUnlock);
	}
	
	this.setIncome(1);
	this.setLevel(1);
	this.setUpgradeCost(2);
	this.setEvery(2);
	this.setNextRoundIn(1);
	
}

function GameNumberLabel(p_bounds, p_size, p_fgcolor, p_align, prefix) {
	AFW.Label.call(this, p_bounds, p_size, p_fgcolor, p_align, prefix+"0");
	
	var value = 0;
	var value_before = 0;
	var value_visible = 0;
	
	var animation = 0;
	
	function animate(prg) {
		var v = value_before + (value-value_before)*prg;
		value_visible = v;
		v = Math.round(v);
		
        str = (v%1000)+"";
        v=Math.floor(v/1000);
        
        while(v>0) {
			var zeros = 3-str.length%4;
			str = Array(zeros+1).join("0") + str;
            str = "," + str;
            str = (v%1000)+str;
            v=Math.floor(v/1000);
        }
		this.setHtml(prefix+str);
	}
	
	
	this.setGameNumber = function(num) {
		//num += 10001022
		value = value_visible;
		ANIME.complete(animation);
		
		value_before = value_visible;
		value = num;
		
		animation = ANIME.createAnimation(150, animate.bind(this));

		
	}
}

window.onload = function() {
   
   
	//var view_bg = new AFW.View({top:0,left:"50%",right:0,bottom:0}, "#333");
	//var view_bg = new AFW.View({top:0,left:"50%",right:0,bottom:0}, "#333");
	//AFW.appendChild(view_bg);
	
	var viewport = new AFW.View({top:0,left:0,right:0,bottom:0,height:568,width:320}, "#fff");
	//var view_title = new AFW.View({top:0,left:0,right:0,height:"50%"}, "transparent");
	AFW.appendChild(viewport);
	
	var view_content = new AFW.View({bottom:0,left:0,right:0,height:"50%"}, "#333");
	//var view_content = new AFW.View({bottom:0,left:0,right:0,height:"50%"}, "transparent");
	//AFW.appendChild(view_content);
	
	/*
	var view_basic_income = new AFW.View({bottom:120,left:0,right:0,height:80,width:80}, "#222");
	//view_basic_income.setTransform({rotate:-45});
	//view_basic_income.getStyle().border="1px solid #fff"
	view_basic_income.getStyle().borderRadius="50%"
	view_title.appendChild(view_basic_income);
	
	var view_basic_income_num = new AFW.Label({bottom:0,left:0,right:0,top:0}, 20, "#eee", "center", "+1<span style='visibility:hidden'>+</span>");
	//view_basic_income_num.setTransform({rotate:45});
	
	view_basic_income.appendChild(view_basic_income_num);
	
	*/
	
	var view_circle = new AFW.Canvas({top:30,left:0,right:0,height:80,width:80}, "#fff");
	//view_circle.getStyle().borderRadius = "50%"
	//view_circle.getStyle().border = "8px solid #eee"
	
    {
        var ctx = view_circle.getCanvasContext();
	
        ctx.beginPath();
        //ctx.lineCap = 'round';
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#eee';
        ctx.arc(40,40,30, 0, 8);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ccc';//'rgba(0,0,0,0.5)';
        ctx.arc(40,40,30, 0, 0.5);
        ctx.stroke();
    }
	
	//AFW.appendChild(view_circle);
	
	var lbl_circle = new AFW.Label({top:0,right:0,left:0,bottom:0}, 12, "#000", "center", "<b>+1,090</b>");
	lbl_circle.getStyle().lineHeight = "12px"
	view_circle.appendChild(lbl_circle);
	
	var view_points = new AFW.Canvas({top:0,left:0,right:0,height:100}, "#111");
    //view_points.getStyle().borderRadius = "50%"
	//view_points.getStyle().margin = "2px"
	viewport.appendChild(view_points);
    /*
        var ctx = view_points.getCanvasContext();
	

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#444';
        ctx.arc(100, 100, 95, 0, 8);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ff8';
        ctx.arc(100, 100, 95, 0, 5);
        ctx.stroke();
	*/
	var lbl_points_availabel_num = new GameNumberLabel({right:0,left:0,bottom:0,top:0}, 24, "#fff", "center", "7,100,08");
	//var lbl_points_availabel_num = new AFW.Label({bottom:20,left:0,right:50%,height:40}, 40, "#000", "center", "<span style=color:#ddd>000<b style=font-size:50%>,</b>000<b style=font-size:50%>,</b>0</span>50");
	view_points.appendChild(lbl_points_availabel_num);

	var lbl_points_available_txt = new AFW.Label({top:50,bottom:0,right:0,left:0}, 10, "#aaa", "center", "POINTS");
	view_points.appendChild(lbl_points_available_txt);


	//view_points.appendChild(new AFW.Label({top:60,right:0,left:0,height:20}, 10, "#aaa", "center", "POINTS"));
    
    //view_points.appendChild(new AFW.Label({top:120,right:0,left:0,height:40}, 24, "#aaa", "center", "+1"));
	
	
	
	BNK = new Bank();
	
	var view_sg1 = new ScoreGeneratorUI(0);
	viewport.appendChild(view_sg1);
	
	var view_sg2 = new ScoreGeneratorUI(1);
	viewport.appendChild(view_sg2);
	
	view_sg1.SG = new ScoreGenerator(BNK, 0);
	view_sg2.SG = new ScoreGenerator2(BNK, 1);
	
	//view_sg2.setStateLocked(50);
    
	var sg_ui = [view_sg1, view_sg2];
	
	
	NotificationCenter.addObserver("UPGRADE_BUTTON_PRESSED", function(msg, options){
		//alert("Got Message: "+msg+":"+options.sender.SG);
		if (BNK.getTotal() >= options.sender.SG.getUpgradeCost()) {
            options.sender.SG.levelUp();
        }
	});
	
    function update() {
		
		
		lbl_points_availabel_num.setGameNumber(BNK.getTotal());
		
		for (var i=0; i<sg_ui.length; i++) {
			var sg = sg_ui[i].SG;
			sg_ui[i].setIncome(sg.getIncome());
			sg_ui[i].setLevel(sg.getLevel());
			sg_ui[i].setUpgradeCost(sg.getUpgradeCost());
			sg_ui[i].setEvery(Math.round(sg.getIncomePeriod()/1000));
			sg_ui[i].setNextRoundIn(sg.getTillNextIncomePeriod());
			
			sg.update(new Date().getTime());
		}
		
	/*
		
        divSgLevel.innerHTML = SG.getLevel();
        divSgUpgradeCost.innerHTML = SG.getUpgradeCost();
        divSgPeriod.innerHTML = Math.round(SG.getIncomePeriod()/1000);
      */  
        
        
        window.setTimeout(function(){update();}, 100);
    }
    update();
    
    
    
}