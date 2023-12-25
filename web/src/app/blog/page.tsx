import { ArticlePreview } from "@/components/ArticlePreview";
import type { APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";

export default async function BlogPage() {
  const articles = (await fetcher("/api/articles", {
    fields: ["title", "description", "slug"],
    pagination: {
      page: 1,
      pageSize: 40,
    },
  })) as APIResponseCollection<"api::article.article">;

  return (
    <div className="container">
      <h1 className="font-bold text-3xl font-semibold text-gray-800 dark:text-gray-300 mt-6">
        All blog posts
      </h1>
      {articles.data.length === 0 && <p className="mt-8">No articles found</p>}
      <section className="flex-1 mt-8">
        {articles.data.map((article) => (
          <ArticlePreview article={article} key={article.id} />
        ))}
      </section>
    </div>
  );
}
