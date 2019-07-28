import { PubSub } from "apollo-server-express";
import { subscriptionField, objectType } from "nexus";

import { CREATED, Message } from "./message";

export const pubsub = new PubSub();

export const EVENTS = {
  MESSAGE: CREATED
};

const MessageCreated = objectType({
  name: "MessageCreated",
  definition(t) {
    t.field("message", {
      type: Message
    });
  }
});

export const Subscription = subscriptionField("subscribe", {
  type: MessageCreated,
  subscribe: () => pubsub.asyncIterator(CREATED),
  resolve: () => pubsub.asyncIterator(CREATED)
});
