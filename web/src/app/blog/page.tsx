import * as React from "react";
import { ArticlePreview } from "@/components/ArticlePreview";
import { getClient } from "@/utils/cms";
import { URLSearchParams } from "url";
import { type Metadata } from "next";
import { url } from "@/utils/url";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const articles = await getClient().collection("articles").find({
    fields: ["title", "description", "slug"],
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 99,
    },
  });

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
  const global = await getClient().single("global").find({
    fields: ["siteName"],
  });

  const title = `All articles | ${global.data.siteName}`;
  const description = `View all the blog post from ${global.data.siteName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: global.data.siteName,
    },
    metadataBase: new URL(url),
  };
}
