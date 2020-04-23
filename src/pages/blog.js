import React, { useState, useMemo } from 'react'
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
              tags
              description
            }
          }
        }
      }
    }
  `)

  // Filter articles based on search field
  const articles = data.allMarkdownRemark.edges
  const [search, setSearch] = useState(``)
  const [selectedTags, setSelectedTags] = useState([])
  const filteredArticles = useMemo(() => {
    return articles.filter(_article => {
      // Either filter by search term
      if (search.length > 0) {
        const matchesSearch = _article.node.frontmatter.title
          .toLowerCase()
          .includes(search.toLowerCase())
        console.log({ matchesSearch })
        return matchesSearch
      }

      // Or filter by selected tag
      if (selectedTags.length > 0) {
        const matchesTags = _article.node.frontmatter.tags.some(_tag => selectedTags.includes(_tag))
        console.log(_article.node.frontmatter.title, { matchesTags })
        return matchesTags
      }

      // Show everything by default
      return true
    })
  }, [articles, search, selectedTags])

  const sortedTags = articles
    .flatMap(_article => _article.node.frontmatter.tags)
    .reduce((currentTags, _tag) => {
      // Check if the tag is already in the list
      const existingIndex = currentTags.findIndex(_currentTag => _currentTag.name === _tag)
      // If it already exists, increment variable count
      if (existingIndex >= 0) {
        currentTags[existingIndex].count += 1
        return currentTags
      }
      // If it's new, add it to the tags list
      return [...currentTags, { name: _tag, count: 1 }]
    }, [])
    .sort((_tagA, _tagB) => _tagB.count > _tagA.count)

  const toggleTag = tagName => {
    // Reset search by title
    setSearch(``)
    // Check if tag is already selected
    if (selectedTags.includes(tagName)) {
      // Remove from selection
      setSelectedTags(previousTags => previousTags.filter(_tag => _tag !== tagName))
    } else {
      // Add to selection
      setSelectedTags(previousTags => [...previousTags, tagName])
    }
  }

  const handleUpdateSearch = e => {
    // Reset tags
    setSelectedTags([])
    // Update search
    setSearch(e.target.value)
  }

  return (
    <Layout location={location}>
      <SEO title="All articles" />
      <div className="container">
        <h1 className="font-bold text-3xl font-semibold text-gray-800 mt-6">All blog posts</h1>
        {/* Filter */}
        <section className="mt-8 pb-2 border-blog-500 border-l-4 pl-4">
          <p className="uppercase tracking-wide text-blog-500 font-bold text-lg">
            Filter ({filteredArticles.length})
          </p>
          {/* Actual search */}
          <label className="block w-full md:w-1/2 mt-2">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={handleUpdateSearch}
              placeholder="Article name..."
              className="block px-3 placeholder-gray-600 py-2 bg-gray-100 rounded-md border-2 border-gray-200 text-lg w-full focus:border-gray-300"
            />
          </label>
          {/* Tags */}
          <div className="mt-2 space-x-2 -ml-2 space-y-2">
            {sortedTags.map((_tag, _index) => (
              <button
                key={_tag.name}
                onClick={() => toggleTag(_tag.name)}
                className={`px-2 py-1 text-blog-700 font-semibold rounded-sm ${
                  selectedTags.includes(_tag.name) ? `bg-blog-200` : `bg-blog-100`
                } ${_index === 0 ? `ml-2` : ``}`}
              >
                #{_tag.name}
              </button>
            ))}
          </div>
        </section>
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
