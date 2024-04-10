import { Server } from "socket.io";

// port

const io = new Server(9000, {
  cors: {
    origin: "*",
  },
});

// active user
let activeUsers = [];
// socket connection
io.on("connection", (socket) => {
  console.log("a user connected");

  // join
  socket.on("join", (id) => {
    activeUsers.some((user) => user.id === id)
      ? null
      : activeUsers.push({ userId: id, socketId: socket.id });
    // pass to client
    io.emit("activeUsers", activeUsers);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    // pass to client
    io.emit("activeUsers", activeUsers);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
