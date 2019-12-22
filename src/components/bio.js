import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
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

  const { author, social } = data.site.siteMetadata
  return (
    <div className="flex flex-row items-center">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        className="rounded-full shadow-inner mr-4"
      />
      <p>
        Written by <strong>{author}</strong> who lives and works in San Francisco building useful
        things.
        {` `}
        <a href={`https://twitter.com/${social.twitter}`}>You should follow him on Twitter</a>
      </p>
    </div>
  )
}

export default Bio
