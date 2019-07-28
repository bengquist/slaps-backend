import { expect } from "chai";
import * as userApi from "./api";

describe("users", () => {
  describe("user(id: String!): User", () => {
    it("returns all users", async () => {
      const expected = [
        {
          email: "hello@robin.com",
          role: "ADMIN",
          username: "rwieruch"
        },
        {
          email: "hello@david.com",
          role: null,
          username: "ddavids"
        }
      ];

      const result = await userApi.users();

      expect(result.data.users).to.eql(expected);
    });
  });
  describe("deleteUser(id: String!): Boolean!", () => {
    it("returns an error because only admins can delete a user", async () => {
      const {
        data: {
          signIn: { token }
        }
      } = await userApi.signIn({
        login: "ddavids",
        password: "ddavids"
      });

      const { errors } = await userApi.deleteUser({ id: "1" }, token);

      expect(errors[0].message).to.eql("Not authorized as admin.");
    });
  });
});
