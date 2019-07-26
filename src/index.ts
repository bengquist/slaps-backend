import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import models from "./models";
import "./context/db";
import { getMe } from "./context/helpers";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
