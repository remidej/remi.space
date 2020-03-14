import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SocialButtons from '../components/socialButtons'

const showArticlePreview = article => {
  const title = article.frontmatter.title
  return (
    <article key={article.fields.slug} className="text-xl mb-8 last:mb-0">
      <header>
        <h4 className="text-2xl font-semibold text-gray-800">
          <Link to={article.fields.slug} className="hover:underline">
            {title}
          </Link>
        </h4>
      </header>
      <section className="text-gray-600 text-lg">
        <p
          dangerouslySetInnerHTML={{
            __html: article.frontmatter.description || article.excerpt,
          }}
        />
      </section>
      <Link to={article.fields.slug} className="hover:text-black text-lg text-gray-700">
        Read <FiArrowRight className="inline" size="1em" />
      </Link>
    </article>
  )
}

const Home = ({ location }) => {
  // Get image
  const data = useStaticQuery(graphql`
    query {
      # Get social handles
      site {
        siteMetadata {
          social {
            linkedin
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
      <section className="container items-baseline mt-12">
        <p className="uppercase tracking-wide text-blog-500 font-bold mb-6 text-lg">Blog</p>
        {/* Main content */}
        <div className="bg-white rounded-lg relative">
          {articles.map(({ node }) => showArticlePreview(node))}
        </div>
        <Link
          to="/blog"
          className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-semibold rounded-lg inline-block hover:shadow"
        >
          View all articles <FiArrowRight className="inline" size="1em" />
        </Link>
      </section>
    </Layout>
  )
}

export default Home
