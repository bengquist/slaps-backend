import "dotenv/config";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import models from "./models";
import "./context/db";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
