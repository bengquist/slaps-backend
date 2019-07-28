import { mutationType } from "nexus";
import { useUserMutation } from "./user";

export const Mutation = mutationType({
  definition(t) {
    useUserMutation(t);
  }
});
