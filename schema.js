const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    username: String
    password: String
    email: String
    beats: [Beat]
  }

  type Beat {
    id: ID!
    title: String
    owner: User
    genre: String
    plays: Int
    ownerId: ID
  }

  type BeatConnection {
    cursor: String!
    hasMore: Boolean!
    beats: [Beat]!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    beats(pageSize: Int, after: String): BeatConnection
    beat(id: ID!): Beat
    me: User
  }

  type Mutation {
    addUser(email: String, username: String, password: String): User
    createBeat(title: String, userId: String, genre: String): Beat
    login(email: String): String
  }
`;

module.exports = typeDefs;
