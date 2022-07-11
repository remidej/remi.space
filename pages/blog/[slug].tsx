import React from "react";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import Layout from "components/Layout";
import { allPosts, Post } from "contentlayer/generated";
import { FiArrowLeft } from "react-icons/fi";
import { format, compareDesc } from "date-fns";
import siteData from "siteData";
import BlogPostsNavigation from "components/BlogPostsNavigation";
import Image from "components/Image";
import Seo from "components/Seo";

interface Props {
  matchingPost: Post;
  previousPost: Post;
  nextPost: Post;
}

const BlogPostPage: React.FC<Props> = ({
  matchingPost,
  previousPost,
  nextPost,
}) => {
  const url = `${siteData.siteUrl}/${matchingPost.url}`;
  const socialActions = [
    {
      title: `Discuss on Twitter`,
      url: `https://twitter.com/search?q=${encodeURI(url)}`,
    },
    {
      title: `Discuss on Reddit`,
      url: `https://www.reddit.com/search/?q=url%3A${encodeURI(url)}`,
    },
    {
      title: `Edit on GitHub`,
      url: `https://github.com/${siteData.social.github}/remi.space/edit/master/content/${matchingPost._raw.sourceFilePath}`,
    },
  ];

  const MDXContent = useMDXComponent(matchingPost.body.code);

  return (
    <Layout>
      <Seo title={matchingPost.title} description={matchingPost.description} />
      <article className="mt-8 container mx-auto text-lg md:text-xl">
        <header>
          <Link href="/blog">
            <a className="uppercase tracking-wide text-sm font-semibold text-neutral-400 hover:text-blog-700 py-1">
              <FiArrowLeft className="inline-block mr-1 -mt-1" size="1em" />
              All articles
            </a>
          </Link>
          <h1 className="text-4xl font-semibold leading-tight mt-2 mb-4 text-neutral-800">
            {matchingPost.title}
          </h1>
          <p className="uppercase tracking-wide text-sm font-semibold text-neutral-400">
            {format(new Date(matchingPost.date), "MMMM dd, yyyy")} •{" "}
            {matchingPost.readingTime.text}
          </p>
        </header>
        {/* Article body */}
        <main className="mt-10 article-content">
          <MDXContent components={{ Image }} />
        </main>
        {/* Social media links */}
        <div className="mt-8 space-y-2 space-y-reverse sm:space-y-0">
          {socialActions.map((_action, _index) => (
            <React.Fragment key={_index}>
              {_index > 0 && <br className="sm:hidden" />}
              <a
                href={_action.url}
                title={_action.title}
                className="underline text-blog-700 hover:text-blog-600 sm:inline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {_action.title}
              </a>
              {/* Add dot on desktop after all items except the last */}
              {_index < socialActions.length - 1 && (
                <span className="hidden sm:inline">
                  {` `}•{` `}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Footer bio */}
        <hr className="border-2 border-neutral-200 my-12" />
        <footer>
          <p>todo:bio</p>
        </footer>
      </article>
      <BlogPostsNavigation previousPost={previousPost} nextPost={nextPost} />
    </Layout>
  );
  return <p>Article: {matchingPost.title}</p>;
};

export async function getStaticPaths() {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const sortedPosts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  // Find matching post based on slug
  let matchingPost;
  let previousPost = null;
  let nextPost = null;
  sortedPosts.forEach((_post, index) => {
    const isMatchingPost = _post._raw.flattenedPath === params.slug;
    if (isMatchingPost) {
      matchingPost = _post;
      if (index > 0) {
        previousPost = sortedPosts[index - 1];
      }
      if (index < sortedPosts.length - 1) {
        nextPost = sortedPosts[index + 1];
      }
    }
  });

  return {
    props: {
      matchingPost,
      previousPost,
      nextPost,
    },
  };
}

export default BlogPostPage;
