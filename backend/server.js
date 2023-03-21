const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const childProcess = require("child_process");
// const path = require("path");

dotenv.config();

// // **********************By Suman******************************
// // console.log(path.resolve(__dirname,'../frontend'));
// childProcess.exec(
//   "npm run start",
//   {
//     cwd: path.resolve(__dirname, "../frontend"),
//   },
//   (e, o, er) => {
//     console.log(e);
//     console.log(o);
//   }
// );
// // ****************************************************

connectDb();

const app = express();

app.use(express.json()); //to accept the json data received from frontend

const port = process.env.PORT || 5000;

// **********For Development Purpose**********
// app.get("/", (req, res) => {
//   res.status(200).send("API is running");
// });
// *******************************************

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/notification", notificationRoutes);

//error handlers for wrong routes
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`.red.bold);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", //this is for client(need to change while hosting in production)
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  //This is for setting up a room for the user. Here from the client-side user data is sent and here(i.e in this server-side) a room is created for that client-user.
  socket.on("setup", (userData) => {
    socket.join(userData._id); //this will create a room for that particular user
    // console.log("Room Created: " + userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) {
        return; //This code handles to send the message to all the users connected to this room except the user who is sending the message.
      }

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
