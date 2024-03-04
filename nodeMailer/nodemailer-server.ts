import express, { Request,Response} from 'express'
import { createServer } from 'http'
import { signup } from './nodemailer'

const app = express()
const server = createServer(app)
app.use(express.json())

app.post('/user/signup',signup)

//page not found
app.use((req,res,next)=>{
    const message = 'Page not found'
    res.status(404).json({message})
})

server.listen(8080, ()=>{
    console.log('server running on port:8080')
})