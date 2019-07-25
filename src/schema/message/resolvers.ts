import uuidv4 from "uuid/v4";
import {
  QueryResolvers,
  MutationResolvers,
  MessageResolvers
} from "../../generated/types";

const Query: QueryResolvers.Resolvers = {
  messages: (parent, args, { models }) => {
    return [];
  },
  message: (parent, { id }, { models, me }) => {
    return { id: "yo", text: "ay", user: me, userId: "aa" };
  }
};

const Mutation: MutationResolvers.Resolvers = {
  createMessage: (parent, { text }, { me, models }) => {
    const id = uuidv4();
    const message = {
      id,
      text,
      user: me,
      userId: "wut"
    };

    return message;
  },

  deleteMessage: (parent, { id }, { models }) => {
    return true;
  }
};

const Message: MessageResolvers.Resolvers = {
  user: (message, args, { models }) => {
    return { id: "yo", username: "a" };
  }
};

export default { Query, Mutation, Message };
