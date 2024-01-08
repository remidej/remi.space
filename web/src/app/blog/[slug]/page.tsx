import type { APIResponse, APIResponseCollection } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { Slices } from "@/components/Slices";
import { type Metadata } from "next";

export async function generateStaticParams() {
  const articles = await fetcher<APIResponseCollection<"api::article.article">>(
    "/api/articles",
    {
      fields: ["slug"],
      pagination: {
        page: 1,
        pageSize: 99,
      },
    }
  );

  return articles.data.map((article) => ({
    slug: article.attributes.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const [articles, global] = await Promise.all([
    fetcher<APIResponseCollection<"api::article.article">>("/api/articles", {
      filters: {
        slug: params.slug,
      },
      populate: {
        slices: {
          populate: "*",
        },
      },
    }),
    fetcher<APIResponse<"api::global.global">>("/api/global", {
      fields: ["email"],
    }),
  ]);

  const article = articles.data[0];
  const publishedAt = new Date(article.attributes.publishedAt!);
  const publishedAtString = publishedAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="py-8 container mx-auto text-lg md:text-xl">
      <header>
        <Link
          href="/blog"
          className="uppercase tracking-wide text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white py-1"
        >
          <FiArrowLeft className="inline-block mr-1 -mt-1" size="1em" />
          All articles
        </Link>
        <h1 className="text-4xl font-semibold leading-tight mt-2 mb-4 text-gray-800 dark:text-gray-200">
          {article.attributes.title}
        </h1>
        <p className="uppercase tracking-wide text-sm font-semibold text-gray-500 dark:text-gray-400">
          {publishedAtString}
        </p>
      </header>
      <main>
        <Slices slices={article.attributes.slices} />
      </main>
      <footer className="mt-8 py-8 border-t-4 border-gray-200 dark:border-gray-700 decoration-wavy">
        <p>
          Hey, I&apos;m Rémi, author of this blog. If you liked this post,
          don&apos;t hesitate to reply, or to{" "}
          <Link
            href="/blog"
            className="underline text-blog-700 dark:text-blog-100"
          >
            check out my other articles
          </Link>
          .
        </p>
        <a
          href={`mailto:${encodeURIComponent(
            global.data.attributes.email
          )}?subject=Reply to "${encodeURIComponent(
            article.attributes.title
          )}"`}
          className="mt-6 px-4 py-2 text-blog-800 dark:text-blog-100 bg-blog-200 dark:bg-blog-800 text-lg font-semibold rounded-lg inline-block hover:shadow"
        >
          Reply by email <FiMail className="inline -mt-[2px] ml-1" size="1em" />
        </a>
      </footer>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const [articles, global] = await Promise.all([
    await fetcher<APIResponseCollection<"api::article.article">>(
      "/api/articles",
      {
        filters: {
          slug: params.slug,
        },
        populate: ["image"],
      }
    ),
    await fetcher<APIResponse<"api::global.global">>("/api/global", {
      fields: ["siteName"],
    }),
  ]);

  const article = articles.data[0];
  const title = `${article.attributes.title} | ${global.data.attributes.siteName}`;
  const description = article.attributes.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: global.data.attributes.siteName,
      ...(article.attributes.image && {
        images: [(article.attributes.image as any).data.attributes.url],
      }),
    },
    metadataBase: new URL(process.env.VERCEL_URL!),
  };
}
