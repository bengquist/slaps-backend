import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type MessageSchema @entity {
    id: ID! @id
    text: String! @column
    userId: String! @column
  }
`;
export default typeDefs;
