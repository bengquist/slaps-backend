import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AuthenticationError,
  UserInputError,
  ForbiddenError
} from "apollo-server-express";
import { skip, combineResolvers } from "graphql-resolvers";

const generatePasswordHash = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const validatePassword = async function(password: string) {
  //@ts-ignore
  return await bcrypt.compare(password, this.password);
};

const createToken = async (user: any, secret: string, expiresIn: string) => {
  const { _id, email, username, role } = user;
  return await jwt.sign({ id: _id, email, username, role }, secret, {
    expiresIn
  });
};

// --- Authorization Middleware ---

//@ts-ignore
export const isAuthenticated = (parent, args, { me }) => {
  return me ? skip : new ForbiddenError("Not authenticated as user.");
};

//@ts-ignore
export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findById(id);

  if (message.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }

  return skip;
};

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

const Query = {
  users: async (parent, args, { models }) => {
    console.log(models.User);
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
  //@ts-ignore
  signUp: async (parent, { username, email, password }, { models, secret }) => {
    const hashedPassword = await generatePasswordHash(password);

    const user = await models.User.create({
      username,
      email,
      password: hashedPassword
    });

    return { token: createToken(user, secret, "365d") };
  },
  //@ts-ignore
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
  deleteUser: combineResolvers(
    isAdmin,
    //@ts-ignore
    async (parent, { id }, { models }) => {
      return await models.User.deleteOne({ id });
    }
  )
};

const User = {
  messages: async (user, args, { models }) => {
    return await models.Message.find({ userId: user._id });
  }
};

export default { Query, User, Mutation };
