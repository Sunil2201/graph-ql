import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db.js";

// types
import { typeDefs } from "./schema.js";

const resolvers = {
  Query: {
    games() {
      return db?.games;
    },
    game(_, args) {
      return db?.games.find(({ id }) => id === args?.id);
    },
    reviews() {
      return db?.reviews;
    },
    review(_, args) {
      return db?.reviews.find(({ id }) => id === args?.id);
    },
    authors() {
      return db?.authors;
    },
    author(_, args) {
      return db?.authors.find(({ id }) => id === args?.id);
    },
  },

  Game: {
    reviews(parent) {
      return db?.reviews.filter(({ game_id }) => game_id === parent?.id);
    },
  },

  Author: {
    reviews(parent) {
      return db?.reviews.filter(({ author_id }) => author_id === parent?.id);
    },
  },

  Review: {
    author(parent) {
      return db?.authors.find(({ id }) => id === parent?.author_id);
    },
    game(parent) {
      return db?.games.find(({ id }) => id === parent?.game_id);
    },
  },
};

const server = new ApolloServer({
  // typeDefs -- definition of types of data(author, game)
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: 4000,
});

console.log("Server ready at port", 4000);
