import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Header from "../components/Header";
import SectionBlog from "../components/SectionBlog";
import SectionWork from "../components/SectionWork";

const IndexPage = () => {
  return (
    <Layout>
      <Seo title="Personal blog" />
      <Header />
      <main>
        <SectionBlog />
        <SectionWork />
      </main>
    </Layout>
  );
};

export default IndexPage;
