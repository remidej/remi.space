import React from 'react'
import { colors } from 'tailwindcss/defaultTheme'
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../fonts/fonts.css'
import '../layout.css'

const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
]

const siteLinks = [
  {
    title: 'GitHub',
    link: 'https://github.com/remi2j/remi.space',
  },
  {
    title: 'RSS',
    link: '/rss.xml',
  },
  {
    title: 'Sitemap',
    link: '/sitemap.xml',
  },
]

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPage = location.pathname === rootPath

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

  const { title, description, social } = data.site.siteMetadata

  const contactLinks = [
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
      title: 'GitHub',
      showIcon: () => (
        <>
          <FiGithub />
        </>
      ),
      link: `https://github.com/${social.github}`,
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

  const navbar = (
    <nav className="container mx-auto py-4 flex flex-row justify-between z-10 relative text-gray-700">
      <Link to={`/`} className="hover:text-black">
        <h3 className="inline-block font-bold text-xl">{title}</h3>
        <span className="text-gray-500 text-sm hidden sm:inline"> — {description}</span>
      </Link>
      <ul className="flex flex-row">
        {navLinks.map(_navLink => (
          <li
            key={_navLink.path}
            className={`ml-10 font-medium order-black hover:text-black
              ${
                _navLink.path === location.pathname
                  ? 'border-b-2 text-black'
                  : 'border-b-0 text-gray-600'
              }
            }`}
          >
            <Link to={_navLink.path}>{_navLink.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Top section */}
      <div className="flex-1">
        {!isRootPage && navbar}
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <footer
        className="pt-24 pb-12 mt-12"
        style={{
          background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.gray[200]} 100%)`,
        }}
      >
        <div className="container mx-auto flex flex-row justify-between">
          {/* Contact */}
          <div>
            <nav className="flex flex-row items-center my-2 container mx-auto">
              {contactLinks.map(_footerLink => (
                <a
                  href={_footerLink.link}
                  title={_footerLink.title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:shadow bg-white text-gray-900 mr-2 py-2 px-3 rounded flex flex-row items-center"
                >
                  {_footerLink.showIcon()}
                  <span className="ml-2 inline-block">{_footerLink.title}</span>
                </a>
              ))}
            </nav>
            <p className="text-4xl font-medium text-gray-700">{social.email}</p>
          </div>
          {/* Lists of links */}
          <div className="flex flex-row">
            <div className="mr-20">
              <p className="uppercase tracking-wide font-medium text-gray-500">Navigation</p>
              <ul>
                {navLinks.map(_navLink => (
                  <li className="mt-2">
                    <Link to={_navLink.path}>{_navLink.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mr-20">
              <p className="uppercase tracking-wide font-medium text-gray-500">Site</p>
              <ul>
                {siteLinks.map(_siteLink => (
                  <li className="mt-2">
                    <a href={_siteLink.link} target="_blank" rel="noopener noreferrer">
                      {_siteLink.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
