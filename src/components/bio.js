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
        className="rounded-full mr-4 flex-shrink-0"
      />
      <p>
        Hi! I'm <strong>{author}</strong>, author of this blog. I'm a french developer who loves
        building empowering products. You should{' '}
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-teal-200 px-1 rounded-sm"
        >
          follow me on Twitter
        </a>
      </p>
    </div>
  )
}

export default Bio
