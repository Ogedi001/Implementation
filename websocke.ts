import WebSocket,{WebSocketServer} from 'ws'
import { createServer } from 'http'
import express, { Response, Request, NextFunction} from 'express'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid';

const app = express()

const server = createServer(app)

app.get('/', (req:Request, res:Response)=>{
    res.sendFile(join(__dirname,"ws.html"))
})

const wss = new WebSocketServer({server:server})

// wss.on('headers', (headers, req) => {
//     console.log('WebSocket headers received:', headers);
//   });

  wss.on('connection',(ws,req)=>{
    const newCLietId = uuidv4().split('-')[0]

    ws.send(`user ${newCLietId} connected`)

    ws.on('message',(data)=>{
        console.log(data.toString())
    })
  })
server.listen(4000,()=>console.log('websocket server running on port:4000'))