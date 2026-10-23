import type { APIContext } from "astro";
import { getPublishedBlogPosts } from "../../utils/blog";
import { markdownResponse, postToMarkdown } from "../../utils/markdown";

export async function getStaticPaths() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
}

export function GET({ props }: APIContext) {
  return markdownResponse(postToMarkdown(props.post));
}
