import { objectType, stringArg } from "nexus";
import { Message } from "./message";
import { ObjectDefinitionBlock } from "nexus/dist/core";

export const User = objectType({
  name: "User",
  definition: t => {
    t.id("_id");
    t.string("username");
    t.string("email");
    t.string("role", { nullable: true });
    t.list.field("messages", { type: Message });
  }
});

export const useUserQuery = (t: ObjectDefinitionBlock<"Query">) => {
  t.field("user", {
    type: User,
    args: {
      id: stringArg({ nullable: false })
    },
    resolve: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    }
  });
  t.list.field("users", {
    type: User,
    resolve: async (parent, args, { models }) => {
      return await models.User.find({});
    }
  });
  t.field("me", {
    type: User,
    resolve: async (parent, args, { me, models }) => {
      if (!me) {
        return null;
      }

      return await models.User.findById(me.id);
    }
  });
};
