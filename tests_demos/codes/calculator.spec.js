var assert = require('chai').assert;
const calculator = require('./calculator');

describe('calculator Tests',function(){
  it('Should add two numbers', function(){
    assert.equal(calculator.add(1,2),3);
  })

  it('Should  subtract a number from another', function(){
    assert.equal(calculator.subtract(12,5),7);
  })


  it('Should multiply two numbers', function(){
    assert.equal(calculator.multiply(13,2),26);
  })


});
