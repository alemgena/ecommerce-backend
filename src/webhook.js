let clients = {}
let socketIo
const{chat}=require('../src/services')
let io = null
module.exports = {
  start: function (io) {
    io = io;
    io.on("connection", function (socket) {
      socket.emit("connection", "Ws connected");
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", async(data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  //chatImage
  socket.on("chatImage",async(data) => {
    socket.to(data.room).emit("chatImage", data);
  });
  socket.on("disconnect", () => {
    socket.emit("disconnect", "Ws disconnect");
  });
    });
  },
};