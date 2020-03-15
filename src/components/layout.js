import React from 'react'
import { colors } from 'tailwindcss/defaultTheme'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../fonts/fonts.css'
import '../layout.css'
import SocialButtons from './socialButtons'

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

  const { title, social } = data.site.siteMetadata

  const navbar = (
    <nav className="container mx-auto py-4 flex flex-row items-center justify-between z-10 relative text-gray-700">
      <Link to={`/`} className="hover:text-black">
        <h3 className="inline-block font-bold text-xl">{title}</h3>
      </Link>
      <SocialButtons small />
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
              <SocialButtons />
            </nav>
            <p className="text-4xl font-semibold text-gray-700">{social.email}</p>
          </div>
          {/* Lists of links */}
          <div className="flex flex-row">
            <div className="mr-16">
              <p className="uppercase tracking-wide font-semibold text-gray-500">Pages</p>
              <ul>
                {navLinks.map(_navLink => (
                  <li className="mt-2" key={_navLink.path}>
                    <Link to={_navLink.path}>{_navLink.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="uppercase tracking-wide font-semibold text-gray-500">Site</p>
              <ul>
                {siteLinks.map(_siteLink => (
                  <li className="mt-2" key={_siteLink.link}>
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
