import { AuthenticationError, UserInputError } from "apollo-server-express";
import { combineResolvers } from "graphql-resolvers";
import {
  generatePasswordHash,
  createToken,
  validatePassword,
  isAdmin
} from "./helpers";

const Query = {
  users: async (parent, args, { models }) => {
    return await models.User.find({});
  },
  user: async (parent, { id }, { models }) => {
    return await models.User.findById(id);
  },
  me: async (parent, args, { me, models }) => {
    if (!me) {
      return null;
    }

    return await models.User.findById(me.id);
  }
};

const Mutation = {
  signUp: async (parent, { username, email, password }, { models, secret }) => {
    const hashedPassword = await generatePasswordHash(password);

    const user = await models.User.create({
      username,
      email,
      password: hashedPassword
    });

    return { token: createToken(user, secret, "365d") };
  },
  signIn: async (parent, { login, password }, { models, secret }) => {
    const user = await models.User.find({ username: login });

    if (!user) {
      throw new UserInputError("No user found with this login credentials.");
    }

    const isValid = await validatePassword(password);

    if (!isValid) {
      throw new AuthenticationError("Invalid password.");
    }

    return { token: createToken(user, secret, "30m") };
  },
  //@ts-ignore
  deleteUser: combineResolvers(isAdmin, async (parent, { id }, { models }) => {
    return await models.User.deleteOne({ id });
  })
};

const User = {
  messages: async (user, args, { models }) => {
    return await models.Message.find({ userId: user._id });
  }
};

export default { Query, User, Mutation };
