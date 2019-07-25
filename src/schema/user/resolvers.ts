import { QueryResolvers, UserResolvers } from "../../generated/types";

const Query: QueryResolvers.Resolvers = {
  users: async (parent, args, { models }) => {
    console.log(models.User);
    return await models.User.find({});
  },
  user: async (parent, { id }, { models }) => {
    return await models.User.findById({ id });
  },
  me: async (parent, args, { me, models }) => {
    if (!me) {
      return null;
    }

    return await models.User.findById({ id: me.id });
  }
};

const User: UserResolvers.Resolvers = {
  messages: async (user, args, { models }) => {
    return await models.Message.find({});
  }
};

export default { Query, User };
