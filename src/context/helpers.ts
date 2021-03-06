import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";

export const getMe = async (req: any) => {
  const token = req.headers["authorization"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET || "");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};
