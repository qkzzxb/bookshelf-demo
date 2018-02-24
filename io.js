var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8676);

io.on('connection', function (socket) {
  socket.emit('link', [{ role: 'system' ,title: '服务器连接成功!'}]);
  socket.on('chat', function (data) {
    socket.emit('link', [{role: 'system' ,title: '接受成功!' }, data]);
  });
});