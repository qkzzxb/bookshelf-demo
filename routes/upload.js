var express = require('express');
var router = express.Router();
var multer  = require('multer')
var path = require('path');
var fs = require("fs");
const url = require('url');
const uploadDirName = 'uploadImg';
var uploadMid = multer({
  dest:'./public/' + uploadDirName
});
const { Upload } = require('../model');
router.post('/', uploadMid.single('file') ,function(req, res, next) {//文件
  var file=req.file;
  //以下代码得到文件后缀
  name=file.originalname;
  nameArray=name.split('');
  var nameMime=[];
  l=nameArray.pop();
  nameMime.unshift(l);
  while(nameArray.length!=0 && l!='.'){
    l=nameArray.pop();
    nameMime.unshift(l);
  }
  //Mime是文件的后缀
  Mime=nameMime.join('');
  fs.renameSync( './public/' + uploadDirName+ '/' +file.filename, './public/' + uploadDirName+ '/' + file.filename + Mime);
  res.json({ code:200, message:'上传成功', url: 'http://localhost:3000/' + uploadDirName+ '/' +file.filename + Mime});
});
router.post('/v2', function(req, res, next) {//base64
  var path = 'uploadimg/'+ Date.now() +'.png';
  let base64 = req.body.base64;
  let dataBuffer = new Buffer(base64, 'base64');
  fs.writeFile('public/' + path, dataBuffer, function(err){//用fs写入文件
      if(err){
        res.json({ code: -100, message:'上传失败', data:err });
      }else{
        res.json({ code: 200, message:'上传成功', url: 'http://localhost:3000/' + path });
      }
  })
})
module.exports = router;
