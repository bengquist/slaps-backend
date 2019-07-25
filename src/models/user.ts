import { Schema } from "mongoose";

export default new Schema({
  id: String,
  username: String,
  email: String!,
  password: String!,
  messageIds: [Number]
});
