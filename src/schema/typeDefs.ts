import user from "./user/typeDefs";
import message from "./message/typeDefs";
import gql from "graphql-tag";

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

const typeDefs = [linkSchema, user, message];

export default typeDefs;
