import {
  QueryResolvers,
  MutationResolvers,
  MessageResolvers
} from "../../generated/types";

const Query: QueryResolvers.Resolvers = {
  messages: (parent, args, { models }) => {
    return models.Message.find({});
  },
  message: (parent, { id }, { models }) => {
    return models.Message.findOne({ id });
  }
};

const Mutation: MutationResolvers.Resolvers = {
  createMessage: async (parent, { text }, { me, models }) => {
    return await models.Message.create({ text, userId: me.id });
  },

  deleteMessage: async (parent, { id }, { models }) => {
    return await models.Message.deleteOne({ id });
  }
};

const Message: MessageResolvers.Resolvers = {
  user: (message, args, { models }) => {
    return models.User.find({ id: message.userId });
  }
};

export default { Query, Mutation, Message };
