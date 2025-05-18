import { client } from "@/utils/cms";
import { url } from "@/utils/url";
import RSS from "rss";

export async function GET() {
  const [articles, tags, global] = await Promise.all([
    client.collection("articles").find({
      fields: ["title", "description", "slug", "publishedAt"],
      sort: ["publishedAt:desc"],
      populate: {
        tags: {
          fields: ["name"],
        },
      },
      pagination: {
        page: 1,
        pageSize: 99,
      },
    }),
    client.collection("tags").find({
      fields: ["name"],
      pagination: {
        page: 1,
        pageSize: 99,
      },
    }),
    client.single("global").find({
      fields: ["siteName"],
    }),
  ]);

  const feed = new RSS({
    feed_url: `${url}/rss.xml`,
    site_url: url,
    language: "en",
    title: global.data.siteName,
    description: `All the articles from ${global.data.siteName}`,
    categories: tags.data.map((tag) => tag.name),
  });

  articles.data.forEach((article) => {
    feed.item({
      title: article.title,
      description: article.description,
      url: `${url}/blog/${article.slug}`,
      date: new Date(article.publishedAt!),
      ...(article.tags && {
        categories: article.tags.data.map((tag) => tag.name),
      }),
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
