var ffmpeg = require('fluent-ffmpeg');
var thumbler = require('video-thumb');
var walk    = require('walk');

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}


//Takes a duration time and returns time in 00:00:00 format
module.exports.timeToMoment =  function (totalSec){
  var hours = parseInt( totalSec / 3600 ) % 24;
  var minutes = parseInt( totalSec / 60 ) % 60;
  var seconds = totalSec % 60;
  var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

module.exports.getVideoMetaData =  function (source, callback){
  ffmpeg.ffprobe(source, function(err, metadata) {
    if(err){
      callback && callback(err);
    }else{
      var m =   metadata.streams[0];
      var meta = {
        duration:Math.floor(metadata.format.duration),
        size:Math.floor(metadata.format.size/1000000),
        height: m.height,
        width:m.width
      };
      callback && callback(null,meta);
    }
  });
}

module.exports.generateThumb = function(source,destination,moment,callback,resolution){
  //source              => Source file with extension
  //destination         => Destination file with extension
  //moment              => a time in video, format = xx:yy:zz  => hour:minutes:seconds
  //for millisecond you add dot eg:: xx:yy:zz.mm eg:: 00:23:09.45
  //callback(optional)  =>
  //resolution(optional)=> format= 200x125  (wxh)


  //Handle space character
  source = replaceAll(source,' ','\\ ');
  destination=  replaceAll(destination,' ','\\ ');

  thumbler.extract(source, destination, moment,resolution, function(res){
      callback && callback(res)
  });
}

module.exports.calculateThumbDimension = function(boxSize,width,height){
    //boxSize => size of square in which we want to fit this. eg:200
    // boxSize   = parseInt(boxSize,10);
    // width     = parseInt(width,10);
    // height    = parseInt(height,10);

    var bigDimen = height;
    if(width>height){
      bigDimen = width;
    }

    if(boxSize> bigDimen){
      bigDimen = boxSize;
    }

    var scalling= bigDimen/boxSize

    return{
      width: Math.floor(width/scalling),
      height: Math.floor(height/scalling)
    }
}

module.exports.getFrameTime = function(duration,numOfSlice){
  //You provide video length and number of slices
  //and function will return array of moment at which you should take frame
  duration = parseInt(duration,10);
  numOfSlice = parseInt(numOfSlice,10);
  var step = Math.floor(duration/ (numOfSlice+1));

  var frames= []

  for (var i = 0; i < numOfSlice; i++) {
    frames.push(module.exports.timeToMoment( 0 + step*(i+1) ));
  }

  return frames;
}

module.exports.getFilesOfDirectory = function(path,callback){
  //returns an array of object with 2 props {path,fileName}
  //For invalid directory returns empty array

  //http://stackoverflow.com/questions/2727167/getting-all-filenames-in-a-directory-with-node-js
  //https://github.com/coolaj86/node-walk
  var files   = [];

  // Walker options
  var walker  = walk.walk(path, {
    followLinks: false
   });
  walker.on('file', function(root, stat, next) {
      // Add this file to the list of files

      files.push({
        dir:root,
        fileName:stat.name
      });
      next();
  });


  walker.on('end', function() {
      callback && callback(null,files);
  });

}


module.exports.getFileExtension = function(fileName){
    var i = fileName.lastIndexOf('.');
    return (i < 0) ? '' : fileName.substr(i+1);
}

module.exports.isVideoFile =function(fileName){
  var arrayOfVideoExtensions= ['mp4','avi','flv','mkv','mpg','wmv'];
  var ext = module.exports.getFileExtension(fileName);
  return arrayOfVideoExtensions.indexOf(ext) > -1;
}

module.exports.getFileNameWithoutExtension = function(fileName){
  return fileName.substr(0, fileName.lastIndexOf('.'));
}
