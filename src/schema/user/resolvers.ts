import { QueryResolvers, UserResolvers } from "../../generated/types";

const Query: QueryResolvers.Resolvers = {
  users: (parent, args, { models }) => {
    console.log(models.user._id);
    return [];
  },
  user: (parent, { id }, { models }) => {
    return null;
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
