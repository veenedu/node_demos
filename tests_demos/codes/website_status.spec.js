const assert = require('chai').assert;
var superagent = require('superagent');

describe('It test an http request test',function(){
  it('should get goolge.com',function(done){
    superagent
    .get('http://google.com')
    .end(function(err,res){
      assert.equal(res.status,200);
      done();
    })
  });
})
