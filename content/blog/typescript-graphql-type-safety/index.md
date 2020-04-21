---
title: End-to-end Type Safety with TypeScript and GraphQL
date: 2020-04-16
description: How to get a unique source of truth for your data models, and sync it across frontend and backend.
tags: ["typescript", "graphql"]
---

In the JavaScript community, static types often get bad press. It's because it gives a false sense of confidence, or because configuring the right tools is hard. Both are frequent issues, and happen because of mistakes in our app's architecture. Let's see how we may fix it.

## The problem

Let's consider this codebase written in TypeScript:

(diagram) TS backend <-> Rest API <-> TS frontend

We're never even using the `:any` type. Should be type-safe, right? Well, no, at least not yet. The problem is that our type safety is only as strong as its weakest point. In our case, the weak link is our API. The types from the frontend and the backend both live on their separate world. We have no guarantee that they will keep in sync. So we write types on the frontend based on what we _assume_ the backend will send, and vice versa.

We have multiple sources of truth. This is already annoying for our project. But it can become a huge issue if you have an architecture based on many microservices. The more side effects we have, the less control we have.

There are several ways to fix this:

* Refactor our project into a monolith. Types could then shared across files from the same project. But this is a huge change, and basing it only on type safety seems foolish.
* Extract our types into a module. We could either publish it on NPM, or use a [monorepo config](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/) for a private package. We could then import the needed types on both the backend and frontend.
* Make the API calls type-safe. This was almost impossible to with Rest, but is now one of the [core principles](https://graphql.org/learn/schema/) of GraphQL. Let's see how we can leverage this tech.

## GraphQL to the rescue

GraphQL is the tool we need to make type-safe API calls. We can use it as a bridge to propagate our backend types to the frontend. But we're not ready yet. But once again, using the right tool isn't enough. We need to make sure sure there are no holes in our type safety. On both the frontend and the backend, we need a way to convert port the GraphQL schema to TypeScript types. Here's the outline of the architecture:

(diagram) TS backend <-> backend bridge <-> GQL <-> frontend bridge <-> TS frontend

In our case, we have 3 islands of type safety, but they're not connected to each other. We need to build bridges on both sides, so that the source of truth for our models is shared from one end to the other.

### The frontend bridge

We need to introspect our GraphQL schema to generate TypeScript types. The folks at Apollo built a CLI with [this very feature](https://github.com/apollographql/apollo-tooling#apollo-clientcodegen-output). You will first need to [create an `apollo.config.js` file](https://www.apollographql.com/docs/devtools/apollo-config/), so that Apollo can find your schema. But the CLI itself also provides many options, and is not limited to TypeScript support. After some tweaking, here is the script I added to my `package.json` in my last project:

```json
"scripts": {
  "apollo:types": "rm -rf src/__generated__ && apollo client:codegen --config apollo.config.js --target typescript --outputFlat src/__generated__"
}
```

We can then type `npm run apollo:types` when there's a change in our schema or our queries and mutations. We can also keep it running in the background like this: `npm run apollo:types --watch`

The Apollo CLI can also be replaced by other tools.

* [GraphQL Code Generator](https://graphql-code-generator.com/) generates queries with the types built-in
* [gqless](https://gqless.dev/) provides TypeScript types, and only requires code generation when your schema changes

See you on the other side.

###The backend bridge

We now need to make sure that the GraphQL schema we generate is automatically linked to our resolvers and our application code.

We now need to patch the other gap in our architecture. The goal is to link our GraphQL schema to our backend code, which includes our resolvers and our business logic. This will defer greatly depending on how your schema is written.

#### SQL-first

If you write your GraphQL schema by hand, then just like for the frontend, you will need to set up code generation. This is why Prisma built [`graphqlgen`](https://github.com/prisma-labs/graphqlgen). It will make sure that your resolvers map one-to-one with your schema.

#### Code-first

But if type safety matters to you, code-first GraphQL development is a good strategy. The process is reversed: you write your types by hand in TypeScript, and they are used to generate a GraphQL schema.

Once again, several tools exist