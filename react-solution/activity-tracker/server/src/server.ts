
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

// Enable CORS for all routes
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Ensure event names match between client & server
  setInterval(() => {
    const activity = `User ${Math.floor(Math.random() * 100)} logged in at ${new Date().toLocaleTimeString()}`;
    io.emit("activityUpdate", activity);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});
