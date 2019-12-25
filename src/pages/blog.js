import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArticlePreview from '../components/article-preview'

const BlogIndex = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            excerpt
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
      <SEO title="All posts" />
      <div className="container mx-auto sm:w-full lg:w-6/12 mt-6">
        {articles.map(({ node }) => (
          <ArticlePreview article={node} key={node.fields.slug} />
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex
