import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    role: String
    messages: [Message!]
  }

  type UserSchema @entity {
    id: ID! @id
    username: String! @column
    messageIds: [ID!] @column
  }
`;
export default typeDefs;
