function Bank() {
    var money = 1;
    
    this.getTotal = function() { return money;}
    this.remove = function(amount) {money -= amount;}
    this.add = function(amount) {money += amount;}
}
