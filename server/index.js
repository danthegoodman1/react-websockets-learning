var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

io.on('connection', function(socket) {
    console.log('A user connected');
   // io.sockets.emit('broadcast', {desc: clientNum + " clients connected currently!"}); this function would even send to the sender, to avoid that use:
//   socket.emit('allButSender', {desc: "Whale Cum!... get it?"});
    socket.emit('testEvent', "Diud it work?");
    console.log("sending test event");
    setInterval(function(){
        socket.emit('testEvent', "Did it work?");
        console.log("sending EVENTTTTT") 
    }, 3000);
    
    
    
    
   
   socket.on('testResponse', function(data){
      console.log(`The client return the message: "${data.desc}"!`);
   });

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
      socket.broadcast.emit('allButSender', {desc: "A user has left!"});
   });
});

http.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = http.address();
  console.log("Listening at", addr.address + ":" + addr.port);
});
