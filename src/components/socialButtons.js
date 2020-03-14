import React from 'react'
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'
import { useStaticQuery, graphql } from 'gatsby'

const SocialButtons = ({ small }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          social {
            twitter
            linkedin
            github
            email
          }
        }
      }
    }
  `)
  const { social } = data.site.siteMetadata

  const socialLinks = [
    {
      title: 'GitHub',
      showIcon: () => (
        <>
          <FiGithub />
        </>
      ),
      link: `https://github.com/${social.github}`,
    },
    {
      title: 'Twitter',
      showIcon: () => (
        <>
          <FiTwitter />
        </>
      ),
      link: social.twitter,
    },
    {
      title: 'LinkedIn',
      showIcon: () => (
        <>
          <FiLinkedin />
        </>
      ),
      link: `https://www.linkedin.com/in/${social.linkedin}`,
    },
  ]

  return (
    <div className="flex flex-row">
      {socialLinks.map(_socialLink => (
        <a
          href={_socialLink.link}
          title={_socialLink.title}
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:shadow ${
            small ? '' : 'shadow-sm'
          } bg-white text-gray-900 mr-2 py-2 px-3 rounded flex flex-row items-center`}
        >
          {_socialLink.showIcon()}
          {!small && <span className="ml-2 inline-block">{_socialLink.title}</span>}
        </a>
      ))}
    </div>
  )
}

SocialButtons.defaultProps = {
  small: false,
}

export default SocialButtons
