import path from "node:path";
import type { getPublishedBlogPosts } from "./blog";

type BlogPost = Awaited<ReturnType<typeof getPublishedBlogPosts>>[number];

export const SITE_URL = "https://remi.space";

// Final public URLs of every asset that lives next to a post (images, videos)
const assetUrls = import.meta.glob<string>(
  "/src/content/blog/**/*.{png,jpg,jpeg,gif,webp,svg,mp4,webm}",
  { eager: true, query: "?url", import: "default" },
);

function resolveAssetUrl(post: BlogPost, relativePath: string) {
  if (/^(https?:)?\/\//.test(relativePath) || relativePath.startsWith("/")) {
    return relativePath;
  }
  const key = "/" + path.posix.join(path.posix.dirname(post.filePath!), relativePath);
  const url = assetUrls[key];
  return url ? new URL(url, SITE_URL).href : relativePath;
}

export function getPostUrl(post: BlogPost) {
  return `${SITE_URL}/blog/${post.data.slug}/`;
}

export function formatPostDate(post: BlogPost) {
  return post.data.date.toISOString().slice(0, 10);
}

/**
 * Turns a post's source (md or mdx) into plain markdown that agents can read:
 * MDX imports and components are replaced with markdown equivalents, and
 * relative asset paths become absolute URLs.
 */
export function postToMarkdown(post: BlogPost) {
  let body = post.body ?? "";

  // MDX imports, e.g. `import demoVideo from "./demo.mp4";`
  const importedAssets: Record<string, string> = {};
  body = body.replace(
    /^import\s+(\w+)\s+from\s+["'](.+?)["'];?\s*$/gm,
    (_, name: string, source: string) => {
      importedAssets[name] = resolveAssetUrl(post, source);
      return "";
    },
  );

  // <Callout variant="warning" title="Disclaimer">…</Callout> → blockquote
  body = body.replace(
    /<Callout([^>]*)>([\s\S]*?)<\/Callout>/g,
    (_, attributes: string, content: string) => {
      const variant = attributes.match(/variant="(\w+)"/)?.[1] ?? "note";
      const title = attributes.match(/title="([^"]*)"/)?.[1];
      const label = variant[0].toUpperCase() + variant.slice(1);
      const heading = title ? `**${label}: ${title}**` : `**${label}**`;
      const lines = content.trim().split("\n").map((line) => line.trim());
      return [heading, "", ...lines].map((line) => `> ${line}`.trimEnd()).join("\n");
    },
  );

  // <video><source src={demoVideo} /></video> → link to the video file
  body = body.replace(/<video[\s\S]*?<\/video>/g, (video) => {
    const name = video.match(/src=\{(\w+)\}/)?.[1];
    const url = name ? importedAssets[name] : video.match(/src="([^"]+)"/)?.[1];
    return url ? `[Video](${url})` : "";
  });

  // ![alt](./image.png) → ![alt](https://remi.space/_astro/image.hash.png)
  body = body.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, alt: string, src: string) => `![${alt}](${resolveAssetUrl(post, src)})`,
  );

  const header = [
    `# ${post.data.title}`,
    "",
    `> ${post.data.description}`,
    "",
    `By Rémi de Juvigny · Published ${formatPostDate(post)} · ${getPostUrl(post)}`,
  ].join("\n");

  return `${header}\n\n${body.trim().replace(/\n{3,}/g, "\n\n")}\n`;
}

export function markdownResponse(markdown: string) {
  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
