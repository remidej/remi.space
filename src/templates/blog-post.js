import React from 'react'
import { Link, graphql } from 'gatsby'
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
      <article className="mt-6 sm:w-full lg:w-6/12 container mx-auto text-xl">
        <header>
          <h1 className="text-4xl font-bold leading-tight">{post.frontmatter.title}</h1>
          <p className="uppercase tracking-wide text-sm font-semibold text-gray-600 my-2">
            {post.frontmatter.date} • {post.timeToRead} min read
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} className="leading-relaxed" />
        <footer className="my-12">
          <Bio />
        </footer>
      </article>
      <nav className="container mx-auto">
        <ul className="flex flex-row align-baseline justify-between">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
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
