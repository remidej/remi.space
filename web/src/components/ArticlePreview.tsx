import type { APIResponseData } from "@/types/types";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  article: APIResponseData<"api::article.article">;
}

export function ArticlePreview({ article }: Props) {
  return (
    <article className="text-xl">
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
  );
}
