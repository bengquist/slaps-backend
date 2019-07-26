import "dotenv/config";
import cors from "cors";
import express from "express";
import http from "http";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";

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

const getMe = async (req: any) => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET || "");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};
