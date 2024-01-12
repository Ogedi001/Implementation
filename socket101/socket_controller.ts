
import express,{Response,Request, NextFunction} from 'express';
import http from 'http'
import { ConfigureSocketIO } from './socket_Config';  // Adjust the path
const server = http.createServer(express())

import { join } from "path";
import { initialSocket } from "./socket_init";
import { socketIO } from './socketApp';




// Assuming this endpoint is reached when you want to send a message
export  const socketInitController=  (req:Request, res:Response) => {
    initialSocket(socketIO.getIoInstance())
    
    res.sendFile(join(__dirname, "socket.html"));
} ;


