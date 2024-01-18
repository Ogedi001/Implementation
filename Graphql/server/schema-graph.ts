// Schema for the graphql API
export const typeDefs = `#graphql

enum Role{
        ADMIN
        USER
        GUEST
        MODERATOR
    }

type Game { 
id: ID!
title: String!
platform:[String!]!
reviews:[Review!]
}

type Review {
    id:ID!
    rating:Int!
    content:String!
    author:Author!
    game:Game!
}

type Author{
    id:ID!
    name:String!
    role: Role!
    verified:Boolean!
    reviews:[Review!]
}
# entry point for our query
  type Query {
    reviews:[Review]
    review(id:ID!):Review
    games: [Game]
    game(id:ID!):Game
    authors:[Author]
    author(id:ID!):Author
  }
  schema{
    query:Query
  }
`;