import {
  QueryResolvers,
  MutationResolvers,
  MessageResolvers
} from "../../generated/types";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isMessageOwner } from "../user/resolvers";

const Query: QueryResolvers.Resolvers = {
  messages: (parent, args, { models }) => {
    return models.Message.find({});
  },
  message: (parent, { id }, { models }) => {
    return models.Message.findOne({ id });
  }
};

const Mutation: MutationResolvers.Resolvers = {
  //@ts-ignore
  createMessage: combineResolvers(
    isAuthenticated,
    //@ts-ignore
    async (parent, { text }, { models, me }) => {
      return await models.Message.create({
        text,
        userId: me.id
      });
    }
  ),

  deleteMessage: combineResolvers(
    isAuthenticated,
    //@ts-ignore
    isMessageOwner,
    //@ts-ignore
    async (parent, { id }, { models }) => {
      return await models.Message.deleteOne({ id });
    }
  )
};

const Message: MessageResolvers.Resolvers = {
  user: (message, args, { models }) => {
    //@ts-ignore
    return models.User.find({ id: message.userId });
  }
};

export default { Query, Mutation, Message };
