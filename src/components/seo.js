import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { useLocation } from '@reach/router'

function SEO({ description, lang, meta, title, image, type }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            defaultOpenGraphImage
          }
        }
      }
    `
  )
  const { pathname } = useLocation()

  const metaDescription = description || site.siteMetadata.description
  const ogImage = image || site.siteMetadata.defaultOpenGraphImage
  const { siteUrl } = site.siteMetadata

  const fullTitle = `${title} | ${site.siteMetadata.title}`
  const fullUrl = `${siteUrl}${pathname}`
  const finalType = type || `website`

  // Always wear a Helmet
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `og:url`,
          content: fullUrl,
        },
        {
          property: `og:title`,
          content: fullTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          name: `og:image`,
          content: `${siteUrl}${ogImage}`,
        },
        {
          property: `og:type`,
          content: finalType,
        },
        {
          property: `og:url`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:image`,
          content: `${siteUrl}${ogImage}`,
        },
        {
          name: `twitter:title`,
          content: fullTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
