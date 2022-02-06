import React from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SocialButtons from "../components/SocialButtons";
import ArticlePreview from "../components/ArticlePreview";
import siteData from "../siteData";
import Header from "../components/Header";
import SectionBlog from "../components/SectionBlog";
import SectionWork from "../components/SectionWork";

const Home = ({ location }) => {
  return (
    <Layout>
      <Seo title="Personal blog" />
      {/* Big colorful header */}
      <Header />
      <main>
        <SectionBlog />
        <SectionWork />
      </main>
    </Layout>
  );
};

export default Home;
