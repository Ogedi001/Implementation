import express from "express";
import { createServer } from "http";
import { ConfigureSocketIO } from "./socket_Config";
import { applicationRoute } from "./indexRoute";


const app = express();

//create  HTTP server instance that handles request using express application ('app')
// when HTTP server receives an incoming request, it delegates the handling of that request to your Express application.
//you can attach event listeners or perform other server-related configurations directly on this instance  if needed.
const server = createServer(app);


//const io = new Server(server);
 export const socketIO= new ConfigureSocketIO(server)

app.use("/api/v1", applicationRoute);

// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(join(__dirname, "socket.html"));
// });

// type AcknowledgmentResponse =
//   | { error: Error; message: null }
//   | { error: null; message: 'success' };

// function emitAndEmitRetry(
//   socket: Socket,
//   event: string,
//   arg: any,
//   retryCount: number = 0
// ) {
//   socket.timeout(2000).emit(event, arg, (response: AcknowledgmentResponse) => {
//     if (response.error) {
//       // Check for a reasonable number of retries and retry if condition is true
//       if (retryCount < 4) emitAndEmitRetry(socket, event, arg, retryCount + 1);
//     } else {

//       console.log("Acknowledgment received:", response.message);
//     }
//   });
// }

const eventDatabase: Array<string | any> = [];

// io.on("connection",  (socket) => {
//   console.log("connected");
//   console.log('socket Id ', socket.id)
// console.log(socket.recovered)
//   const clientId = uuidv4();
//   console.log('clientID: ', clientId)
//   socket.emit('client-id', clientId);

//    socket.emit('initial-events', eventDatabase);

//   console.log('offsetID-1 :', socket.handshake.auth.offset)

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//    });

// socket.on('client-event1', (data) => {
//     const eventId1 = uuidv4();
//     eventDatabase.push({ id: eventId1, data });
//     io.emit('server-event1', { id: eventId1, data });
//   });

//   console.log('offsetID-2 :', socket.handshake.auth.offset)

//   socket.on('client-event', (data)=>{
//     const eventId2 = uuidv4();
//     eventDatabase.push({Id:eventId2,data})
//     io.emit('server-event2', { id: eventId2, data });
//   })
//  console.log('offsetID-3 :', socket.handshake.auth.offset)

//  const count = io.engine.clientsCount;
// console.log(io)
//  console.log('total connected client ', count)

//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });

// emitAndEmitRetry(socket, "chat message", "I love you baby");
//});


//delivery quarantee standard

//   // Initial call to emit the "foo" event with the argument "bar"
//   emit(socket, "foo", "bar");

server.listen(5000, () => console.log("server runing: localhost:5000"));
