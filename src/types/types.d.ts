export type Maybe<T> = T | null;

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  _?: Maybe<boolean>;

  users?: Maybe<User[]>;

  user?: Maybe<User>;

  me?: Maybe<User>;

  messages: Message[];

  message: Message;
}

export interface User {
  id: string;

  username: string;

  messages?: Maybe<Message[]>;
}

export interface Message {
  id: string;

  text: string;

  user: User;
}

export interface Mutation {
  _?: Maybe<boolean>;

  createMessage: Message;

  deleteMessage: boolean;
}

export interface Subscription {
  _?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: string;
}
export interface MessageQueryArgs {
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
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;

    users?: UsersResolver<Maybe<User[]>, TypeParent, TContext>;

    user?: UserResolver<Maybe<User>, TypeParent, TContext>;

    me?: MeResolver<Maybe<User>, TypeParent, TContext>;

    messages?: MessagesResolver<Message[], TypeParent, TContext>;

    message?: MessageResolver<Message, TypeParent, TContext>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type UsersResolver<
    R = Maybe<User[]>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type MeResolver<
    R = Maybe<User>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type MessagesResolver<
    R = Message[],
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type MessageResolver<
    R = Message,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, MessageArgs>;
  export interface MessageArgs {
    id: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<TContext = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, TContext>;

    username?: UsernameResolver<string, TypeParent, TContext>;

    messages?: MessagesResolver<Maybe<Message[]>, TypeParent, TContext>;
  }

  export type IdResolver<R = string, Parent = User, TContext = {}> = Resolver<
    R,
    Parent,
    TContext
  >;
  export type UsernameResolver<
    R = string,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type MessagesResolver<
    R = Maybe<Message[]>,
    Parent = User,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

export namespace MessageResolvers {
  export interface Resolvers<TContext = {}, TypeParent = Message> {
    id?: IdResolver<string, TypeParent, TContext>;

    text?: TextResolver<string, TypeParent, TContext>;

    user?: UserResolver<User, TypeParent, TContext>;
  }

  export type IdResolver<
    R = string,
    Parent = Message,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type TextResolver<
    R = string,
    Parent = Message,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type UserResolver<
    R = User,
    Parent = Message,
    TContext = {}
  > = Resolver<R, Parent, TContext>;
}

export namespace MutationResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;

    createMessage?: CreateMessageResolver<Message, TypeParent, TContext>;

    deleteMessage?: DeleteMessageResolver<boolean, TypeParent, TContext>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext>;
  export type CreateMessageResolver<
    R = Message,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, CreateMessageArgs>;
  export interface CreateMessageArgs {
    text: string;
  }

  export type DeleteMessageResolver<
    R = boolean,
    Parent = {},
    TContext = {}
  > = Resolver<R, Parent, TContext, DeleteMessageArgs>;
  export interface DeleteMessageArgs {
    id: string;
  }
}

export namespace SubscriptionResolvers {
  export interface Resolvers<TContext = {}, TypeParent = {}> {
    _?: _Resolver<Maybe<boolean>, TypeParent, TContext>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    TContext = {}
  > = SubscriptionResolver<R, Parent, TContext>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<DateTime, any> {
  name: "DateTime";
}

export type IResolvers<TContext = {}> = {
  Query?: QueryResolvers.Resolvers<TContext>;
  User?: UserResolvers.Resolvers<TContext>;
  Message?: MessageResolvers.Resolvers<TContext>;
  Mutation?: MutationResolvers.Resolvers<TContext>;
  Subscription?: SubscriptionResolvers.Resolvers<TContext>;
  DateTime?: GraphQLScalarType;
} & { [typeName: string]: never };

export type IDirectiveResolvers<Result> = {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
} & { [directiveName: string]: never };
