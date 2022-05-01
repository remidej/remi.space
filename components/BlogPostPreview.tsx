import { Post } from "contentlayer/generated";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";

interface Props {
  post: Post;
}

const BlogPostPreview: React.FC<Props> = ({ post }) => {
  return (
    <article className="text-xl mb-8 last:mb-0">
      <header>
        <h4 className="text-2xl font-semibold text-neutral-800 leading-tight">
          <Link href={post.url}>
            <a className="hover:underline">{post.title}</a>
          </Link>
        </h4>
      </header>
      <section className="text-neutral-600 text-lg mt-2 mb-1">
        <p>{post.description}</p>
      </section>
      <Link href={post.url}>
        <a className="hover:text-black text-lg text-neutral-700">
          Read <FiArrowRight className="inline" size="1em" />
        </a>
      </Link>
    </article>
  );
};

export default BlogPostPreview;
