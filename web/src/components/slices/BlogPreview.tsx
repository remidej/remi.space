import { getClient } from "@/utils/cms";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { ArticlePreview } from "../ArticlePreview";

interface Props {
  slice: any;
}

export async function BlogPreview({ slice }: Props) {
  const articles = await getClient().collection("articles").find({
    fields: ["title", "description", "slug"],
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: slice.articleCount || 4,
    },
  });

  return (
    <section className="container py-12">
      <p className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">
        {slice.title}
      </p>
      {/* Main content */}
      <div className="flex flex-col gap-8">
        {articles.data.map((article) => (
          <ArticlePreview article={article} key={article.id} />
        ))}
      </div>
      <Link
        href={slice.link.url}
        className="mt-6 px-4 py-2 text-blog-800 dark:text-blog-100 bg-blog-200 dark:bg-blog-800 text-lg font-semibold rounded-lg inline-block hover:shadow"
      >
        {slice.link.text}{" "}
        <FiArrowRight className="inline -mt-[2px] ml-1" size="1em" />
      </Link>
    </section>
  );
}
