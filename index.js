import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema";

const server = new ApolloServer({
    // typeDefs -- definition of types of data(author, game)
    typeDefs,
    // resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: 4000,
});

console.log("Server ready at port", 4000);
