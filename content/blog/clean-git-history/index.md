---
title: 5 tips to keep a clean Git history
date: 2020-05-04
description: Your project's Git history is a powerful time machine. Avoid flooding it with useless noise.
---

Your project's Git history is a powerful time machine. Here's how to avoid flooding it with useless noise.

## Squash your commits 

I like committing my changes frequently. I makes me feel safe knowing my changes are saved somewhere, so I commit every time I take a small break. But that means my commits become meaningless. They reflect what my days look like, not what's in my code.

Some changes only make sense when grouped together. But they end up spread out across commits like this:

![Redundant commits](./assets/redundant-commits.png)

It's hard giving each one a meaningful name, because they have no individual value. They're just here to let me go back in time if I mess up too much. And that's fine – as long as they don't stay around forever.

To clean up a bunch of redundant commits, you need to squash them. That means combining them into a single commit that contains all the changes. Suddenly your history becomes neat and relevant.

![Squashed commits](./assets/squashed-commits.png)

You can squash the commits using the CLI, but the syntax is quite fuzzy ([from Stack Overflow](http://stackoverflow.com/a/5201642/295797)):

```sh
git reset --soft HEAD~3 && git commit
```

The most convenient way to squash commits is during Pull Requests. Both GitHub and GitLab let you combine your commits when you decide to merge your branch.

* Using GitHub : ![GitHub squashed commits](./assets/github-squash-and-merge.png)
* Using GitLab :![GitLab commits](./assets/gitlab-squash-and-merge.png)

## Avoid merge commits

When you're coding a new feature, it's a good practice to work on a separate branch – often called a _feature branch_. By the time you're ready, your Git tree probably looks like this:

![Feature branch](./assets/feature-branch-with-changes.png)

Git encourages you to work on different branches. Every time you work on something new, you Your Git may look like this: But when your changes are ready, 

We often need to take changes from one branch, and apply them to another. Git has two commands for this: **merge** and **rebase**.

In most cases, `git merge` will create a commit that reconciles one branch with the other, so that they don't have conflicts or lost changes.

## Visualize your Git tree

When you work with sevral people on several branches, it's easy to get lost. Then you make mistakes because you don't have a good understanding of how you got there. An easy way to fix that is to open a visualization of your Git history

```sh
git log --graph --oneline --al
```

## Summary

Here is a good workflow to apply these tips:

* Create a branch for every feature
* Put as many commits as you want in that branch
* Squash and merge your commits into your working branch
* Delete the feature branch and its references
* Amend your last commit if it has a fix a typo
* Repeat