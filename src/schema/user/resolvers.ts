const Query = {
  users: (parent, args, { models }) => {
    return Object.values(models.users);
  },
  user: (parent, { id }, { models }) => {
    return models.users[id];
  },
  me: (parent, args, { me }) => {
    return me;
  }
};

const User = {
  messages: (user, args, { models }) => {
    return Object.values(models.messages).filter(
      (message: { userId: string }) => message.userId === user.id
    );
  }
};

export default { Query, User };
