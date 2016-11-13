window.onload = function() {
    
BNK = new Bank();
SG = new ScoreGenerator(BNK);

var divBnkTotal = window.getElementById("BNK.TOTAL");
    
function update() {
    divBnkTotal.innerHTML = BNK.getTotal();
}
 update();
}