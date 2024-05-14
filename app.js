  const express = require("express");
  const app = express();
  const cors = require("cors");
  const dotenv = require("dotenv");
  const http = require("http");
  const socketIo = require("socket.io");

  // const server = http.createServer(app);
  dotenv.config();

  const { NotFoundError } = require("./utils/apiError.js");
  const globlaError = require("./middlewares/errorHandler.js");
  const connectDB = require("./config/database.js");

  // import Routes
  const appRoutes = require("./routes/index");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: "*" }));

  app.use("/api", appRoutes);

  app.use("*", (req, res, next) => {
    throw new NotFoundError("cann't find this endpoint");
  });

  app.use(globlaError);

  const port = process.env.PORT || 8000;

  // Connect Yo Database
  connectDB();

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  const io = socketIo(server, { cors: { origin: "*" } });

  let users = [];
  // Handle new connections
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("connected", (userId) => {
      console.log("userId", userId);
      users.push({ userId, socketId: socket.id });
      console.log("users", users);
    });

    socket.on("notification", ({ userId, message }) => {
      const index = users.findIndex((user) => user.userId == userId);
      io.to(users[index]?.socketId).emit("notification", message);
    });

    // Handle disconnections
    socket.on("disconnect", () => {
      const findIndex = users.findIndex((user) => user.socketId === socket.id);
      users.splice(findIndex, 1);
      console.log("Client disconnected");
    });
  });

  module.exports = app;
