import global from "../data/global.json";
import { getPublishedBlogPosts, sortBlogPostsByDateDesc } from "../utils/blog";
import { SITE_URL, markdownResponse } from "../utils/markdown";

export async function GET() {
  const posts = sortBlogPostsByDateDesc(await getPublishedBlogPosts()).slice(0, 4);

  const markdown = [
    "# Rémi de Juvigny",
    "",
    "I'm a Product Engineer from France. I build open-source apps for developers. After five years at Strapi, I'm now working on [Camox](https://camox.ai), an agent-native CMS framework.",
    "",
    "I write about making products for the web, using technologies like TypeScript and AI.",
    "",
    "## Writing",
    "",
    ...posts.map(
      (post) => `- [${post.data.title}](${SITE_URL}/blog/${post.data.slug}.md): ${post.data.description}`,
    ),
    "",
    `[All articles](${SITE_URL}/blog.md)`,
    "",
    "## Work",
    "",
    "I'm building Camox full time.",
    "",
    "Camox is my take on what a next-gen CMS should look like. It leverages the power of coding agents without generating slop. It's opinionated, extensible, fully type-safe, all while providing full visual editing.",
    "",
    "Previously engineer at Strapi, where I worked on growing the ecosystem, and building content management features like History and Preview.",
    "",
    "## Contact",
    "",
    `- Email: ${global.email}`,
    ...global.footerSocialNetworks.map((network) => `- ${network.name}: ${network.url}`),
  ].join("\n");

  return markdownResponse(`${markdown}\n`);
}
