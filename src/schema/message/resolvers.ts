import { combineResolvers } from "graphql-resolvers";
import pubsub, { EVENTS } from "../subscriptions";
import { isAuthenticated, isMessageOwner } from "../user/helpers";
import { fromCursorHash, toCursorHash } from "./helpers";

const Query = {
  messages: async (parent, { cursor, limit = 100 }, { models, me }) => {
    const query = cursor ? { createdAt: { $lte: fromCursorHash(cursor) } } : {};

    const messages = await models.Message.find(query, null, {
      limit: limit + 1,
      sort: { createdAt: -1 }
    });

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

const Mutation = {
  createMessage: combineResolvers(
    isAuthenticated,
    //@ts-ignore
    async (parent, { text }, { models, me }) => {
      const message = await models.Message.create({
        text,
        userId: me.id
      });

      pubsub.publish(EVENTS.MESSAGE.CREATED, {
        messageCreated: { message }
      });

      return message;
    }
  ),

  deleteMessage: combineResolvers(
    isAuthenticated,
    isMessageOwner,
    //@ts-ignore
    async (parent, { id }, { models }) => {
      return await models.Message.deleteOne({ id });
    }
  )
};

const Message = {
  user: (message, args, { models }) => {
    return models.User.findById(message.userId);
  }
};

const Subscription = {
  messageCreated: {
    subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED)
  }
};

export default { Query, Mutation, Subscription, Message };
