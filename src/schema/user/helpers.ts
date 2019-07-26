import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "apollo-server-express";
import { skip, combineResolvers } from "graphql-resolvers";

export const generatePasswordHash = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const validatePassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

export const createToken = async (
  user: any,
  secret: string,
  expiresIn: string
) => {
  const { _id, email, username, role } = user;
  return await jwt.sign({ id: _id, email, username, role }, secret, {
    expiresIn
  });
};

// --- Authorization Middleware ---

export const isAuthenticated = (parent, args, { me }) => {
  return me ? skip : new ForbiddenError("Not authenticated as user.");
};

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
