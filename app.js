var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routers = require('./routes/index');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// express日志
app.use(logger('dev'));
//post解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie解析
app.use(cookieParser());
//静态托管
app.use(express.static(path.join(__dirname, 'public')));
//router
routers(app);
//端口监听
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log(`启动完成,监听端口:${port}`)
});
module.exports = app;
