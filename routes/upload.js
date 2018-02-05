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
router.post('/', uploadMid.single('file') ,function(req, res, next) {
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
  fs.renameSync( './public/' + uploadDirName+ '/' +file.filename, './public/' + uploadDirName+ '/' +file.filename + Mime);
  res.json({message:'done', data: 'http://localhost:3000/' + uploadDirName+ '/' +file.filename + Mime});
});

module.exports = router;
