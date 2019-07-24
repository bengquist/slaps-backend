import uuidv4 from "uuid/v4";
import {
  QueryResolvers,
  MutationResolvers,
  MessageResolvers
} from "../../types/types";

const Query: QueryResolvers.Resolvers = {
  messages: (parent, args, { models }) => {
    return Object.values(models.messages);
  },
  message: (parent, { id }, { models }) => {
    return models.messages[0];
  }
};

const Mutation: MutationResolvers.Resolvers = {
  createMessage: (parent, { text }, { me, models }) => {
    const id = uuidv4();
    const message = {
      id,
      text,
      user: me
    };

    models.messages[id] = message;
    models.users[me.id].messageIds.push(id);

    return message;
  },

  deleteMessage: (parent, { id }, { models }) => {
    const { [id]: message, ...otherMessages } = models.messages;

    if (!message) {
      return false;
    }

    models.messages = otherMessages;

    return true;
  }
};

const Message: MessageResolvers.Resolvers = {
  user: (message, args, { models }) => {
    return models.users[message.user.id];
  }
};

export default { Query, Mutation, Message };
