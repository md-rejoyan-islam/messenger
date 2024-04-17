import { Server } from "socket.io";

import { createServer } from "http";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.SOCKET_PORT || 9001;

const httpServer = createServer();

// port

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// active user
let activeUsers = [];

// socket connection
io.on("connection", (socket) => {
  console.log("a user connected");

  // typing
  socket.on("typingForMsg", (data) => {
    // check user is active or not
    const isActiveUser = activeUsers.find(
      (dt) => dt.userId === data.receiverId
    );

    isActiveUser &&
      socket.to(isActiveUser.socketId).emit("getTypingForMsgData", data);
  });

  // join
  socket.on("join", (id) => {
    activeUsers.some((user) => user.id === id)
      ? null
      : activeUsers.push({ userId: id, socketId: socket.id });

    // pass to client
    io.emit("activeUsers", activeUsers);
  });

  // get real time data
  socket.on("lastMessageFromUser", (data) => {
    // check user is active or not
    const isActiveUser = activeUsers.find(
      (dt) => dt.userId === data.receiverId
    );
    isActiveUser &&
      socket.to(isActiveUser.socketId).emit("getLastMessageFromUser", data);
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

// listen
httpServer.listen(port, () => {
  console.log(`Socket is connected in port : ${port}`);
});
