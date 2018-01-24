
var express = require('express');
var router = express.Router();
/* var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}
//路由调用中间件
router.use(cb0); */
router.get('/',function(req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/app/:id',(req, res, next) => {
  if(req.params.id == 0){
    next('route');//跳过剩余中间件
  }else{
    next();
  }
},(req, res, nex) => {
  res.send(`普通用户,id:${req.params.id}`);
});
router.get('/app/:id',function(req, res, next) {
  res.send(`超级管理员`);
});

module.exports = router;
