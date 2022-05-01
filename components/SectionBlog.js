import React from "react";
import ArticlePreview from "./ArticlePreview";
import ButtonLink from "./ButtonLink";
import { allPosts } from "contentlayer/generated";

const SectionBlog = ({ posts }) => {
  const articles = [];

  console.log("section blog", posts);

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
      <ButtonLink
        href="/blog"
        text="View all articles"
        title="Blog"
        color="blog"
      />
    </section>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: allPosts,
    },
  };
}

export default SectionBlog;
