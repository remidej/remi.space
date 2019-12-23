import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Image from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'

const SKEW_DEGREES = -1

const Home = ({ location }) => {
  // Get image
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/remi-hello.png/" }) {
        childImageSharp {
          fixed(width: 350) {
            ...GatsbyImageSharpFixed_tracedSVG
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
        className="text-teal-100 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(44,122,123,1) 0%, rgba(55,135,166,1) 100%)',
          transform: `skewY(${SKEW_DEGREES}deg)`,
          marginTop: '-4.7rem',
        }}
      >
        <div
          className="heroPattern pt-12" // Used in CSS
          style={{ transform: `skewY(${-SKEW_DEGREES}deg)` }}
        >
          <div className="container mx-auto pt-12">
            <div className="flex flex-row justify-between">
              <div className="text-3xl text-teal-100 font-medium flex flex-col justify-center">
                <p>Hello there! Rémi here.</p>
                <h2>I'm a product developer based in Paris.</h2>
              </div>
              <div className="w1/4 flex flex-col items-end">
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={`Rémi says hello`}
                  className
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Writing section */}
      <div className="container mt-4 mx-auto">
        <p>Sometimes I like to write things down.</p>
      </div>
    </Layout>
  )
}

export default Home
