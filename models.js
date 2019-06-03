const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  username: String,
  firstName: String,
  lastName: String
});

const beatsSchema = new Schema({
  title: String,
  owner: userSchema,
  genre: String,
  plays: Number,
  ownerId: String
});

const User = mongoose.model("user", userSchema);
const Beat = mongoose.model("beat", beatsSchema);

module.exports = {
  User,
  Beat
};
