import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Header from "../components/Header";
import SectionBlog from "../components/SectionBlog";
import SectionWork from "../components/SectionWork";
import { allPosts } from "contentlayer/generated";

const IndexPage = ({ posts }) => {
  return (
    <Layout>
      <Seo title="Personal blog" />
      <Header />
      <main>
        <SectionBlog posts={posts} />
        <SectionWork />
      </main>
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      posts: allPosts,
    },
  };
}

export default IndexPage;
