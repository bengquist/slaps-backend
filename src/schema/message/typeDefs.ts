import gql from "graphql-tag";

const typeDefs = gql`
  extend type Query {
    messages(cursor: String, limit: Int): MessageConnection!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type MessageConnection {
    edges: [Message!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String!
  }

  type Message {
    _id: ID!
    text: String!
    createdAt: Date!
    user: User!
  }

  type MessageSchema @entity {
    id: ID! @id
    text: String! @column
    userId: String! @column
  }
`;
export default typeDefs;
