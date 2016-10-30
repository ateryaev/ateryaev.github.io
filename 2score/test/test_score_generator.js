var BNK, SG;

function testInit() {
    BNK = new Bank();
    SG = new ScoreGenerator(BNK);
}

QUnit.test( "Score Generator: creation", function( assert ) {
    var bank = new Bank();
    assert.ok( bank );
    var sg = new ScoreGenerator(bank);
    assert.ok( sg );
    
    assert.equal( bank.getTotal(), 1);
    assert.equal( sg.getLevel(), 0);
});

QUnit.test( "Score Generator: init values", function( assert ) {
    var bank = new Bank();
    var sg = new ScoreGenerator(bank);
    var timeStart = 1000000;
    sg.update(timeStart);
    assert.equal( bank.getTotal(), 1);
    assert.equal( sg.getLevel(), 0);
    assert.equal( sg.getIncome(), 0);
    assert.equal( sg.getIncomePeriod(), 5000);
});

QUnit.test( "Score Generator: levelUp, incoming", function( assert ) {
    testInit();
    var timeStart = 1000000;
    SG.update(timeStart);
    SG.levelUp();
    assert.equal(BNK.getTotal(), 0);
    
    SG.update(timeStart+5000);
    assert.equal( BNK.getTotal(), 1);
    
    SG.update(timeStart+14000);
    assert.equal( BNK.getTotal(), 2);
    
    SG.update(timeStart+15001);
    assert.equal( BNK.getTotal(), 3);
    
    SG.update(timeStart+5000*1234+2500);
    assert.equal( BNK.getTotal(), 1234);
});