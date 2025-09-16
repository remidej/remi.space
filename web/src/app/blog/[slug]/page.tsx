import { getClient } from "@/utils/cms";
import Link from "next/link";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import { Slices } from "@/components/Slices";
import { type Metadata } from "next";
import { draftMode } from "next/headers";
import { url } from "@/utils/url";

export async function generateStaticParams() {
  const articles = await getClient()
    .collection("articles")
    .find({
      fields: ["slug"],
      pagination: {
        page: 1,
        pageSize: 99,
      },
    });

  return articles.data.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const [articles, global] = await Promise.all([
    getClient()
      .collection("articles")
      .find({
        filters: {
          slug: params.slug,
        },
        populate: {
          slices: {
            populate: "*",
          },
        },
        status: draftMode().isEnabled ? "draft" : "published",
      }),
    getClient()
      .single("global")
      .find({
        fields: ["email"],
      }),
  ]);

  const article = articles.data[0];
  const publishedAt = new Date(article.publishedAt);
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
          {article.title}
        </h1>
        <p className="uppercase tracking-wide text-sm font-semibold text-gray-500 dark:text-gray-400">
          {publishedAtString}
        </p>
      </header>
      <main>
        <Slices slices={article.slices} />
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
            global.data.email
          )}?subject=Reply to "${encodeURIComponent(article.title)}"`}
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
    getClient()
      .collection("articles")
      .find({
        filters: {
          slug: params.slug,
        },
        populate: ["image"],
        status: draftMode().isEnabled ? "draft" : "published",
      }),
    getClient()
      .single("global")
      .find({
        fields: ["siteName"],
      }),
  ]);

  const article = articles.data[0];
  const title = `${article.title} | ${global.data.siteName}`;
  const description = article.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: global.data.siteName,
      ...(article.image && {
        images: [article.image.url],
      }),
    },
    metadataBase: new URL(url),
  };
}
