var express = require('express')
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(app);



app.use(express.static('public'));


app.get('/', function(req, res) {
  // res.sendfile('index.html');
  // res.sendfile('styles.css');
  // res.foreach(function(chats){
  //   $('.chatlog').append(chats.content);
});


io.on('connection', function(socket){
         socket.broadcast.emit('hi');
        console.log('a user connected');
      socket.on('chat message', function(msg){
         io.emit('chat message', msg);
        console.log('message: ' + msg);
      });
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});
