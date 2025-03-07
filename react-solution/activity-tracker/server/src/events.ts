import { Socket } from "socket.io";

export const handleSocketEvents = (socket: Socket) => {
  // Send mock real-time activities
  setInterval(() => {
    const activity = `User ${Math.floor(Math.random() * 100)} logged in at ${new Date().toLocaleTimeString()}`;
    socket.emit("activity", activity);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};
