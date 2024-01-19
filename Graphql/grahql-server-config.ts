// npx ts-node Graphql/server.ts
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Server as HttpServer } from "http";
import express, { Express } from "express";
import cors from "cors";
import { IResolvers } from '@graphql-tools/utils';


import { typeDefs, resolvers } from './server/index';
//sharing token as a context
interface MyContext {
  token?: string;
}

//using function
export const createGrapqlServer = async (
  httpServer: HttpServer,
  app: Express
) => {
  // Creating an Apollo Server instance
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  //const startServer = async () => {
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    // Use cors middleware with the specified type
    cors<cors.CorsRequest>(),
    //server is an instance of Apollo server earlier created
    expressMiddleware(server, {
      // context is an object that gets passed to all GraphQL resolvers. It's a way to share information, such as authentication details, between different parts of your GraphQL application.
      //extracting a token from request headers
      context: async ({ req }) => {
        return { token: req.headers.token };
      },
      //or without return keyword
      //context: async({req})=> ({ token:req.headers.token}),
    })
  );
};


//using class
export class GraphQLServer {
  private server: ApolloServer<MyContext>;

  constructor(
    httpServer: HttpServer,
    typeDefs: string,
   resolvers:IResolvers
    ){
    this.server = new ApolloServer<MyContext>({
      typeDefs, // assuming typeDefs and resolvers are defined somewhere
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
  }
    async startServer(){
   await this.server.start()
  }

  applyMiddle (app:Express, url:string){
    app.use(
      url,
      express.json(),
      // Use cors middleware with the specified type
      cors<cors.CorsRequest>(),
      //server is an instance of Apollo server earlier created
      expressMiddleware(this.server, {
        // context is an object that gets passed to all GraphQL resolvers. It's a way to share information, such as authentication details, between different parts of your GraphQL application.
        //extracting a token from request headers
        context: async ({ req }) => {
          return { token: req.headers.token };
        },
        //or without return keyword
        //context: async({req})=> ({ token:req.headers.token}),
      })
    )
  }
}
