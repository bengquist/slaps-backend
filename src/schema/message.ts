import { objectType } from "nexus";
import { User } from "./user";
import { ObjectDefinitionBlock, stringArg, intArg } from "nexus/dist/core";
import { fromCursorHash, toCursorHash } from "./helpers/pagination";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isMessageOwner } from "./helpers/auth";
import { pubsub } from "./subscriptions";

export const CREATED = "CREATED";

export const Message = objectType({
  name: "Message",
  definition: t => {
    t.id("_id");
    t.string("text");
    t.field("user", { type: User });
  }
});

export const MessageConnection = objectType({
  name: "MessageConnection",
  definition: t => {
    t.list.field("edges", { type: Message });
    t.field("pageInfo", { type: PageInfo });
  }
});

export const PageInfo = objectType({
  name: "PageInfo",
  definition: t => {
    t.boolean("hasNextPage");
    t.string("endCursor");
  }
});

export const useMessageQuery = (t: ObjectDefinitionBlock<"Query">) => {
  t.field("message", {
    type: Message,
    args: {
      id: stringArg()
    },
    resolve: async (parent, { id }, { models }) => {
      return await models.Message.findOne({ id });
    }
  });
  t.field("messages", {
    type: MessageConnection,
    args: {
      cursor: stringArg(),
      limit: intArg()
    },
    resolve: async (parent, { cursor, limit = 100 }, { models }) => {
      const query = cursor
        ? { createdAt: { $lte: fromCursorHash(cursor) } }
        : {};

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
    }
  });
};

export const useMessageMutation = (t: ObjectDefinitionBlock<"Mutation">) => {
  t.field("createMessage", {
    type: Message,
    args: {
      text: stringArg()
    },
    resolve: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const message = await models.Message.create({
          text,
          userId: me.id
        });

        pubsub.publish(CREATED, {
          messageCreated: { message }
        });

        return message;
      }
    )
  });
  t.field("deleteMessage", {
    type: Message,
    args: {
      id: stringArg()
    },
    resolve: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.deleteOne({ id });
      }
    )
  });
};

export const useMessageSubscription = (
  t: ObjectDefinitionBlock<"Subscription">
) => {
  t.field("messageCreated", {
    type: Message,
    resolve: root => root
  });
};
