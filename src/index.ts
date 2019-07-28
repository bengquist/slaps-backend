import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { Query } from "./schema/query";
import { makeSchema } from "nexus/dist";

import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import models from "./models";
import "./context/db";
import { getMe } from "./context/helpers";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts"
  }
});

const server = new ApolloServer({
  schema,
  //@ts-ignore
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET
      };
    }
  }
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`Apollo Server on http://localhost:${PORT}/graphql`);
});
