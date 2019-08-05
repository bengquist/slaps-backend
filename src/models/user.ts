import { Schema } from "mongoose";

export default new Schema({
  id: String,
  username: String,
  email: String!,
  password: String!,
  firstName: String,
  lastName: String,
  location: String,
  bio: String,
  image: String,
  followingIds: [String],
  messageIds: [Number],
  role: String
});
