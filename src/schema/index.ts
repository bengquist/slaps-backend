import { DIRECTIVES } from "@graphql-codegen/typescript-mongodb";
import { makeExecutableSchema } from "apollo-server-express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs: [DIRECTIVES, ...typeDefs],
  resolvers
});

export default schema;
