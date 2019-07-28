import "dotenv/config";
import "./context/db";
import cors from "cors";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { Query } from "./schema/query";
import { Mutation } from "./schema/mutation";
import { Subscription } from "./schema/subscriptions";
import { makeSchema } from "nexus/dist";
import models from "./models";
import { getMe } from "./context/helpers";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { ExecutionParams } from "subscriptions-transport-ws";

type ContextParams = ExpressContext & { connection: ExecutionParams };

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const schema = makeSchema({
  types: [Query, Mutation, Subscription],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/typings.ts"
  }
});

const server = new ApolloServer({
  schema,
  context: async ({ req, connection }: ContextParams) => {
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
