import { Server } from "socket.io";
import { socketInstanceAuth } from "./socket_instance_Authmiddleware";
import { socketServerMiddleware } from "./socketIO_Authmiddleware";
import { v4 as uuidv4 } from "uuid";

export const initialSocket = (io: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    //middleware
    //socketServerMiddleware(io)
    io.on("connection", (socket) => {
      socketInstanceAuth(socket, 'message');

      socket.on("message", (data: any, ack: (str: string) => void) => {
        console.log(data);
        ack("received");
      });

      // Log the connection and assign a unique username to each client
      console.log(`Client connected with ID: ${socket.id}`);

      const username = `User_${Math.floor(Math.random() * 1000)}`;
      socket.emit("assignUsername", username);

      // Listen for chat messages from one client and send to the other
      socket.on("chatMessage", (message) => {
        io.emit("chatMessage", { username, message });
      });

      // Disconnect event
      socket.on("disconnect", () => {
        console.log(`Client disconnected with ID: ${socket.id}`);
      });

      // Resolve the promise once the connection setup is complete
      resolve();
    });
  });
};


  
// Calling code
