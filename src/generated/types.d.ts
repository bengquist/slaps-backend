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
  _id: string;

  text: string;

  createdAt: Date;

  user: User;
}

export interface User {
  _id: string;

  username: string;

  email: string;

  role?: Maybe<string>;

  messages?: Maybe<Message[]>;
}

export interface Mutation {
  createMessage: Message;

  deleteMessage: boolean;

  _?: Maybe<boolean>;

  signUp: Token;

  signIn: Token;

  deleteUser: boolean;
}

export interface Token {
  token: string;
}

export interface Subscription {
  _?: Maybe<boolean>;
}

export interface MessageSchema {
  id: string;

  text: string;

  userId: string;
}

export interface UserSchema {
  id: string;

  username: string;

  messageIds?: Maybe<string[]>;
}

// ====================================================
// Arguments
// ====================================================

export interface MessagesQueryArgs {
  cursor?: Maybe<string>;

  limit?: Maybe<number>;
}
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
export interface SignUpMutationArgs {
  username: string;

  email: string;

  password: string;
}
export interface SignInMutationArgs {
  login: string;

  password: string;
}
export interface DeleteUserMutationArgs {
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
  > = Resolver<R, Parent, TContext, MessagesArgs>;
  export interface MessagesArgs {
    cursor?: Maybe<string>;

    limit?: Maybe<number>;
  }

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
    _id?: _IdResolver<string, TypeParent, TContext>;

    text?: TextResolver<string, TypeParent, TContext>;

    createdAt?: CreatedAtResolver<Date, TypeParent, TContext>;

    user?: UserResolver<User, TypeParent, TContext>;
  }

  export type _IdResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type TextResolver<
    R = string,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type CreatedAtResolver<
    R = Date,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = User,
    Parent = Message,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace UserResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = User> {
    _id?: _IdResolver<string, TypeParent, TContext>;

    username?: UsernameResolver<string, TypeParent, TContext>;

    email?: EmailResolver<string, TypeParent, TContext>;

    role?: RoleResolver<Maybe<string>, TypeParent, TContext>;

    messages?: MessagesResolver<Maybe<Message[]>, TypeParent, TContext>;
  }

  export type _IdResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UsernameResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type EmailResolver<
    R = string,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type RoleResolver<
    R = Maybe<string>,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MessagesResolver<
    R = Maybe<Message[]>,
    Parent = User,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = {}> {
    createMessage?: CreateMessageResolver<Message, TypeParent, TContext>;

    deleteMessage?: DeleteMessageResolver<boolean, TypeParent, TContext>;

    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;

    signUp?: SignUpResolver<Token, TypeParent, TContext>;

    signIn?: SignInResolver<Token, TypeParent, TContext>;

    deleteUser?: DeleteUserResolver<boolean, TypeParent, TContext>;
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
  export type SignUpResolver<
    R = Token,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, SignUpArgs>;
  export interface SignUpArgs {
    username: string;

    email: string;

    password: string;
  }

  export type SignInResolver<
    R = Token,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, SignInArgs>;
  export interface SignInArgs {
    login: string;

    password: string;
  }

  export type DeleteUserResolver<
    R = boolean,
    Parent = {},
    TContext = MyContext
  > = Resolver<R, Parent, TContext, DeleteUserArgs>;
  export interface DeleteUserArgs {
    id: string;
  }
}

export namespace TokenResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = Token> {
    token?: TokenResolver<string, TypeParent, TContext>;
  }

  export type TokenResolver<
    R = string,
    Parent = Token,
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

export namespace MessageSchemaResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = MessageSchema> {
    id?: IdResolver<string, TypeParent, TContext>;

    text?: TextResolver<string, TypeParent, TContext>;

    userId?: UserIdResolver<string, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = MessageSchema,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type TextResolver<
    R = string,
    Parent = MessageSchema,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UserIdResolver<
    R = string,
    Parent = MessageSchema,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
}

export namespace UserSchemaResolvers {
  export interface Resolvers<TContext = MyContext, TypeParent = UserSchema> {
    id?: IdResolver<string, TypeParent, TContext>;

    username?: UsernameResolver<string, TypeParent, TContext>;

    messageIds?: MessageIdsResolver<Maybe<string[]>, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = UserSchema,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type UsernameResolver<
    R = string,
    Parent = UserSchema,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
  export type MessageIdsResolver<
    R = Maybe<string[]>,
    Parent = UserSchema,
    TContext = MyContext
  > = Resolver<R, Parent, TContext>;
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
  Token?: TokenResolvers.Resolvers<TContext>;
  Subscription?: SubscriptionResolvers.Resolvers<TContext>;
  MessageSchema?: MessageSchemaResolvers.Resolvers<TContext>;
  UserSchema?: UserSchemaResolvers.Resolvers<TContext>;
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

export interface MessageSchemaDbObject {
  _id: ObjectID;
  text: string;
  userId: string;
}

export interface UserSchemaDbObject {
  _id: ObjectID;
  username: string;
  messageIds: Maybe<string[]>;
}
