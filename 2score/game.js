var ScoreGeneratorUI = function(x,y) {

	AFW.View.call(this,{top:10, left:0, right:0, height:60});
	this.setForeground("#555");
	
	var lbl_income = new AFW.Label({top:0,right:"60%",height:40}, 40, "#fff", "right", "+2");
	lbl_income.getHtmlDiv().style.lineHeight = "40px"
	lbl_income.getHtmlDiv().style.margin = "10px"
	this.appendChild(lbl_income);
	
	var lbl_details = new AFW.Label({top:0,left:"40%"}, 12, "#fff", "left", "every 5s<br>next round in 4s");
	lbl_details.getHtmlDiv().style.lineHeight = "20px"
	lbl_details.getHtmlDiv().style.margin = "10px"
	this.appendChild(lbl_details);
	
	var btn_upgrade = new AFW.View({left:"60%",top:0,bottom:0,width:200}, "#eee");
	btn_upgrade.getHtmlDiv().style.margin = "5px"
	this.appendChild(btn_upgrade);
	
	
	
	var lbl_level = new AFW.Label({top:0,left:0}, 12, "#000", "left", "LVL<br>2");
	lbl_level.getHtmlDiv().style.lineHeight = "20px"
	lbl_level.getHtmlDiv().style.margin = "5px 10px"
	btn_upgrade.appendChild(lbl_level);
	
	var lbl_upgrade_cost = new AFW.Label({right:0,left:0}, 12, "#000", "right", "UPGRADE<br>1,080");
	lbl_upgrade_cost.getHtmlDiv().style.lineHeight = "20px"
	lbl_upgrade_cost.getHtmlDiv().style.margin = "5px 10px"
	btn_upgrade.appendChild(lbl_upgrade_cost);
	
	
	btn_upgrade.addTouchStartListner(function(x,y){
		btn_upgrade.setBackground("#8f8");
		lbl_level.setForeground("#000");
		lbl_upgrade_cost.setForeground("#000");
	});
	
	btn_upgrade.addTouchEndListner(function(x,y){
		btn_upgrade.setBackground("#eee");
		lbl_level.setForeground("#000");
		lbl_upgrade_cost.setForeground("#000");
	});
	
	
	this.setIncome = function(num) {
		lbl_income.setHtml("+"+num);
	}
	
	this.setLevel = function(num) {
		lbl_level.setHtml("LVL<br>"+num);
	}
	
	this.setIncome(1);
	this.setLevel(1);
	//lock
	/*
	var view_vline = new AFW.View({left:SIZE*0.5,top:MARGIN,bottom:MARGIN,width:1}, "#444");
	this.appendChild(view_vline);
	var lbl_locked = new AFW.Label({top:SIZE/2-MARGIN/2,right:0,left:0,height:40}, 15, "#000", "center", "LOCKED");
	lbl_locked.setBackground("#555");
	this.appendChild(lbl_locked);
	*/
	//active
	/*
	var lbl_income = new AFW.Label({top:MARGIN,right:0,left:0,height:SIZE/2-MARGIN}, 40, "#000", "center", "12");
	this.appendChild(lbl_income);

	var view_hline = new AFW.View({top:SIZE*0.5,left:MARGIN,right:MARGIN,height:1}, "#777");
	this.appendChild(view_hline);

	var lbl_timer = new AFW.Label({top:SIZE/2,right:0,left:0,height:SIZE/2-MARGIN}, 15, "#000", "center", "00:05");
	this.appendChild(lbl_timer);
	*/
	
	
	
	
}

window.onload = function() {
    
	var view_title = new AFW.View({top:0,left:0,right:0,height:"50%"}, "#eee");
	AFW.appendChild(view_title);
	
	var view_content = new AFW.View({bottom:0,left:0,right:0,height:"50%"}, "#222");
	AFW.appendChild(view_content);
	
	var lbl_points_available_txt = new AFW.Label({bottom:0,left:"40%",height:20}, 12, "#000", "left", "points available");
	lbl_points_available_txt.getHtmlDiv().style.margin = "10px"
	lbl_points_available_txt.getHtmlDiv().style.lineHeight = "20px"
	view_title.appendChild(lbl_points_available_txt);
	
	
	var lbl_points_availabel_num = new AFW.Label({bottom:0,right:"60%",height:40}, 40, "#000", "right", "123");
	lbl_points_availabel_num.getHtmlDiv().style.margin = "10px"
	lbl_points_availabel_num.getHtmlDiv().style.lineHeight = "40px"
	view_title.appendChild(lbl_points_availabel_num);
	
	var view_sg = new ScoreGeneratorUI();
	view_content.appendChild(view_sg);
	
	/*
    BNK = new Bank();
    SG = new ScoreGenerator(BNK);

    var divBnkTotal = window.document.getElementById("BNK.TOTAL");
    var divSgIncome = window.document.getElementById("SG.INCOME");
    var divSgLevel = window.document.getElementById("SG.LEVEL");
    var divSgUpgradeCost = window.document.getElementById("SG.UPGRADE");
    var divSgPeriod = window.document.getElementById("SG.PERIOD");
    
    var divSgUpgradeButton = window.document.getElementById("SG.UPGRADE.BUTTON");
    
    


    divSgUpgradeButton.onclick = function() {
        
        if (BNK.getTotal() >= SG.getUpgradeCost()) {
            SG.levelUp();    
        }
        update();
        //alert(1)
    }
    
    function update() {
        divBnkTotal.innerHTML = BNK.getTotal();
        divSgIncome.innerHTML = SG.getIncome();
        divSgLevel.innerHTML = SG.getLevel();
        divSgUpgradeCost.innerHTML = SG.getUpgradeCost();
        divSgPeriod.innerHTML = Math.round(SG.getIncomePeriod()/1000);
        
        SG.update(new Date().getTime());
        
        window.setTimeout(function(){
            update();    
        }, 100);
    }
    update();
    */
    
    
}