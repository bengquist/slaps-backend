import models from "../models";
import users from "../data/users";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbUrl = process.env.DB_URL + process.env.DB_NAME;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  dbName: process.env.DB_NAME
});
mongoose.connection.once("open", () =>
  console.info(`Mongo is connected to ${process.env.DB_NAME}`)
);

if (process.env.DB_NAME === "test") {
  mongoose.connection.collections.users.drop(async () => {
    console.info("db cleared");

    await Promise.all(
      users.map(async ({ messages, ...user }) => {
        return models.User.create(user);
      })
    );

    console.info("users created");
  });

  mongoose.connection.collections.messages.drop(async () => {
    console.info("db cleared");

    await Promise.all(
      //@ts-ignore
      users.map(async ({ messages, id }) => {
        return await Promise.all(
          messages.map(message => {
            return models.Message.create({ ...message, userId: id });
          })
        );
      })
    );

    console.info("messages created");
  });
}
