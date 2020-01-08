import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'
import Image from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import SideProject from '../components/side-project'

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
      <section className="text-gray-500 text-lg">
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
      # Get the avatar image
      avatar: file(absolutePath: { regex: "/remi-hello.png/" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed
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
      # Get projects from Airtable
      allAirtable(filter: { table: { eq: "Projects" } }) {
        nodes {
          id
          table
          data {
            name
            type
            tools
            date
            slug
            pitch
            link
            repoLink
          }
        }
      }
    }
  `)

  const articles = data.allMarkdownRemark.edges
  const projects = data.allAirtable.nodes

  return (
    <Layout location={location}>
      <SEO title="Rémi de Juvigny" />
      {/* Big colorful header */}
      <header
        className="text-teal-100 overflow-hidden -mt-20"
        style={{
          background: 'linear-gradient(145deg, rgba(44,122,123,1) 0%, rgba(55,135,166,1) 100%)',
          transform: `skewY(${SKEW_DEGREES}deg)`,
        }}
      >
        <div
          className="hero-pattern pt-10" // Used in CSS
          style={{ transform: `skewY(${-SKEW_DEGREES}deg)` }}
        >
          <div className="container mx-auto pt-12">
            <div className="flex flex-row justify-between">
              <div className="text-3xl text-white font-medium flex flex-col justify-center">
                <p>Hello there! Rémi here.</p>
                <h2>I'm a Product Developer from France.</h2>
                <p>I build apps users won't hate, and tell people about it.</p>
              </div>
              <div className="w1/4 flex flex-col items-end">
                <Image fixed={data.avatar.childImageSharp.fixed} alt={`Rémi says hello`} />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Writing section */}
      <section className="container flex flex-row justify-between mx-auto text-gray-800 items-baseline">
        {/* Left text */}
        <div className="w-5/12 mr-12 block" style={{ transform: 'translateY(4rem)' }}>
          <p className="uppercase tracking-wide text-blog-500 font-semibold">Blog</p>
          <h3 className="text-4xl leading-tight font-semibold">
            Sometimes I write down what I learn
          </h3>
          <p className="text-gray-500 mt-4">
            Code is a precious resource. I write about about how to use it efficiently, and how
            avoid using it at all.
          </p>
          <div className="mt-6">
            <Link
              to="/blog"
              className="px-4 py-2 text-blog-800 bg-blog-200 text-lg font-medium rounded-lg inline-block"
            >
              View all articles <FiArrowRight className="inline" size="1em" />
            </Link>
          </div>
        </div>
        {/* Right content */}
        <div className="float-right w-8/12 py-6 px-6 bg-white rounded-lg shadow-lg relative -mt-6">
          {articles.map(({ node }) => showArticlePreview(node))}
        </div>
      </section>
      {/* Work section */}
      <section>TODO: work</section>
    </Layout>
  )
}

export default Home
