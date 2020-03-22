---
title: Use backticks for all your JS strings
date: 2020-03-17
description: Template literals are the most powerful way to write strings in JavaScript. Here's how you can use them by default with ESLint.
---

ES 2015 gave us a new way to write strings in JavaScript called _template literals_ — or as we like to call them, **backticks**.

## Why backticks are superior

Backticks provide a more readable syntax to include expressions (like variables) in our strings. They also allow us to write characters like apostrophes or quotes without worrying about `\escaping` them. They can even be used for multi-line text.

```js
// Dynamic values with quotes
console.log("My name is " + name + ", and I'm " + age + " years old");

// Dynamic values with template strings
console.log(`My name is ${name}, and I'm ${age} years old`);

// Multi-line with quotes
const longText1 = "This is line 1\nThis is line 2";

// Multi-line with template strings
const longText2 = `This is line 1
This is line2`
```

I used to only write template literals when I needed one of these features, but kept using single or double quotes otherwise. I would just convert them to backticks when I needed to add an expression or a new line to my string.

But what's the point of converting your code from one style to the other? Can't you just use the most powerful one from the start?

A concern you may have is performance. Backticks used to be slower than regular strings when they were released. However, browsers have had time to optimize their ES 2015 support, so the difference is now neglectable. Besides, if you use a compiler like Babel, backticks will be converted to strings and concatenation.

## Enforce backticks with ESLint

Now we need to configure our tools to enforce this new style. Style rules are usually handled by Prettier, but it doesn't currently support backticks for all strings. Luckily, ESLint has just the option we need. Add this rule to your `.eslintrc`:

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
