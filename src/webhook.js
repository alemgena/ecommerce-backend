let clients = {}
let socketIo
let io = null
module.exports = {
  start: function (io) {
    io = io;
    global.onlineUsers = new Map();
    io.on("connection", function (socket) {
      socket.emit("connection", "Ws connected");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });
  },
};