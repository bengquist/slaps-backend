const { paginateResults } = require("./utils");

module.exports = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return await dataSources.User.find({}).exec();
    },
    user: async (_, { id }, { dataSources }) => {
      return await dataSources.User.findOne({ _id: id }).exec();
    },
    me: async (_, { id }, { dataSources }) => {
      const user = await dataSources.User.findOne({ _id: id }).exec();

      if (user) return user;
    },
    beats: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allBeats = await dataSources.Beat.find({}).exec();

      allBeats.reverse();
      const beats = paginateResults({
        after,
        pageSize,
        results: allBeats
      });

      return {
        beats,
        cursor: beats.length ? beats[beats.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: beats.length
          ? beats[beats.length - 1].cursor !==
            allBeats[allBeats.length - 1].cursor
          : false
      };
    },
    beat: async (_, { id }, { dataSources }) => {
      return await dataSources.Beat.findOne({ _id: id }).exec();
    }
  },
  Mutation: {
    addUser: async (_, args, { dataSources }) => {
      try {
        let response = await dataSources.User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
    createBeat: async (_, { userId, ...args }, { dataSources }) => {
      const owner = await dataSources.User.findOne({ _id: userId });

      try {
        let response = await dataSources.Beat.create({ ...args, owner });
        return response;
      } catch (e) {
        return e.message;
      }
    },
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.User.findOne({ email });

      if (user) return Buffer.from(email).toString("base64");
    }
  },
  User: {
    beats: async (user, _, { dataSources }) => {
      const userBeats = await dataSources.Beat.find({
        ownerId: user._id
      });

      if (!userBeats.length) return [];

      return userBeats;
    }
  }
};
