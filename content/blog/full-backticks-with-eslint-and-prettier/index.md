---
title: Use backticks for all your JS strings
date: 2020-03-17
description: Template literals are the most powerful way to write strings in JavaScript. Here's how to use them efficiently by default, with ESLint and Prettier.
---

ES 2015 gave us a new way to write strings in JavaScript called _template literals_ — or as we like to call them, **backticks**.

## Why backticks are superior

They provide a more readable syntax to include expressions (like variables) in our strings. They also allow us to write apostrophes or quotes in our strings, without worrying about escaping those characters. They can even be used for multi-line text.

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

But what's the point of converting your code from one style to the other when you can just use the most powerful from the start? Gatsby was the first big name in the JavaScript world to start adopting this approach

* Inspired by Gatsby
* Make it work with ESLint
* Make it not collide with Prettier
* Disable the accent on European keyboards
  
Once published, share on Github issues and Stack Overflow question comments
