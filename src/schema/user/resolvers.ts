import { QueryResolvers, UserResolvers } from "../../generated/types";

const Query: QueryResolvers.Resolvers = {
  users: (parent, args, { models }) => {
    return models.users[0];
  },
  user: (parent, { id }, { models }) => {
    return models.users[0];
  },
  me: (parent, args, { me }) => {
    return me;
  }
};

const User: UserResolvers.Resolvers = {
  messages: (user, args, { models }) => {
    return [];
  }
};

export default { Query, User };
