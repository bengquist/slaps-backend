import { mutationType } from "nexus";
import { useUserMutation } from "./user";
import { useMessageMutation } from "./message";

export const Mutation = mutationType({
  definition(t) {
    useUserMutation(t);
    useMessageMutation(t);
  }
});
