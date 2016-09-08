var fs= require('fs');

fs.readdir('./',function(a,b){
  console.log(a);
  console.log(b);
})

console.log(__dirname);
