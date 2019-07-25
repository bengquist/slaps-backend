export type Maybe<T> = T | null;

export interface AdditionalEntityFields {
  path?: Maybe<string>;

  type?: Maybe<string>;
}

export type Date = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  messages: Message[];

  message: Message;

  _?: Maybe<boolean>;

  users?: Maybe<User[]>;

  user?: Maybe<User>;

  me?: Maybe<User>;
}

export interface Message {
  id: string;

  text: string;

  user: User;

  userId: string;
}

export interface User {
  id: string;

  username: string;

  messages?: Maybe<Message[]>;

  messageIds?: Maybe<string[]>;
}

export interface Mutation {
  createMessage: Message;

  deleteMessage: boolean;

  _?: Maybe<boolean>;
}

export interface Subscription {
  _?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface MessageQueryArgs {
  id: string;
}
export interface UserQueryArgs {
  id: string;
}
export interface CreateMessageMutationArgs {
  text: string;
}
export interface DeleteMessageMutationArgs {
  id: string;
}

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { MyContext } from "./context";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    messages?: MessagesResolver<Message[], TypeParent, TContext>;

    message?: MessageResolver<Message, TypeParent, TContext>;

    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;

    users?: UsersResolver<Maybe<User[]>, TypeParent, TContext>;

    user?: UserResolver<Maybe<User>, TypeParent, TContext>;

    me?: MeResolver<Maybe<User>, TypeParent, TContext>;
  }

  export type MessagesResolver<
    R = Message[],
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MessageResolver<
    R = Message,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, MessageArgs>;
  export interface MessageArgs {
    id: string;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UsersResolver<
    R = Maybe<User[]>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type MeResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MessageResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = Message> {
    id?: IdResolver<string, TypeParent, TContext>;

    text?: TextResolver<string, TypeParent, TContext>;

    user?: UserResolver<User, TypeParent, TContext>;

    userId?: UserIdResolver<string, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type TextResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = User,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserIdResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace UserResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>;

    username?: UsernameResolver<string, TypeParent, TContext>;

    messages?: MessagesResolver<Maybe<Message[]>, TypeParent, TContext>;

    messageIds?: MessageIdsResolver<Maybe<string[]>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UsernameResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MessagesResolver<
    R = Maybe<Message[]>,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MessageIdsResolver<
    R = Maybe<string[]>,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    createMessage?: CreateMessageResolver<Message, TypeParent, TContext>;

    deleteMessage?: DeleteMessageResolver<boolean, TypeParent, TContext>;

    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;
  }

  export type CreateMessageResolver<
    R = Message,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, CreateMessageArgs>;
  export interface CreateMessageArgs {
    text: string;
  }

  export type DeleteMessageResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, DeleteMessageArgs>;
  export interface DeleteMessageArgs {
    id: string;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    TContext = MyContext
  > = SubscriptionResolver<R, Parent, TContext>;
}

export type UnionDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  UnionDirectiveArgs,
  MyContext
>;
export interface UnionDirectiveArgs {
  discriminatorField?: Maybe<string>;
}

export type AbstractEntityDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  AbstractEntityDirectiveArgs,
  MyContext
>;
export interface AbstractEntityDirectiveArgs {
  discriminatorField: string;
}

export type EntityDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  EntityDirectiveArgs,
  MyContext
>;
export interface EntityDirectiveArgs {
  embedded?: Maybe<boolean>;

  additionalFields?: Maybe<(Maybe<AdditionalEntityFields>)[]>;
}

export type ColumnDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  ColumnDirectiveArgs,
  MyContext
>;
export interface ColumnDirectiveArgs {
  name?: Maybe<string>;

  overrideType?: Maybe<string>;

  overrideIsArray?: Maybe<boolean>;
}

export type IdDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  {},
  MyContext
>;
export type LinkDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  {},
  MyContext
>;
export type EmbeddedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  {},
  MyContext
>;
export type MapDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  MapDirectiveArgs,
  MyContext
>;
export interface MapDirectiveArgs {
  path: string;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  MyContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  MyContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  MyContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}

export type IResolvers<TContext = MyContext> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  Message?: MessageResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  Subscription?: SubscriptionResolvers.Resolvers<TContext>;
  Date?: GraphQLScalarType;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  union?: UnionDirectiveResolver<Result>;
  abstractEntity?: AbstractEntityDirectiveResolver<Result>;
  entity?: EntityDirectiveResolver<Result>;
  column?: ColumnDirectiveResolver<Result>;
  id?: IdDirectiveResolver<Result>;
  link?: LinkDirectiveResolver<Result>;
  embedded?: EmbeddedDirectiveResolver<Result>;
  map?: MapDirectiveResolver<Result>;
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
import { ObjectID } from "mongodb";

export interface MessageDbObject {
  _id: ObjectID;
  text: string;
  userId: string;
}

export interface UserDbObject {
  _id: ObjectID;
  username: string;
  messageIds: Maybe<string[]>;
}
