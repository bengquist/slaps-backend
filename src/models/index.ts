import user from "./user";
import message from "./message";
import mongoose from "mongoose";

const User = mongoose.model("user", user);
const Message = mongoose.model("message", message);

export default {
  User,
  Message
};
