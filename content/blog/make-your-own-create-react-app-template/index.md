---
title: Make your own create-react-app template
date: 2020-03-19
description: How you can kickstart your React projects.
---

`create-react-app` is a handy CLI made by the React team. It allows us to create React projects rapidly, without having to worry about Webpack or Babel. And because it's based on a single NPM dependency (`react-scripts`), you can easily update it to add support for new React features like code splitting.

But by default, a project created with create-react-app comes with several files I don't use. So every time I create a small React app, I repeat the same steps:

* Delete the CSS files
* Delete the Service Worker
* Delete the default tests
* Create `components` and `pages` folders

And if it's a project I'll work on for more than a couple of days, I also:

* Setup ESLint
* Setup Prettier via ESLint
* Install React Router
* Install Styled Components
* Reset or Normalize the CSS

That's all very repetitive, and developers don't like repeating themselves.

## Templates

In version 3.3, `create-react-app` [added support for templates](https://create-react-app.dev/docs/custom-templates/). They allow you to chose the boilerplate you want when you initialize a React project.

Redux created their official template, the React team [made one for TypeScript](https://www.npmjs.com/package/cra-template-typescript), and [plenty of others](https://www.npmjs.com/package/cra-template-empty) were published on NPM. But none of those match my _exact_ process when starting a React project.

## Making our own template

Create a directory with the following structure:

```
cra-template-[template-name]/
  README.md (for npm)
  template.json
  package.json
  template/
    README.md (for projects created from this template)
    gitignore
    public/
      index.html
    src/
      index.js (or index.tsx)
```

You can then setup the `template/` folder to be the starting point for all your future projects.

The last step is to publish you template on NPM. 

## The Internet is your cloud

This approach goes beyond CRA's templates. There are many cases where you can use the public internet to host your files. You can publish your go-to ESLint config on NPM too. You can save your VS Code snippets as [an extension on the marketplace](https://marketplace.visualstudio.com/search?term=snippet&target=VSCode&category=Snippets&sortBy=Relevance).

This way, when you start a new project, or if you're setting up a new computer, you'll always keep the config you like. And who knows? Someone else may find it useful.
