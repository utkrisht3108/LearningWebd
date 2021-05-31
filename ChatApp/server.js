const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, 'public')));

const botName = 'HelloNoob';

//socket setup
io.on('connection', function (socket) {
  //   console.log('socket ban gaya');

  /////////////////join room
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    //emit to single client======welcome
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));
    //broadcast to all clients except that socket(when user connects)
    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage(botName, `${user.username} has joined the chat`));

    //broadcast to all-----io.broadcast.emit('')

    //users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //////////////////////listen
  socket.on('chatMsg', (msg) => {
    //     console.log(msg);
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(`${user.username}`, msg));
  });

  //////////////////////////////////////////////
  socket.on('disconnect', function () {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );
      //users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

//port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server started on ${PORT}`));
