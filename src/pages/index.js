import React from 'react'
import Image from 'gatsby-image'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import Layout from '../components/layout'
import SEO from '../components/seo'
import arrow from '../../content/assets/down-right-arrow.svg'

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
      <header className="bg-blue-100 overflow-hiddenpt-20">
        <div className="container mx-auto">
          <div className="flex flex-row justify-between py-12">
            <div>
              <Image
                fixed={data.avatar.childImageSharp.fixed}
                alt={`Rémi says hello`}
                className="rounded-full w-12"
              />
              <div className="flex flex-row">
                <img src={arrow} alt="Arrow" className="ml-8 w-16 -translate-y-" />
                <h1>
                  <span className="font-black text-6xl block">Rémi</span>
                  <span className="text-right text-3xl block -mt-6">de Juvigny</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Writing section */}
      <section className="container mx-auto items-baseline mt-12">
        <p className="uppercase tracking-wide text-blog-500 font-semibold">Blog</p>
        <Link
          to="/blog"
          className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-medium rounded-lg inline-block hover:shadow"
        >
          View all articles <FiArrowRight className="inline" size="1em" />
        </Link>
        {/* Main content */}
        <div className="w-8/12 bg-white rounded-lg relative">
          {articles.map(({ node }) => showArticlePreview(node))}
        </div>
      </section>
    </Layout>
  )
}

export default Home
