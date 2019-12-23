import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import Bio from '../components/bio'
import Layout from '../components/layout'
import SEO from '../components/seo'

const Home = ({ location }) => {
  // Get image
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/remi-hello.png/" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  return (
    <Layout location={location}>
      <SEO title="Rémi de Juvigny" />
      <header
        className="text-teal-100"
        style={{
          background: 'linear-gradient(145deg, rgba(44,122,123,1) 0%, rgba(55,135,166,1) 100%)',
          marginTop: '-62px',
        }}
      >
        <div className="container mx-auto pt-12">
          <div className="flex flex-row justify-between">
            <div className="text-3xl text-teal-100 font-medium flex flex-col justify-center">
              <p>Hello there! Rémi here.</p>
              <p>I'm a product developer based in Paris.</p>
            </div>
            <div className="w1/4">
              <Image fixed={data.avatar.childImageSharp.fixed} alt={`Rémi says hello`} className />
            </div>
          </div>
        </div>
      </header>
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
