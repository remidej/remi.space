import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";
import { SITE_URL, formatPostDate, markdownResponse } from "../utils/markdown";

export async function GET() {
  const posts = sortBlogPostsByDateDesc(await getPublishedBlogPosts());

  const markdown = [
    "# All blog posts by Rémi de Juvigny",
    "",
    "> Articles about making products for the web, using technologies like TypeScript and AI.",
    "",
    "Every post is also available as markdown by adding `.md` to its URL.",
    "",
    ...posts.map(
      (post) =>
        `- [${post.data.title}](${SITE_URL}/blog/${post.data.slug}.md) (${formatPostDate(post)}): ${post.data.description}`,
    ),
  ].join("\n");

  return markdownResponse(`${markdown}\n`);
}
