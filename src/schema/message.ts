import { objectType } from "nexus";
import { User } from "./user";
import { ObjectDefinitionBlock, stringArg, intArg } from "nexus/dist/core";

export const toCursorHash = (string: string) =>
  Buffer.from(string).toString("base64");

export const fromCursorHash = (string: string) =>
  Buffer.from(string, "base64").toString("ascii");

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
