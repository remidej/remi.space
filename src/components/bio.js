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

  const { author } = data.site.siteMetadata
  return (
    <div className="flex flex-row items-center">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        className="rounded-full mr-4 flex-shrink-0"
      />
      <p>
        Hi! I'm <strong className="font-medium">{author}</strong>, author of this blog.
      </p>
    </div>
  )
}

export default Bio
