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


# Game input
input AddGameInput{
    title: String!
platform:[String!]!  
}

input EditGameInput{
    title: String
platform:[String!] 
}

#Author Input
input AddAuthorInput{
    name:String!
    role: Role!
    verified:Boolean!
}
input AddAuthorInput{
    name:String!
    role: Role!
    verified:Boolean!
}

input EditAuthorInput{
    name:String
    role: Role
    verified:Boolean
}


type Mutation {
    deleteGame(id:ID!):[Game]
    addGame(input:AddGameInput!):Game
    updateGame( id:ID!, edits:EditGameInput):Game

    deleteAuthor(id:ID!):[Author]
    addAuthor(input:AddAuthorInput):Author
    updateAuthor(id:ID!,edits:EditAuthorInput):Author
}



  schema{
    query:Query
    mutation:Mutation
  }
`;