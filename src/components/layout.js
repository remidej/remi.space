import React from 'react'
import { FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi'
import { Link, useStaticQuery, graphql } from 'gatsby'
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
      link: `https://www.linkedin.com/in/${social.linkedin}`,
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
    <nav
      className={`container mx-auto py-4 flex flex-row justify-between z-10 relative ${
        isRootPage ? 'text-teal-100' : 'text-gray-700'
      }`}
    >
      <Link to={`/`} className={isRootPage ? 'hover:text-white' : 'hover:text-black'}>
        {isRootPage ? (
          // Site title is the main heading on homepage
          <h1 className="inline-block font-bold text-xl">{title}</h1>
        ) : (
          // Site title is a secondary heading on other pages
          <h3 className="inline-block font-bold text-xl">{title}</h3>
        )}
        {!isRootPage && (
          <span className="text-gray-500 text-sm hidden sm:inline"> — {description}</span>
        )}
      </Link>
      <ul className="flex flex-row">
        {navLinks.map(_navLink => (
          <li
            key={_navLink.path}
            className={`ml-10 font-medium ${
              isRootPage ? 'border-white hover:text-white' : 'border-black hover:text-black'
            } ${
              _navLink.path === location.pathname
                ? 'border-b-2 text-black'
                : 'border-b-0 text-gray-600'
            } ${isRootPage && _navLink.path === location.pathname ? 'text-white' : ''}${
              isRootPage && _navLink.path !== location.pathname ? 'text-teal-100' : ''
            }`}
          >
            <Link to={_navLink.path}>{_navLink.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      {/* Top section */}
      <div className="flex-1">
        {navbar}
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <footer
        className="pt-24 pb-12"
        style={{
          background: `linear-gradient(0deg, #E2E8F0 0%, #F7FAFC 100%)`,
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
                  className="bg-gray-100 text-gray-900 mr-2 py-2 px-3 rounded flex flex-row items-center"
                >
                  {_footerLink.showIcon()}
                  <span className="ml-2 inline-block">{_footerLink.title}</span>
                </a>
              ))}
            </nav>
            <p className="text-4xl font-medium text-gray-600">{social.email}</p>
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
                    <a href={_siteLink.path} target="_blank" rel="noopener noreferrer">
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
