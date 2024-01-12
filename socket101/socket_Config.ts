import { Server, ServerOptions } from "socket.io"
import {Server as HttpServer} from "http";


//func takes Httpserver and return socket.io server instance
// export const configureSocketIO = (httpServer:HttpServer):Server=>{
// const io = new Server(httpServer,{}as ServerOptions)
// return io
// }

 export class ConfigureSocketIO {
    private io: Server
    constructor(httpServer:HttpServer, options = {} as ServerOptions){
this.io = new Server (httpServer,options)
    }
     // Public method to access io instance
  public getIoInstance(): Server {
    return this.io;
  }
}