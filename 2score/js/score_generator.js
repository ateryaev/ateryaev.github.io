configs = [
	{income_period:5000},
	{income_period:10000}
]


function ScoreGenerator(bank) {
    var level = 0;
    var updatedOn = 0;
    var msInPeriod = 0;
    
	//virtual functions:
    this.getUpgradeCost = function() {
        return Math.round(level*level*0.2)+level+1; //1,2,4,8,16...
    }
    
    this.getIncome = function() {
        return Math.round(level+level*0.2); //1,2,3,4,5...
    }
    
    this.getIncomePeriod = function() {
        return 1000;
    }
	
	//final function:
	this.getTillNextIncomePeriod = function() {
		return this.getIncomePeriod() - msInPeriod;
	}
    
    this.getLevel = function() {
        return level;
    }
	
    this.levelUp = function() {
        bank.remove(this.getUpgradeCost());
        level++;
    }
    
    this.update = function(currentTimeInMs) {
		if (level==0) return;
		
        if (updatedOn==0) updatedOn = currentTimeInMs;

        var timeDiff = currentTimeInMs - updatedOn;
        msInPeriod += timeDiff;
        var times = Math.floor(msInPeriod/this.getIncomePeriod());
        msInPeriod = msInPeriod - times*this.getIncomePeriod();
        
        bank.add(times * this.getIncome())
        
        updatedOn = currentTimeInMs;
        
    }
}

function ScoreGenerator2(bank) {
	ScoreGenerator.call(this, bank);
	
	this.getIncomePeriod = function() {
        return 1000;
    }
	
	this.getUpgradeCost = function() {
		var lvl = this.getLevel();
        return Math.round(Math.pow(1.2, lvl))+lvl+1; //1,2,4,8,16...
    }
	
	this.getIncome = function() {
		var lvl = this.getLevel();
        return Math.round(   ((lvl+1)*lvl*0.2)/2 + lvl   ); //1,2,3,4,5...
    }
    
}