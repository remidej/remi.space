import type { APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { Slices } from "@/components/Slices";

export async function generateStaticParams() {
  const articles = (await fetcher("/api/articles", {
    fields: ["slug"],
  })) as APIResponseCollection<"api::article.article">;

  return articles.data.map((article) => ({
    slug: article.attributes.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const articles = (await fetcher("/api/articles", {
    filter: {
      slug: params.slug,
    },
    populate: {
      slices: {
        populate: "*",
      },
    },
  })) as APIResponseCollection<"api::article.article">;
  const article = articles.data[0];

  const createdAt = new Date(article.attributes.createdAt!);
  const createdAtString = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-8 container mx-auto text-lg md:text-xl">
      <header>
        <Link
          href="/blog"
          className="uppercase tracking-wide text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blog-700 py-1"
        >
          <FiArrowLeft className="inline-block mr-1 -mt-1" size="1em" />
          All articles
        </Link>
        <h1 className="text-4xl font-semibold leading-tight mt-2 mb-4 text-gray-800 dark:text-gray-200">
          {article.attributes.title}
        </h1>
        <p className="uppercase tracking-wide text-sm font-semibold text-gray-500 dark:text-gray-400">
          {createdAtString}
        </p>
      </header>
      <main>
        <Slices slices={article.attributes.slices} />
      </main>
    </article>
  );
}
