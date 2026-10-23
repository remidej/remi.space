import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { md } from "astro-slop";
import global from "../data/global.json";
import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";

export const GET: APIRoute = async () => {
  const posts = sortBlogPostsByDateDesc(await getPublishedBlogPosts()).slice(0, 4);
  const intro = await getEntry("pages", "intro");
  const work = await getEntry("pages", "work");

  return md`---
title: ${global.siteName}
description: Bio, latest articles and current work
---

${intro?.body ?? ""}

## Writing

${posts.map((post) => `- ${md.link(post.data.title, `/blog/${post.data.slug}.md`)} — ${post.data.description}`)}

${md.link("All articles", "/blog.md")}

## Work

${work?.body ?? ""}

## Contact

- Email: ${global.email}
${global.footerSocialNetworks.map((network) => `- ${network.name}: ${network.url}`)}
`;
};
