var assert = require('chai').assert;


describe('Describes basic hooks',function(){

  beforeEach(function(){
    console.log('I am called before each test');
  })

  afterEach(function(){
    console.log('I am called after each test');
  })


  before(function(){
    console.log('I am called once before test suite');
  });

  after(function(done){
    console.log('I am called once after test suite, I am also calling done() to show how async things can be done');
    done();
  });

  it('1=1',function(){
    assert.equal(1,1);
  })

  it('2=2',function(){
    assert.equal(2,2);
  })

})
