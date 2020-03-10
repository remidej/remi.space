import React from 'react'
import Image from 'gatsby-image'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import { colors } from 'tailwindcss/defaultTheme'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { hexToRgba } from '../utils/colors'

const SKEW_DEGREES = -1

const showArticlePreview = article => {
  const title = article.frontmatter.title
  return (
    <article key={article.fields.slug} className="text-xl mb-8 last:mb-0">
      <header>
        <h4 className="text-2xl font-medium hover:text-blog-700">
          <Link to={article.fields.slug}>{title}</Link>
        </h4>
      </header>
      <section className="text-gray-600 text-lg">
        <p
          dangerouslySetInnerHTML={{
            __html: article.frontmatter.description || article.excerpt,
          }}
        />
      </section>
      <Link to={article.fields.slug} className="hover:text-blog-700 text-lg text-gray-700">
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
      <header className="max-w-screen-md mx-auto py-6">
        <div className="flex flex-row justify-between">
          {/* Name as a logo */}
          <h1
            className="z-10 font-bold w-56 h-56 flex-shrink-0 rounded-full px-6 flex flex-col justify-center"
            style={{ background: hexToRgba(colors.teal['400'], 0.33) }}
          >
            <span className="font-bold text-6xl -mt-2">Rémi</span>
            <span className="block text-right text-3xl tracking-tight -mt-6">de Juvigny</span>
          </h1>
          {/* Bio */}
          <section
            className="text-xl font-semibold mt-6 -ml-24 pl-32 flex flex-col justify-center"
            style={{ background: hexToRgba(colors.purple['400'], 0.33) }}
          >
            <p>I'm a product developer from France.</p>
            <p>I use modern web technologies to build apps that users won't hate.</p>
            <p>
              I write about things that matter to me, like web development, SOMETHING and the open
              web
            </p>
          </section>
        </div>
      </header>
      {/* Writing section */}
      <section className="max-w-screen-lg mx-auto items-baseline mt-12">
        <p className="uppercase tracking-wide text-blog-500 font-semibold">Blog</p>
        {/* Main content */}
        <div className="w-8/12 bg-white rounded-lg relative">
          {articles.map(({ node }) => showArticlePreview(node))}
        </div>
        <Link
          to="/blog"
          className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-medium rounded-lg inline-block hover:shadow"
        >
          View all articles <FiArrowRight className="inline" size="1em" />
        </Link>
      </section>
    </Layout>
  )
}

export default Home
