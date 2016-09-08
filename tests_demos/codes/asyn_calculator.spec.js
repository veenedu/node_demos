// console.log(calculator.add(1,2));
var assert = require('chai').assert;
const calculator = require('./asyn_calculator');

describe('Async calculator Tests',function(){
  it('Should add two numbers', function(done){
    calculator('add',1,2,function(err,res){
      assert.equal(res,3);
      done();
    })
  })

  it('Should  subtract a number from another', function(done){
    calculator('subtract',12,5,function(err,res){
      if(err){
         done(err)
      }else{
        assert.equal(res,7);
        done();
      }
    })
  })

  it('Should multiply two numbers', function(done){
    calculator('multiply',13,2,function(err,res){
      assert.equal(res,26);
      done();
    })
  })




});
