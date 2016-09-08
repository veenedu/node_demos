var calculator ={
  add: function(a,b){
    return a + b
  },
  subtract: function(a,b){
    return a - b
  },
  multiply: function(a,b){
    return a * b
  }
}

module.exports = function(method,a,b,cb){
  setTimeout(function(){
    cb(null,calculator[method](a,b));
  },1000)
};
