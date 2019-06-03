const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require("./config");
const isEmail = require("isemail");

const { User, Beat } = require("./models");

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };

    // find a user by their email
    const user = await User.findOne({ email });

    return { user };
  },
  typeDefs,
  resolvers,
  engine: {
    apiKey: "service:bengquist-4896:iF_Xg8IIBllXOuUBUYRG5A"
  },
  dataSources: () => ({
    User,
    Beat
  })
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
