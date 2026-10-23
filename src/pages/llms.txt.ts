import global from "../data/global.json";
import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";
import { SITE_URL } from "../utils/markdown";

// See https://llmstxt.org
export async function GET() {
  const posts = sortBlogPostsByDateDesc(await getPublishedBlogPosts());

  const text = [
    "# Rémi de Juvigny",
    "",
    "> Personal website and blog of Rémi de Juvigny, a Product Engineer from France who builds open-source apps for developers. After five years at Strapi, he's now building Camox (https://camox.ai), an agent-native CMS framework. He writes about making products for the web, using technologies like TypeScript and AI.",
    "",
    "Every page on this site has a markdown version: add `.md` to the URL (e.g. `/blog/clean-git-history.md`). The full text of every post is available at `/llms-full.txt`.",
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/index.md): Short bio, latest articles and current work`,
    `- [Blog](${SITE_URL}/blog.md): List of all articles`,
    "",
    "## Blog posts",
    "",
    ...posts.map(
      (post) => `- [${post.data.title}](${SITE_URL}/blog/${post.data.slug}.md): ${post.data.description}`,
    ),
    "",
    "## Optional",
    "",
    `- [Full text of all posts](${SITE_URL}/llms-full.txt)`,
    `- [RSS feed](${SITE_URL}/rss.xml)`,
    `- [Camox](https://camox.ai): The agent-native CMS framework Rémi is building`,
    ...global.footerSocialNetworks.map((network) => `- [${network.name}](${network.url})`),
    `- [Email](mailto:${global.email})`,
  ].join("\n");

  return new Response(`${text}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
