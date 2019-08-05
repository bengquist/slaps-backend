/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */






declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Message: { // root type
    _id: string; // ID!
    text: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  MessageConnection: { // root type
    edges: NexusGenRootTypes['Message'][]; // [Message!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MessageCreated: { // root type
    message: NexusGenRootTypes['Message']; // Message!
  }
  Mutation: {};
  PageInfo: { // root type
    endCursor: string; // String!
    hasNextPage: boolean; // Boolean!
  }
  Query: {};
  Subscription: {};
  Token: { // root type
    token: string; // String!
  }
  User: { // root type
    _id: string; // ID!
    bio: string; // String!
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    location: string; // String!
    messages: NexusGenRootTypes['Message'][]; // [Message!]!
    role?: string | null; // String
    username: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Message: { // field return type
    _id: string; // ID!
    text: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  MessageConnection: { // field return type
    edges: NexusGenRootTypes['Message'][]; // [Message!]!
    pageInfo: NexusGenRootTypes['PageInfo']; // PageInfo!
  }
  MessageCreated: { // field return type
    message: NexusGenRootTypes['Message']; // Message!
  }
  Mutation: { // field return type
    createMessage: NexusGenRootTypes['Message']; // Message!
    deleteMessage: NexusGenRootTypes['Message']; // Message!
    deleteUser: NexusGenRootTypes['User']; // User!
    signIn: NexusGenRootTypes['Token']; // Token!
    signUp: NexusGenRootTypes['Token']; // Token!
    updateUser: NexusGenRootTypes['User']; // User!
  }
  PageInfo: { // field return type
    endCursor: string; // String!
    hasNextPage: boolean; // Boolean!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User']; // User!
    message: NexusGenRootTypes['Message']; // Message!
    messages: NexusGenRootTypes['MessageConnection']; // MessageConnection!
    user: NexusGenRootTypes['User']; // User!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Subscription: { // field return type
    messageCreated: NexusGenRootTypes['MessageCreated']; // MessageCreated!
  }
  Token: { // field return type
    token: string; // String!
  }
  User: { // field return type
    _id: string; // ID!
    bio: string; // String!
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    location: string; // String!
    messages: NexusGenRootTypes['Message'][]; // [Message!]!
    role: string | null; // String
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createMessage: { // args
      text?: string | null; // String
    }
    deleteMessage: { // args
      id?: string | null; // String
    }
    deleteUser: { // args
      id?: string | null; // String
    }
    signIn: { // args
      login?: string | null; // String
      password?: string | null; // String
    }
    signUp: { // args
      email?: string | null; // String
      password?: string | null; // String
      username?: string | null; // String
    }
    updateUser: { // args
      bio?: string | null; // String
      firstName?: string | null; // String
      image?: string | null; // String
      lastName?: string | null; // String
      location?: string | null; // String
    }
  }
  Query: {
    message: { // args
      id?: string | null; // String
    }
    messages: { // args
      cursor?: string | null; // String
      limit?: number | null; // Int
    }
    user: { // args
      id?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Message" | "MessageConnection" | "MessageCreated" | "Mutation" | "PageInfo" | "Query" | "Subscription" | "Token" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}