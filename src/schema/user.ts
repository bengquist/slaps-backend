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
    t.string("firstName", { nullable: true });
    t.string("lastName", { nullable: true });
    t.string("location", { nullable: true });
    t.string("bio", { nullable: true });
    t.string("image", { nullable: true });
    t.string("role", { nullable: true });
    t.string("twitter", { nullable: true });
    t.string("facebook", { nullable: true });
    t.string("instagram", { nullable: true });
    t.string("soundcloud", { nullable: true });
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
      id: stringArg()
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
      if (!username || !email || !password) {
        throw new UserInputError("Must enter required fields");
      }

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
        throw new UserInputError("Invalid email or username");
      }

      const isValid = await validatePassword(attempt, user.password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password");
      }

      return { token: createToken(user, secret, "365d") };
    }
  });
  t.field("updateUser", {
    type: User,
    args: {
      firstName: stringArg({ nullable: true }),
      lastName: stringArg({ nullable: true }),
      location: stringArg({ nullable: true }),
      bio: stringArg({ nullable: true }),
      image: stringArg({ nullable: true })
    },
    resolve: async (
      parent,
      { firstName = "", lastName = "", location = "", bio = "", image = "" },
      { me, models }
    ) => {
      const user = await models.User.findByIdAndUpdate(
        me.id,
        {
          firstName,
          lastName,
          location,
          bio,
          image
        },
        { new: true }
      );

      return user;
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
