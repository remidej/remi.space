import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";
import { postToMarkdown } from "../utils/markdown";

export async function GET() {
  const posts = sortBlogPostsByDateDesc(await getPublishedBlogPosts());

  const text = [
    "# Rémi de Juvigny: all blog posts",
    "",
    "> Full text of every article published on https://remi.space, newest first.",
    "",
    ...posts.map((post) => `---\n\n${postToMarkdown(post)}`),
  ].join("\n");

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
