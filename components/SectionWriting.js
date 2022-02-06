import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ArticlePreview from "./ArticlePreview";

const SectionWriting = () => {
  const articles = [];

  return (
    <section className="container mt-12">
      <p className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">
        Blog
      </p>
      {/* Main content */}
      <div className="bg-white rounded-lg relative">
        {articles.map(({ node }) => (
          <ArticlePreview article={node} key={node.fields.slug} />
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-semibold rounded-lg inline-block hover:shadow"
      >
        <a>
          View all articles{" "}
          <FiArrowRight className="inline transform translate-y-1" size="1em" />
        </a>
      </Link>
    </section>
  );
};
export default SectionWriting;
