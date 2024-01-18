import db from "./dB";

// Resolver fetches data for each field in the schema
export const resolvers = {

    //run query entry point
  Query: {
    //resolver to return all array of a particular field
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    //resolver to get a particular field by id
    game(parent: any, arg: { id: string }, context: any) {
      const gameId = arg.id;
      return db.games.find((game) => game.id === gameId);
    },
    review(parent: any, arg: { id: string }, context: any) {
      return db.reviews.find((review) => review.id === arg.id);
    },
    author(parent: any, arg: { id: string }) {
      return db.authors.find((author) => author.id === arg.id);
    },
  },

  //apollo run  Game entry point
  Game: {
    //parent id is the game id
    reviews(parent: { id: string }) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },

Author:{
    
}
};
