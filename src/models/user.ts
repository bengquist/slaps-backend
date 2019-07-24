import { Schema } from "mongoose";

export default new Schema({
  id: String,
  username: String,
  messageIds: [Number]
});
