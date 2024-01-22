import db from "./dB";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
  MODERATOR = "MODERATOR",
}

interface AddGameInput {
  title: string;
  platform: string[];
}

interface EditGameInput {
  title?: string;
  platform?: string[];
}

interface AddAuthorInput {
  name: string;
  role: Role;
  verified: boolean;
}

interface EditAuthorInput {
  name: String;
  role: Role;
  verified: Boolean;
}
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
      console.log("Game", Game);
      if (!Game || !Game.id) {
        return null; // or an empty array depending on your use case
      }
      return db.reviews.filter((r) => r.game_id === Game.id);
    },
  },

  Author: {
    reviews(Author: { id: string }) {
      console.log("Author", Author);
      if (!Author || !Author.id) {
        return null; // or an empty array depending on your use case
      }
      return db.reviews.filter((r) => r.author_id === Author.id);
    },
  },
  Review: {
    author(Review: { id: string }) {
      console.log("Review", Review);
      if (!Review || !Review.id) {
        return null; // or an empty array depending on your use case
      }
      return db.authors.find((a) => a.id === Review.id);
    },
    game(Review: { id: string }) {
      if (!Review || !Review.id) {
        return null; // or an empty array depending on your use case
      }
      return db.games.find((g) => g.id === Review.id);
    },
  },

  Mutation: {
    deleteGame(_root: any, arg: { id: string }) {
      const gamesArry = db.games.filter((game) => game.id !== arg.id);
      return gamesArry;
    },

    addGame(_root: any, args: { input: AddGameInput }) {
      const id = Math.floor(Math.random() * 1000).toString();
      const newGame = {
        id,
        ...args.input,
      };
      db.games.push(newGame);
      return newGame;
    },

    updateGame(
      _root: any,
      { edits, id }: { edits: EditGameInput; id: string }
    ) {
      // Use map to create a new array with the updated game
      const update = db.games.map((g) => {
        if (g.id === id) {
          return { ...g, ...edits };
        }
        return g;
      });
      // Find and return the updated game
      return update.find((g) => g.id === id);
    },

    deleteAuthor(_root: any, { id }: { id: string }) {
      const authorArry = db.authors.filter((a) => a.id !== id);
      return authorArry;
    },

    addAuthor(_root: any, { input }: { input: AddAuthorInput }) {
      const id = Math.floor(Math.random() * 1000).toString();
      const newAuthor = {
        id,
        ...input,
      };
      db.authors.push(newAuthor);
      return newAuthor;
    },

    updateAuthor(
      _root: any,
      { id, edits }: { id: string; edits: EditAuthorInput }
    ) {
      const update = db.authors.map((a) => {
        if (a.id === id) {
          return {
            ...a,
            ...edits,
          };
        }
        return a;
      });
      return update.find(a=>a.id === id)
    },
  },
};
