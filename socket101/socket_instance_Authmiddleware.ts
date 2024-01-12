import { Socket} from "socket.io";

export const socketInstanceAuth = (socket:Socket, socketEvent:string)=>{

const authenticated = false;
  
    //Auth Middleware for 'socket instance ' event
    const socketAuthMiddleware = async(
      [event, message]: [string, any],
      next: (err?: Error | undefined) => void
    ) => {
      if (authenticated) {
        console.log("success");
        next();
      } else {
        //throw new Error("You are not authenticated");
        return next(new Error("event authorization failed"));
      }
    };
  
    socket.use(async(event, next) => {
      const packetArray: [string, any] = event as any;
      if ((packetArray[0] === socketEvent)) {
        const message = packetArray[1];
        console.log(message);
        // Call socketAuthMiddleware, which calls next() internally
        await socketAuthMiddleware(packetArray, (err?: Error | undefined) => {
          // This callback is executed when socketAuthMiddleware completes
          if (err) {
            console.error(` ${err}
            Event Name: ${packetArray[0]} `); // Log the error if authentication fails
          }
          next(); // Continue to the next middleware
        });
      } else {
        next();
      }
    });
}