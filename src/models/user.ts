import { Schema } from "mongoose";

export default new Schema({
  username: { type: String!, unique: true },
  email: { type: String!, unique: true },
  password: String!,
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
    default: ""
  },
  image: String,
  followingIds: [String],
  messageIds: [Number],
  role: String
});
