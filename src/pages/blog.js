import React, { useState } from 'react'
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

  // Filter articles based on search field
  const articles = data.allMarkdownRemark.edges
  const [search, setSearch] = useState('')
  const filteredArticles = articles.filter(_article =>
    _article.node.frontmatter.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout location={location}>
      <SEO title="All articles" />
      <div className="container">
        <h1 className="font-bold text-3xl font-semibold text-gray-800 mt-6">All blog posts</h1>
        {/* Search bar */}
        <div className="flex flex-row mt-8 justify-start items-end">
          {/* Actual search */}
          <label className="block w-full md:w-1/2">
            Filter
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Article name..."
              className="block px-3 placeholder-gray-600 py-2 bg-gray-100 rounded-md border-2 border-gray-200 text-lg w-full"
            />
          </label>
          {/* Results count */}
          <span className="inline-block ml-4 w-10 h-10 mb-1 bg-blog-200 text-blog-900 flex justify-center items-center rounded-full">
            {filteredArticles.length}
          </span>
        </div>
        {filteredArticles.length === 0 && <p className="mt-8">No articles found</p>}
        <section className="flex-1 mt-8">
          {filteredArticles.map(({ node }) => (
            <ArticlePreview article={node} key={node.fields.slug} />
          ))}
        </section>
      </div>
    </Layout>
  )
}

export default BlogIndex
