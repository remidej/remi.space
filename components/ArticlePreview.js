import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

const ArticlePreview = ({ article }) => {
  const { title } = article;
  return (
    <article key={article.fields.slug} className="text-xl mb-8 last:mb-0">
      <header>
        <h4 className="text-2xl font-semibold text-gray-800 leading-tight">
          <Link href="/blog/slug" className="hover:underline">
            <a>{title}</a>
          </Link>
        </h4>
      </header>
      <section className="text-gray-600 text-lg mt-2 mb-1">
        <p
          dangerouslySetInnerHTML={{
            __html: article.frontmatter.description || article.excerpt,
          }}
        />
      </section>
      <Link
        href="/blog/slug"
        className="hover:text-black text-lg text-gray-700"
      >
        <a>
          Read{" "}
          <FiArrowRight className="inline transform translate-y-1" size="1em" />
        </a>
      </Link>
    </article>
  );
};

export default ArticlePreview;
