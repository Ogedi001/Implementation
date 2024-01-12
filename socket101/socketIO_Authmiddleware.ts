import { Server, Socket } from "socket.io"
import { socketIO } from "./socketApp"
import { ExtendedError } from "socket.io/dist/namespace"



export const middleware = (socket:Socket, next:(err?: ExtendedError|undefined)=>void)=>{
    const clientToken = socket.handshake.auth.token;
    console.log(clientToken)
    const user = 0
    if(clientToken !== user){
        next(new Error('not authorized'))
    }else{
        next()
    }
}

export const socketServerMiddleware =(io:Server)=>{
    
    io.use((socket, next)=>{
        //implemented as we dont want error to stop us from calling next()
middleware(socket,(err?: ExtendedError|undefined)=>{
if (err){
    console.log(err)
}else{
    next()
}
})
    })
}
