import { queryType } from "nexus";
import { useUserQuery } from "./user";
import { useMessageQuery } from "./message";

export const Query = queryType({
  definition(t) {
    useUserQuery(t);
    useMessageQuery(t);
  }
});
