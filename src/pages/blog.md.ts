import type { APIRoute } from "astro";
import { md } from "astro-slop";
import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";

export const GET: APIRoute = async () => {
  const posts = sortBlogPostsByDateDesc(await getPublishedBlogPosts());

  return md`---
title: All blog posts
description: Every article by Rémi de Juvigny, newest first
---

${posts.map((post) => `- ${md.link(post.data.title, `/blog/${post.data.slug}.md`)} — ${post.data.description}`)}
`;
};
