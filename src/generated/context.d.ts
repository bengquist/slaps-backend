import { UserSchemaDbObject, MessageSchemaDbObject } from "./types";

export type MyContext = {
  models: { user: UserSchemaDbObject; message: MessageSchemaDbObject };
  me: any;
};
