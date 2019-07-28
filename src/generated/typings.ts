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
  PageInfo: { // root type
    endCursor: string; // String!
    hasNextPage: boolean; // Boolean!
  }
  Query: {};
  User: { // root type
    _id: string; // ID!
    email: string; // String!
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
  User: { // field return type
    _id: string; // ID!
    email: string; // String!
    messages: NexusGenRootTypes['Message'][]; // [Message!]!
    role: string | null; // String
    username: string; // String!
  }
}

export interface NexusGenArgTypes {
  Query: {
    message: { // args
      id?: string | null; // String
    }
    messages: { // args
      cursor?: string | null; // String
      limit?: number | null; // Int
    }
    user: { // args
      id: string; // String!
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Message" | "MessageConnection" | "PageInfo" | "Query" | "User";

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