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
          role: "ADMIN",
          username: "ddavids"
        }
      ];

      const result = await userApi.users();

      expect(result.data.users).to.eql(expected);
    });
  });
});
