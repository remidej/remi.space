import { getCollection } from "astro:content";

export async function getPublishedBlogPosts() {
  return getCollection("blog", ({ data }) => data.draft !== true);
}

export function sortBlogPostsByDateDesc(
  posts: Awaited<ReturnType<typeof getPublishedBlogPosts>>
) {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
