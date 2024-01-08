import * as React from "react";
import { ArticlePreview } from "@/components/ArticlePreview";
import type { APIResponse, APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { URLSearchParams } from "url";
import { type Metadata } from "next";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const articles = await fetcher<APIResponseCollection<"api::article.article">>(
    "/api/articles",
    {
      fields: ["title", "description", "slug"],
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
        pageSize: 99,
      },
    }
  );

  return (
    <div className="container py-8">
      <h1 className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">
        All blog posts
      </h1>
      <section className="flex-1 flex flex-col gap-8">
        {articles.data.map((article) => (
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
    metadataBase: new URL(process.env.VERCEL_URL!),
  };
}
