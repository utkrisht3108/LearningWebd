const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//get username
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
// console.log(username, room);
const socket = io();

///////////////////////join chatroom
socket.emit('joinRoom', { username, room });

////////////////////////////get room users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//////////////////////////////////////msg from server
socket.on('message', function (message) {
  // console.log(message); // ye hai jab message server se aaya
  outputMessage(message);
  //scroll
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

///////////////////////////////////////to server
chatForm.addEventListener('submit', function (e) {
  //kyuki jab ek form banate hai toh vo ek file bana deta hai
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  //   console.log(msg); ---> ye hai message chat se server gaya
  socket.emit('chatMsg', msg);

  //clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

/////////////////////////////////////to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.message}</p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
  ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `;
}
