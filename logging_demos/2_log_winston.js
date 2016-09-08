const winston = require('winston');

//In this file we remove default console and add our console.

/*
  we are using default winston object
  The call to info will not display anything as there is nit tramsport for info level logging
*/


winston.remove(winston.transports.Console)
       .add(winston.transports.Console,{
         level:"error",
         colorize:true,
         timestamp:true
       });

 winston.info("Hello");
 winston.error("My error");
