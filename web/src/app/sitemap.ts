import type { APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { url } from "@/utils/url";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, pages] = await Promise.all([
    fetcher<APIResponseCollection<"api::article.article">>("/api/articles", {
      fields: ["slug", "updatedAt"],
      sort: ["createdAt:desc"], // used for blog page lastModified
      pagination: {
        page: 1,
        pageSize: 99,
      },
    }),
    fetcher<APIResponseCollection<"api::page.page">>("/api/pages", {
      fields: ["slug", "updatedAt"],
      pagination: {
        page: 1,
        pageSize: 99,
      },
    }),
  ]);

  return [
    // Article pages
    ...articles.data.map((article) => ({
      url: `${url}/blog/${article.attributes.slug}`,
      ...(article.attributes.updatedAt && {
        lastModified: new Date(article.attributes.updatedAt),
      }),
      priority: 0.8,
    })),
    // Pages from the page collection type
    ...pages.data.map((page) => {
      // Treat homepage separately to prioritize it
      if (page.attributes.slug === "_") {
        return {
          url,
          ...(page.attributes.updatedAt && {
            lastModified: new Date(page.attributes.updatedAt),
          }),
          priority: 1,
          changeFrequency: "daily",
        };
      }

      return {
        url: `${url}/${page.attributes.slug.replace("_", "")}`,
        ...(page.attributes.updatedAt && {
          lastModified: new Date(page.attributes.updatedAt),
        }),
        priority: page.attributes.slug === "_" ? 1 : 0.8,
        changeFrequency: "weekly",
      };
    }),
    // Blog page is not generated by the CMS, we need to add it separately
    {
      url: `${url}/blog`,
      lastModified: articles.data[0].attributes.updatedAt,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
