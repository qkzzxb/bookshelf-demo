
var express = require('express');
var router = express.Router();
var models = require('../model');
var md5 = require('../utils/md5');
router.post('/',function(req, res, next) {
  models.Admin
  .forge({username: req.body.username})
  .fetch()
  .then((hasUser) => {
    if(hasUser){
      res.json({code: -100, data: '用户已存在'});
    }else{
      var model = models.Admin.forge({
        username: req.body.username,
        password: req.body.password,
      });
      model.save().then(function(data){
        res.json({code: 200, data:{ id: data.get('id')}, msg:'创建成功!'});
      }).catch(function(err){
        res.json({code: -101, data: err});
      });
    }
    
  })
  .catch((err) => {
    res.json({code: -100, data: err});
  })
});
router.post('/update',function(req, res, next) {
  models.Admin
  .forge({username: req.body.username})
  .fetch()
  .then((admin) => {
    if(admin && admin.get('password') == md5.hex_md5(req.body.password)){
      admin.set({ password: req.body.newPassword})
      admin.save()
      .then(() => {
        res.json({code: 200, msg:'更改成功!'});
      })
      .catch((err) =>{
        res.json({code: -101, data: err});
      });
    }else{
      res.json({code: -100, data: '密码错误'});
    }
  })
  .catch((err) => {
    res.json({code: -100, data: err});
  })
});

module.exports = router;
