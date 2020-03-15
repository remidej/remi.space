import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import {
  FiArrowRight,
  FiArrowDown,
  FiArrowDownCircle,
  FiCheckCircle,
  FiArrowLeft,
} from 'react-icons/fi'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocialButtons from '../components/socialButtons'
import ArticlePreview from '../components/article-preview'

const Home = ({ location }) => {
  // Get image
  const data = useStaticQuery(graphql`
    query {
      # Get social handles
      site {
        siteMetadata {
          social {
            email
          }
        }
      }
      # Get the avatar image
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 90) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
      # Get last posts preview
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 4) {
        edges {
          node {
            fields {
              slug
            }
            timeToRead
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `)

  const articles = data.allMarkdownRemark.edges

  return (
    <Layout location={location}>
      <SEO title="Rémi de Juvigny" />
      {/* Big colorful header */}
      <header className="py-6 bg-gray-100">
        <div className="container">
          {/* Name link */}
          <Link to="/" className="inline-flex flex-row items-center">
            <div className="w-16 h-16 bg-teal-200 rounded-full"></div>
            <h1 className="font-bold -ml-10 text-3xl text-gray-800 hover:text-black">
              Rémi de Juvigny
            </h1>
          </Link>
          {/* Bio */}
          <section className="text-2xl text-gray-700 mt-6 flex flex-col justify-center">
            <h2 className="inline">
              I'm a Product Developer from France. I study computer science, design and product
              management at Hetic in Paris.
            </h2>
            <p className="mt-2">
              I write about the open web, and how to make it better using tools like JavaScript,
              GraphQL and React.
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
        <p className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">Blog</p>
        {/* Main content */}
        <div className="bg-white rounded-lg relative">
          {articles.map(({ node }) => (
            <ArticlePreview article={node} key={node.fields.slug} />
          ))}
        </div>
        <Link
          to="/blog"
          className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-semibold rounded-lg inline-block hover:shadow"
        >
          View all articles <FiArrowRight className="inline" size="1em" />
        </Link>
      </section>
      {/* Work section */}
      <section className="container mt-24">
        <p className="uppercase tracking-wide text-work-500 font-bold mb-6 text-lg">Work</p>
        {/* Text content */}
        <div className="text-xl text-gray-900 mt-6 leading-relaxed">
          <p>
            I'm a 4th year student at Hetic, who spends his time playing soccer, browsing memes and
            being a boyscout leader.
          </p>
          <p className="mt-4">
            In 2019, I co-founded and sold Revolt Influence, a platform that helps brands build a
            presence and a community online.
          </p>
          <p className="mt-4">
            In 2018, I worked at MadKudu, a Silicon Valley-based startup who makes predictive
            analytics software
          </p>
          <p className="mt-4">
            I'm now looking for my 2020 challenge. As I'm wrapping up my studies, I'll be doing one
            more internship from June to December. So if your company:
          </p>
          <ul className="mt-4">
            <li>
              <FiCheckCircle className="inline text-green-500" /> is a large and growing startup
            </li>
            <li>
              <FiCheckCircle className="inline text-green-500" /> has a strong engineering culture
            </li>
            <li>
              <FiCheckCircle className="inline text-green-500" /> is located anywhere around the
              world, and can help with relocation
            </li>
          </ul>
          <p className="mt-4">Then I would love to have a chat with you!</p>
        </div>
        <a
          href={`mailto:${data.site.siteMetadata.social.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 px-4 py-2 text-blog-800 bg-work-200 text-lg font-semibold rounded-lg inline-block hover:shadow"
        >
          Send me an email <FiArrowLeft className="inline" size="1em" />
        </a>
      </section>
    </Layout>
  )
}

export default Home
