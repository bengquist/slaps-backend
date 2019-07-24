import { GraphQLDateTime } from "graphql-iso-date";
import user from "./user/resolvers";
import message from "./message/resolvers";
import merge from "lodash/merge";

const customScalarResolvers = {
  Date: GraphQLDateTime
};

const resolvers = merge(customScalarResolvers, user, message);

export default resolvers;
