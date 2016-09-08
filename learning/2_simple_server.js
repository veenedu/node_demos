//In this example I  have creared a simple server without using any package, just pure node
// Node is a platform that uses javascript language

var http = require('http');
var port =5000;

var server =  http.createServer(function(req,res){
    res.writeHead(200,{
      'Content-Type' : 'text/plain'
    });

    res.end("Hello World")
});

server.listen(port);
console.log("Server running at port:"+port);
