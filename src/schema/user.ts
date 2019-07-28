import { objectType, stringArg } from "nexus";
import { Message } from "./message";
import { ObjectDefinitionBlock } from "nexus/dist/core";
import {
  generatePasswordHash,
  createToken,
  validatePassword,
  isAdmin
} from "./helpers/auth";
import { UserInputError, AuthenticationError } from "apollo-server-core";
import { combineResolvers } from "graphql-resolvers";

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

export const Token = objectType({
  name: "Token",
  definition: t => {
    t.string("token");
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

export const useUserMutation = (t: ObjectDefinitionBlock<"Mutation">) => {
  t.field("signUp", {
    type: Token,
    args: {
      username: stringArg(),
      email: stringArg(),
      password: stringArg()
    },
    resolve: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      const hashedPassword = await generatePasswordHash(password);

      const user = await models.User.create({
        username,
        email,
        password: hashedPassword
      });

      return { token: createToken(user, secret, "365d") };
    }
  });
  t.field("signIn", {
    type: Token,
    args: {
      login: stringArg(),
      password: stringArg()
    },
    resolve: async (
      parent,
      { login, password: attempt },
      { models, secret }
    ) => {
      const user = await models.User.findOne({
        username: login
      });

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }

      const isValid = await validatePassword(attempt, user.password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, "365d") };
    }
  });
  t.field("deleteUser", {
    type: User,
    args: {
      id: stringArg()
    },
    //@ts-ignore
    resolve: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
      return await models.User.deleteOne({ id });
    })
  });
};
