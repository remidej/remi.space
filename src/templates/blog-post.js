import React from 'react'
import { Link, graphql } from 'gatsby'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import getShareImage from '@jlengstorf/get-share-image'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  // Generate OG image from Cloudinary
  const socialImage = getShareImage({
    // Config
    cloudName: `remispace`,
    imagePublicID: `blog/og-template`,
    // Content
    title: post.frontmatter.title,
    tagline: post.frontmatter.tags.map(tag => `#${tag}`).join(` `),
    // Layout
    imageWidth: 1280,
    imageHeight: 640,
    textAreaWidth: 812,
    // Title
    titleFont: `InterBold.otf`,
    titleFontSize: 76,
    titleColor: `234E52`,
    titleBottomOffset: 236,
    titleLeftOffset: 342,
    // Tagline
    taglineFont: `InterSemiBold.otf`,
    taglineFontSize: 58,
    taglineColor: `A0AEC0`,
    taglineTopOffset: 426,
    taglineLeftOffset: 342,
  })

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={socialImage}
        type="article"
      />
      <article className="mt-8 container mx-auto text-lg md:text-xl">
        <header>
          <Link
            to="/blog"
            className="uppercase tracking-wide tracking-wide text-sm font-semibold text-gray-500 hover:text-blog-700 py-1"
          >
            <FiArrowLeft className="inline-block mr-1 -mt-1" size="1em" />
            All articles
          </Link>
          <h1 className="text-4xl font-semibold leading-tight mt-2 mb-4 text-gray-800">
            {post.frontmatter.title}
          </h1>
          <p className="uppercase tracking-wide tracking-wide text-sm font-semibold text-gray-500">
            {post.frontmatter.date} • {post.timeToRead} min read
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="leading-relaxed mt-10 article-content"
        />
        <hr className="border-2 border-gray-200 my-12" />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="sm:w-full lg:w-6/12 max-w-3xl container mx-auto mt-12">
        <ul className="flex flex-row align-baseline justify-between text-lg font-semibold text-blog-700 hover:underline">
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
        tags
      }
    }
  }
`
