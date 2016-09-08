var utils = require('./utils');
var  _ = require('lodash');
var  async = require('async');

var BOX_SIZE = 1200;
var NUM_THUMBS = 5;
var PATH  = './videos';
var OUTPUT_PATH ='./videos/imgs';


function getFileMetaDataWrapper(file,callback){
    utils.getVideoMetaData(file.dir+'/'+file.fileName,function(err,res){
      if(err){
        callback(null);
      }
      file.meta = res;
      // console.log(file);
      callback(null,file);
    })
}


function generateThumbnail(file,callback){
  // console.log(file);
  var s = file.dir+'/'+file.fileName;
  var d = OUTPUT_PATH+'/'+utils.getFileNameWithoutExtension(file.fileName)+'_'+file.index+'.jpg';
  var dimension = file.thumbDimensions.width +'x'+ file.thumbDimensions.height;

  //codes
  console.log(d);
  utils.generateThumb(s,d,file.frame,function(){
    callback();
  },dimension);
}

utils.getFilesOfDirectory(PATH,function(err,files){

  var videoFiles = _.filter(files,function(file){
    return utils.isVideoFile(file.fileName);
  });

  async.map(videoFiles,getFileMetaDataWrapper,function(err,res){
      var videoFilesWithThumbDimension = _.map(res,function(file){
        file.thumbDimensions= utils.calculateThumbDimension(BOX_SIZE,file.meta.width,file.meta.height);
        return file;
      });

      var videoFilesWithFrames = _.map(videoFilesWithThumbDimension,function(file){
        file.frames = utils.getFrameTime(file.meta.duration,NUM_THUMBS);
        return file;
      });

      var videosFlattenedFrames = [];
      for (var i = 0; i < videoFilesWithFrames.length; i++) {
        var file = Object.assign({},videoFilesWithFrames[i]);
        for (var j = 0; j < file.frames.length; j++) {
          var _file = Object.assign({},videoFilesWithFrames[i]);
          _file.frame = file.frames[j];
          _file.index= j;
          videosFlattenedFrames.push(_file);
        }
      }

      // console.log(videosFlattenedFrames);

      console.log('generating thumb.....');

      //async => This almost hangs the system
      // async.map(videosFlattenedFrames,generateThumbnail, function(err,res){
      //   console.log('Done!!');
      // });

      //this makes system slow
      var counter = 0;
      // setInterval(function(){
      //   if(counter <  videosFlattenedFrames.length){
      //     generateThumbnail(videosFlattenedFrames[counter],function(){
      //
      //     });
      //     counter = counter + 1;
      //   }else{
      //     console.log('Done');
      //   }
      // },300);


      //this is cool too
      function rec(arrayOfFile){
        if(arrayOfFile.length>0){
              generateThumbnail(arrayOfFile[0],function(){
                rec(arrayOfFile.slice(1))
              });
        }else{
          console.log('done');
        }
      }
      rec(videosFlattenedFrames)



  })
})
