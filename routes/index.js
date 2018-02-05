module.exports = (app) => {
  app.use('/home',require('./home'));
  app.use('/pet', require('./pet'));
  app.use('/user', require('./user'));
  app.use('/admin', require('./admin'));
  app.use('/upload', require('./upload'));
  //404
  app.use((req, res, next) => {
    res.json({
      status: 404,
      msg:'接口不存在'
    });
  });
  //500
  app.use((err, req, res, next)=> {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('err',err);
    res.json({
      status: 500,
      msg:'500错误',
      data:err
    });
  });
}
// 参数:req.params
//cookies req.cookies