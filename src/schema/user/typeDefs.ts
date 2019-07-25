import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
    messages: [Message!]
    messageIds: [ID!] @column
  }

  type UserSchema @entity {
    id: ID! @id
    username: String! @column
    messageIds: [ID!] @column
  }
`;
export default typeDefs;