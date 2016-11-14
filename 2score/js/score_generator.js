//function now() {
//    return new Date().getTime();
//}



function ScoreGenerator(bank) {
    var level = 0;
    var updatedOn = 0;
    var msInPeriod = 0;
    
    
    this.getUpgradeCost = function() {
        return Math.pow(2, level); //1,2,4,8,16...
    }
    
    this.getIncome = function() {
        return level; //1,2,3,4,5...
    }
    
    this.getIncomePeriod = function() {
        return 2000; //every 2 sec
    }
    
    this.getLevel = function() {
        return level;
    }
    
    this.levelUp = function() {
        bank.remove(this.getUpgradeCost());
        level++;
    }
    
    this.update = function(currentTimeInMs) {
        if (updatedOn==0) updatedOn = currentTimeInMs;
        
        var timeDiff = currentTimeInMs - updatedOn;
        msInPeriod += timeDiff;
        var times = Math.floor(msInPeriod/this.getIncomePeriod());
        msInPeriod = msInPeriod - times*this.getIncomePeriod();
        
        bank.add(times * this.getIncome())
        
        updatedOn = currentTimeInMs;
        
    }
}
