import type { APIResponseCollection, GetValues } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  slice: GetValues<"slices.blog-section">;
}

export async function ArticlesSlice({ slice }: Props) {
  const articles = (await fetcher("/api/articles", {
    fields: ["title", "description", "slug"],
    pagination: {
      page: 1,
      pageSize: slice.articleCount || 4,
    },
  })) as APIResponseCollection<"api::article.article">;

  return (
    <section className="container py-12">
      <p className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">
        {slice.title}
      </p>
      {/* Main content */}
      <div className="flex flex-col gap-8">
        {articles.data.map((article) => (
          <article className="text-xl" key={article.id}>
            <header>
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white leading-tight">
                <Link
                  href={`/blog/${article.attributes.slug}`}
                  className="hover:underline"
                >
                  {article.attributes.title}
                </Link>
              </h4>
            </header>
            <section className="text-gray-600 dark:text-gray-400 text-lg mt-2 mb-1">
              <p>{article.attributes.description}</p>
            </section>
            <Link
              href={`/blog/${article.attributes.slug}`}
              className="text-lg text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
            >
              Read <FiArrowRight className="inline" size="1em" />
            </Link>
          </article>
        ))}
      </div>
      <Link
        href={slice.link.url}
        className="mt-6 px-4 py-2 text-blog-800 dark:text-blog-100 bg-blog-200 dark:bg-blog-800 text-lg font-semibold rounded-lg inline-block hover:shadow"
      >
        {slice.link.text} <FiArrowRight className="inline" size="1em" />
      </Link>
    </section>
  );
}
