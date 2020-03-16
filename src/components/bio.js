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
    <div className="flex flex-row items-start">
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        className="rounded-full mr-4 flex-shrink-0"
      />
      <p>
        Hi! I'm <strong className="font-semibold">{author}</strong>, author of this blog. I'm a
        Product Developer from France. I write about the open web, and how to make it better using
        tools like JavaScript, GraphQL and React.
      </p>
    </div>
  )
}

export default Bio
