var assert = require('chai').assert;
const utils = require('./utils');
var sourceTestFile= './videos/test.mp4';
var destTestFile = './videos/sc.jpg';
var testDir = './videos/test_dir';

describe('Utils Tests',function(){

  it('Should convert time to moment', function(done){
    assert.equal(utils.timeToMoment(300),'00:05:00');
    assert.equal(utils.timeToMoment(400),'00:06:40');
    assert.equal(utils.timeToMoment(5550),'01:32:30');
    done()
  })

  it('Should get correct video metadata',function(done){
    utils.getVideoMetaData(sourceTestFile,function(err,res){
      assert.isNull(err,'Correct meta data should be received')
      assert.deepEqual(res,{duration:30,height:720,width:1280,size:11});
      done();
    })
  })


  it('Should generate thumb',function(done){
    utils.generateThumb(sourceTestFile,destTestFile,'00:00:10',function(err){
      assert.isNull(err,'File generated');
      done();
    },'1200x800')
  })


  it('Should calculate proper thumbnail dimensions',function(){
      assert.deepEqual(utils.calculateThumbDimension(200,200,200),{width:200,height:200});

      assert.deepEqual(utils.calculateThumbDimension(200,400,200),{width:200,height:100});

      assert.deepEqual(utils.calculateThumbDimension(200,50,20),{width:50,height:20});

      assert.deepEqual(utils.calculateThumbDimension(200,12000,600),{width:200,height:10});
  })


  it('Should read files of a directory',function(done){
    utils.getFilesOfDirectory(testDir, function(err,res){
      assert.isNull(err);
      var filesArray = [ { dir: './videos/test_dir', fileName: '.DS_Store' },
                         { dir: './videos/test_dir', fileName: 'file1.js' },
                         { dir: './videos/test_dir', fileName: 'file2.js' },
                         { dir: './videos/test_dir', fileName: 'file5' },
                        { dir: './videos/test_dir', fileName: 'file6' },
                        { dir: './videos/test_dir/folder1', fileName: 'file3.js' },
                        { dir: './videos/test_dir/folder1', fileName: 'file4.js' } ];
      assert.deepEqual(res,filesArray);
      done();
    })
  });


  it('Should read return empty array for invalid directory',function(done){
    utils.getFilesOfDirectory('testDirXYZ', function(err,res){
      assert.isNull(err);
      var filesArray = [];
      assert.deepEqual(res,filesArray);
      done();
    })
  });

  it('should check getFileExtension()',function(){
    assert.equal(utils.getFileExtension('xyz.mp4'),'mp4');
    assert.equal(utils.getFileExtension('xyz.mp3'),'mp3');
    assert.equal(utils.getFileExtension('xyz.avi'),'avi');
    assert.equal(utils.getFileExtension('.mp4'),'mp4');
    assert.equal(utils.getFileExtension('xyz'),'');
    assert.equal(utils.getFileExtension('xyz.foo.mp4'),'mp4');
    assert.equal(utils.getFileExtension('xyz.foo.bar.mp4'),'mp4');
  });


  it('should check getFileNameWithoutExtension()',function(){
    assert.equal(utils.getFileNameWithoutExtension('xyz.mp4'),'xyz');
    assert.equal(utils.getFileNameWithoutExtension('xyz.mp3'),'xyz');
    assert.equal(utils.getFileNameWithoutExtension('.mp4'),'');
    assert.equal(utils.getFileNameWithoutExtension('xyz'),'');
    assert.equal(utils.getFileNameWithoutExtension('xyz.foo.mp4'),'xyz.foo');
    assert.equal(utils.getFileNameWithoutExtension('xyz.foo.bar.mp4'),'xyz.foo.bar');
  });

  it('Should check isVideoFile()',function(){
    assert.equal(utils.isVideoFile('xyz.mp4'),true);
    assert.equal(utils.isVideoFile('xyz.avi'),true);
    assert.equal(utils.isVideoFile('xyz.flv'),true);
    assert.equal(utils.isVideoFile('xyz.mkv'),true);
    assert.equal(utils.isVideoFile('xyz.mpg'),true);
    assert.equal(utils.isVideoFile('xyz.wmv'),true);

    assert.equal(utils.isVideoFile('xyz.mp3'),false);
    assert.equal(utils.isVideoFile('xyz.jpg'),false);
    assert.equal(utils.isVideoFile('mp4'),false);
    // assert.equal(utils.isVideoFile('.mp4'),false);
    assert.equal(utils.isVideoFile('/mp4'),false);
    assert.equal(utils.isVideoFile('mp4.m'),false);
  })


  it('should check getFrameTime()',function(){
    assert.deepEqual(utils.getFrameTime(300,1),['00:02:30']);
    assert.deepEqual(utils.getFrameTime(300,2),['00:01:40','00:03:20']);
    assert.deepEqual(utils.getFrameTime(6000,5),['00:16:40','00:33:20','00:50:00','01:06:40','01:23:20']);
  });

});
