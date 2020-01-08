import React from 'react'
import { Link, graphql } from 'gatsby'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article className="mt-6 sm:w-full lg:w-6/12 max-w-3xl container mx-auto text-xl">
        <header>
          <Link
            to="/blog"
            className="uppercase tracking-wide tracking-wide text-sm font-semibold text-gray-500 hover:text-blog-500 my-2"
          >
            <FiArrowLeft className="inline-block mr-1 -mt-1" size="1em" />
            All articles
          </Link>
          <h1 className="text-4xl font-bold leading-tight">{post.frontmatter.title}</h1>
          <p className="uppercase tracking-wide tracking-wide text-sm font-semibold text-gray-500 my-2">
            {post.frontmatter.date} • {post.timeToRead} min read
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="leading-relaxed mt-4 article-content"
        />
        <hr className="border-2 border-gray-200 my-10" />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="sm:w-full lg:w-6/12 max-w-3xl container mx-auto mt-10">
        <ul className="flex flex-row align-baseline justify-between text-lg">
          <li className="flex-1 flex flex-row items-start justify-start">
            {previous && (
              <>
                <FiArrowLeft className="flex-shrink-0" />
                <Link className="-mt-1 ml-1" to={previous.fields.slug} rel="prev">
                  {previous.frontmatter.title}
                </Link>
              </>
            )}
          </li>
          <li className="flex-1 flex flex-row items-start justify-end text-right">
            {next && (
              <>
                <Link className="-mt-1 mr-1" to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                </Link>
                <FiArrowRight className="flex-shrink-0" />
              </>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
