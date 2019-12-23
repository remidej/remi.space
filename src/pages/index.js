import React from 'react'
import { Link, graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const siteDescription = data.site.siteMetadata.description

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SEO title="Rémi de Juvigny" />
      <Bio />
      <h1>This is my site</h1>
      <h2>
        <Link to="/blog">Articles</Link>
      </h2>
      <h2>
        <Link to="/folio">Portfolio</Link>
      </h2>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
