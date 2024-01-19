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
    game(_root: any, arg: { id: string }, _context: any) {
      const gameId = arg.id;
      return db.games.find((game) => game.id === gameId);
    },
    review(_root: any, arg: { id: string }, _context: any) {
      return db.reviews.find((review) => review.id === arg.id);
    },
    author(_root: any, arg: { id: string }) {
      return db.authors.find((author) => author.id === arg.id);
    },
  },

  //apollo run  Game entry point
  Game: {
    //parent id is the game id
    reviews(Game: { id: string }) {
        console.log('Game', Game)
        if (!Game || !Game.id) {
            return null; // or an empty array depending on your use case
        }
      return db.reviews.filter((r) => r.game_id === Game.id);
    },
  },

Author:{
    reviews(Author:{id:string}){
        console.log('Author', Author)
        if (!Author || !Author.id) {
            return null; // or an empty array depending on your use case
        }
        return db.reviews.filter(r=>r.author_id===Author.id)
    }
},
Review:{
author(Review:{id:string}){
    console.log("Review", Review)
    if (!Review || !Review.id) {
        return null; // or an empty array depending on your use case
    }
    return db.authors.find(a=>a.id===Review.id)
},
game(Review:{id:string}){
    if (!Review || !Review.id) {
        return null; // or an empty array depending on your use case
    }
return db.games.find(g=>g.id===Review.id)
}
}
};
