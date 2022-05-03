import React from "react";
import Link from "next/link";
import { Post } from "contentlayer/generated";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface Props {
  previousPost: Post;
  nextPost: Post;
}

const BlogPostsNavigation: React.FC<Props> = ({ previousPost, nextPost }) => {
  return (
    <nav className="sm:w-full lg:w-6/12 max-w-3xl container mx-auto mt-12">
      <ul className="flex flex-row align-baseline justify-between text-lg font-semibold text-blog-700">
        <li className="flex-1 flex flex-row items-start justify-start">
          {previousPost && (
            <>
              <FiArrowLeft className="flex-shrink-0" />
              <Link href={previousPost.url}>
                <a className="-mt-1 ml-1 hover:underline" rel="prev">
                  {previousPost.title}
                </a>
              </Link>
            </>
          )}
        </li>
        <li className="flex-1 flex flex-row items-start justify-end text-right">
          {nextPost && (
            <>
              <Link href={nextPost.url}>
                <a className="-mt-1 mr-1 hover:underline" rel="next">
                  {nextPost.title}
                </a>
              </Link>
              <FiArrowRight className="flex-shrink-0" />
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default BlogPostsNavigation;
