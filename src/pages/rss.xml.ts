import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import global from "../data/global.json";
import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";

export async function GET(context: APIContext) {
  const sortedPosts = sortBlogPostsByDateDesc(await getPublishedBlogPosts());

  return rss({
    title: global.siteName,
    description: `All the articles from ${global.siteName}`,
    site: context.site!,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.data.slug}`,
      categories: post.data.tags,
    })),
  });
}
