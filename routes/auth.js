
var express = require('express');
var router = express.Router();
var models = require('../model');
var md5 = require('../utils/md5');
const nonExistent = {code: -100, msg: 'token过期'};
var authUser = function (req, res, next) {
  if(req.body.token){
    models.Admin
    .forge({token: req.body.token})
    .fetch()
    .then((res) => {
      if(res){
        if(res.get('token_time') < new Date()){//过期
          res.json(nonExistent);
        }else{
          next();
        }
      }else{
        res.json(nonExistent);
      }
    })
    .catch((err) =>{
      res.json(nonExistent);
    });
  }else{
    res.json(nonExistent);
  }
}
//路由调用中间件
router.use(authUser);
router.post('/find',function(req, res, next) {
  models.Admin
  .forge({token: req.body.token})
  .fetch()
  .then((admin) => {
    res.json({code: 200, data: admin, msg: '查询成功'});
  })
  .catch((err) => {
    res.json({code: -100, data: err});
  })
});

module.exports = router;
