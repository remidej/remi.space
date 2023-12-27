import * as React from "react";
import { ArticlePreview } from "@/components/ArticlePreview";
import type { APIResponse, APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { Filters } from "./Filters";
import { URLSearchParams } from "url";
import { type Metadata } from "next";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const tagsParam = searchParams.tags?.split(",").filter(Boolean) ?? [];
  const articles = await fetcher<APIResponseCollection<"api::article.article">>(
    "/api/articles",
    {
      fields: ["title", "description", "slug"],
      populate: {
        tags: {
          fields: ["name", "slug"],
        },
      },
      filters: {
        title: {
          $containsi: searchParams.search,
        },
      },
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
        pageSize: 40,
      },
    }
  );

  const tags = await fetcher<APIResponseCollection<"api::tag.tag">>(
    "/api/tags",
    {
      fields: ["name", "slug"],
    }
  );

  const filteredArticles =
    tagsParam.length > 0
      ? articles.data.filter((article) => {
          return article.attributes.tags?.data.some((tag) =>
            tagsParam.includes(tag.attributes.slug!)
          );
        })
      : articles.data;

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-300">
        All blog posts
      </h1>
      <Filters tags={tags} resultsCount={filteredArticles.length} />
      {articles.data.length === 0 && <p className="mt-8">No articles found</p>}
      <section className="flex-1 mt-8 flex flex-col gap-8">
        {filteredArticles.map((article) => (
          <ArticlePreview article={article} key={article.id} />
        ))}
      </section>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const global = await fetcher<APIResponse<"api::global.global">>(
    "/api/global",
    {
      fields: ["siteName"],
    }
  );

  const title = `All articles | ${global.data.attributes.siteName}`;
  const description = `View all the blog post from ${global.data.attributes.siteName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: global.data.attributes.siteName,
    },
    metadataBase: new URL("https://remi.space"),
  };
}
