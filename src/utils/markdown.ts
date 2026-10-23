import path from "node:path";
import type { CollectionEntry } from "astro:content";

export const SITE_URL = "https://remi.space";

export function getPostUrl(post: CollectionEntry<"blog">) {
  return `${SITE_URL}/blog/${post.data.slug}/`;
}

// Final public URLs of every asset that lives next to a post (images, videos)
const assetUrls = import.meta.glob<string>(
  "/src/content/blog/**/*.{png,jpg,jpeg,gif,webp,svg,mp4,webm}",
  { eager: true, query: "?url", import: "default" },
);

function resolveAssetUrl(post: CollectionEntry<"blog">, relativePath: string) {
  const key = "/" + path.posix.join(path.posix.dirname(post.filePath!), relativePath);
  return assetUrls[key] ? new URL(assetUrls[key], SITE_URL).href : relativePath;
}

/**
 * Rewrites a post's relative asset paths to absolute URLs, so images and
 * videos still work when the raw markdown is read outside the site.
 * Run before astro-slop's cleanMdx, which strips the MDX imports.
 */
export function resolvePostAssets(post: CollectionEntry<"blog">) {
  let body = post.body ?? "";

  // MDX asset imports used as attributes: `import demo from "./demo.mp4"` + `src={demo}`
  for (const [, name, source] of body.matchAll(/^import\s+(\w+)\s+from\s+["'](\..+?)["'];?$/gm)) {
    body = body.replaceAll(`{${name}}`, `"${resolveAssetUrl(post, source)}"`);
  }

  // Markdown images: ![alt](./image.png)
  return body.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/)([^)\s]+)\)/g,
    (_, alt: string, src: string) => `![${alt}](${resolveAssetUrl(post, src)})`,
  );
}
