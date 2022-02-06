import React from "react";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import SocialButtons from "../components/SocialButtons";
import ArticlePreview from "../components/ArticlePreview";
import siteData from "../siteData";

const Home = ({ location }) => {
  const articles = [];

  return (
    <Layout>
      <Seo title="Personal blog" />
      {/* Big colorful header */}
      <header className="py-6 bg-gray-100">
        <div className="container">
          {/* Name link */}
          <Link href="/" className="inline-flex flex-row items-center">
            <a>
              <div className="w-16 h-16 bg-teal-200 rounded-full"></div>
              <h1 className="font-bold -ml-10 text-3xl text-gray-800 hover:text-black">
                Rémi de Juvigny
              </h1>
            </a>
          </Link>
          {/* Bio */}
          <section className="text-2xl text-gray-700 mt-6 flex flex-col justify-center">
            <h2 className="inline">
              I'm a Product Developer from France. I study computer science,
              design and product management at Hetic in Paris.
            </h2>
            <p className="mt-2">
              I write about the open web, and how to make it better using tools
              like JavaScript, GraphQL and React.
            </p>
          </section>
          {/* Social buttons */}
          <div className="mt-6">
            <SocialButtons />
          </div>
        </div>
      </header>
      {/* Writing section */}
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
            <FiArrowRight
              className="inline transform translate-y-1"
              size="1em"
            />
          </a>
        </Link>
      </section>
      {/* Work section */}
      <section className="container mt-24">
        <p className="uppercase tracking-wide text-work-500 font-bold mb-6 text-lg">
          Work
        </p>
        {/* Text content */}
        <div className="text-xl text-gray-900 mt-6 leading-relaxed">
          <p>I'm a 4th year student at Hetic, where I'll graduate in 2021.</p>
          <p className="mt-4">
            In 2018, I worked at{` `}
            <a
              href="https://www.madkudu.com/"
              alt="MadKudu"
              className="underline text-work-700 hover:text-work-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              MadKudu
            </a>
            , a Silicon-Valley-based startup who makes predictive analytics
            software.
          </p>
          <p className="mt-4">
            In 2019, I co-founded and sold{` `}
            <a
              href="https://revoltgaming.co/"
              alt="Revolt Influence"
              className="underline text-work-700 hover:text-work-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Revolt Influence
            </a>
            , a platform that helps brands build a presence and a community
            online.
          </p>
          <p className="mt-4">
            I'm now looking for my next challenge. As I'm wrapping up my
            studies, I'll be doing an internship from June to December 2020. So
            if your company:
          </p>
          <ul className="mt-4">
            <li>
              <FiCheckCircle className="inline text-work-500 transform translate-y-1" />{" "}
              is a fast-growing startup
            </li>
            <li>
              <FiCheckCircle className="inline text-work-500 transform translate-y-1" />{" "}
              has a strong engineering culture
            </li>
            <li>
              <FiCheckCircle className="inline text-work-500 transform translate-y-1" />{" "}
              is located in Europe, and can help with relocation
            </li>
          </ul>
          <p className="mt-4">Then I would love to have a chat with you 👋</p>
        </div>
        <div className="flex flex-row">
          <a
            href={`/Resume-Remi-de-Juvigny.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-4 py-2 text-blog-800 bg-work-200 text-lg font-semibold rounded-lg inline-block hover:shadow"
          >
            View my resume{" "}
            <FiArrowRight
              className="inline transform translate-y-1"
              size="1em"
            />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
