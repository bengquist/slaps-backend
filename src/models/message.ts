import { Schema } from "mongoose";

export default new Schema({
  id: String,
  text: String,
  userId: String,
  createdAt: { type: Date, default: Date.now }
});
