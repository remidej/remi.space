import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
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
      <SEO title="All my articles" />
      <div className="container mt-6 mx-auto flex flex-row items-baseline relative">
        <h1 className="font-bold text-4xl font-medium w-1/3 top-0 sticky">
          All my <span className="text-purple-500">articles</span>
        </h1>
        <section className="flex-1">
          {articles.map(({ node }) => (
            <ArticlePreview article={node} key={node.fields.slug} />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default BlogIndex
