import { Post } from "contentlayer/generated";
import React from "react";
import BlogPostPreview from "./BlogPostPreview";
import ButtonLink from "./ButtonLink";

interface Props {
  posts: Post[];
}

const SectionBlog: React.FC<Props> = ({ posts }) => {
  return (
    <section className="container mt-12">
      <p className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">
        Blog
      </p>
      {/* Main content */}
      <div className="bg-white rounded-lg relative">
        {posts.map((post) => (
          <BlogPostPreview post={post} key={post._id} />
        ))}
      </div>
      <ButtonLink
        href="/blog"
        text="View all posts"
        title="Blog"
        color="blog"
      />
    </section>
  );
};

export default SectionBlog;
