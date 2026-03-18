import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import global from "../data/global.json";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

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
