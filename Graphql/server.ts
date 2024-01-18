// npx ts-node Graphql/server.ts
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from "@apollo/server/express4"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http';
import express from "express"
import cors from 'cors'
import { typeDefs, resolvers } from './server/index';

//sharing token as a context
interface MyContext {
  token?: string
}

const app = express()
const httpServer = createServer(app)






// Creating an Apollo Server instance
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
//const startServer = async () => {
server.start().then(() => {

  app.use(
    '/graphql',
    express.json(),
    // Use cors middleware with the specified type
    cors<cors.CorsRequest>(),
    //server is an instance of Apollo server earlier created
    expressMiddleware(server, {
      // context is an object that gets passed to all GraphQL resolvers. It's a way to share information, such as authentication details, between different parts of your GraphQL application.
      //extracting a token from request headers
      context: async ({ req }) => { return { token: req.headers.token } },
      //or without return keyword
      //context: async({req})=> ({ token:req.headers.token}),
    })
  )


  //start http Server
  httpServer.listen(3000, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`))
  //}
}
)
