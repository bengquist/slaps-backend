import {
  QueryResolvers,
  MutationResolvers,
  MessageResolvers
} from "../../generated/types";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isMessageOwner } from "../user/resolvers";

const toCursorHash = (string: string) => Buffer.from(string).toString("base64");

const fromCursorHash = (string: string) =>
  Buffer.from(string, "base64").toString("ascii");

const Query: QueryResolvers.Resolvers = {
  messages: async (parent, { cursor, limit = 100 }, { models, me }) => {
    const query = cursor ? { createdAt: { $lte: fromCursorHash(cursor) } } : {};

    const messages = await models.Message.find(query, null, {
      //@ts-ignore
      limit: limit + 1,
      sort: { createdAt: -1 }
    });

    //@ts-ignore
    const hasNextPage = messages.length > limit;
    const edges = hasNextPage ? messages.slice(0, -1) : messages;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        endCursor: toCursorHash(
          messages[messages.length - 1].createdAt.toString()
        )
      }
    };
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
    return models.User.findById(message.userId);
  }
};

export default { Query, Mutation, Message };
