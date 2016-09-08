/*
  In this code sample we will create our own logger using wiston and use it
*/


const winston = require('winston');

/*
Create a new logger

Transport1: => Send colorized output to Console

Transport2: => Send output to a file

Both logging calls will be printed to console, only error will be send to output file,
because in that transport you have specifically said that you are are interested in leevel=erro
*/

var logger  = new winston.Logger({
  transports:[
    new winston.transports.Console({
      colorize:true
    }),
    new winston.transports.File({
      level:'error',
      filename:'output.log'
    })
  ]
});

logger.info("I am info");
logger.error("I am error");
