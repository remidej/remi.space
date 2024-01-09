import type { APIResponse, APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { url } from "@/utils/url";
import RSS from "rss";

export async function GET() {
  const [articles, tags, global] = await Promise.all([
    await fetcher<APIResponseCollection<"api::article.article">>(
      "/api/articles",
      {
        fields: ["title", "description", "slug", "publishedAt"],
        populate: {
          tags: {
            fields: ["name"],
          },
        },
      }
    ),
    await fetcher<APIResponseCollection<"api::tag.tag">>("/api/tags", {
      fields: ["name"],
    }),
    await fetcher<APIResponse<"api::global.global">>("/api/global", {
      fields: ["siteName"],
    }),
  ]);

  const feed = new RSS({
    feed_url: `${url}/rss.xml`,
    site_url: url,
    language: "en",
    title: global.data.attributes.siteName,
    description: `All the articles from ${global.data.attributes.siteName}`,
    categories: tags.data.map((tag) => tag.attributes.name),
  });

  articles.data.forEach((article) => {
    feed.item({
      title: article.attributes.title,
      description: article.attributes.description,
      url: `${url}/blog/${article.attributes.slug}`,
      date: new Date(article.attributes.publishedAt!),
      ...(article.attributes.tags && {
        categories: article.attributes.tags.data.map(
          (tag) => tag.attributes.name
        ),
      }),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
