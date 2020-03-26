---
title: Use backticks for all your JS strings
date: 2020-03-17
description: Template literals are the most powerful way to write strings in JavaScript. Here's how you can use them by default with ESLint.
---

Developers often argue over using `'single quotes'` or`"double quotes"`. But both have the same limitations. Every time we write a string that includes an expression or a line break, we have to deal with a messy syntax.

```js
// Expressions with quotes
const description = "A poem by " + author + ", published in " + year;

// Multi-line with quotes
const poem = "Roses are red\nViolets are blue";
```

## Backticks

ES 2015 gave us a new way to write strings in JavaScript called _template literals_ — or as we like to call them, **backticks**. Their syntax is more readable:

```js
// Expressions with template strings
const description = `A poem by ${author}, published in ${year}`;

// Multi-line with template strings
const longText2 = `Roses are red
Violets are blue`
```

Besides, we can safely write apostrophes and quotes in our strings without worrying about `\escaping` them.

## When to use backticks

The standard approach among developers has been to keep using single or double quotes for all our strings. And if we need of one the unique features of backticks, only then do we convert our strings into template literals.

This works fine. But what's the point of converting your code from one style to the other? Can't we use the most powerful one from the start?

Two things may prevent us from going full backticks.

* **Performance**. Template strings used to be slower. Since ES 2015 was released, JS engines have had time to optimize their support for template strings. They should now be _almost_ as performant as regular strings.
* **Compatibility**. Template strings are newer than quotes, so [their browser support isn't as good](https://caniuse.com/#feat=template-literals).

Both of these concerns can be resolved by using a compiler like Babel. Then every time you write code using a fancy new syntax like backticks, it will be converted to older code that all browsers can understand.

We can now start using backticks by default, for all our strings.

## Enforce backticks with ESLint

We need to configure our tools to enforce this new style. Style rules are usually handled by Prettier, but it [doesn't currently support backticks for all strings](https://github.com/prettier/prettier/issues/54). Luckily, ESLint has just the option we need. Add this rule to your `.eslintrc`:

```json
{
  "parserOptions": {
    "ecmaVersion": 2015
  },
  "rules": {
    "prettier/prettier": [
      "error"
    ],
  // highlight-next-line
    "quotes": ["error", "backtick"]
  },
  "extends": ["plugin:prettier/recommended"]
}
```

Now every time you run `eslint --fix`, your quotes will be converted to backticks.
