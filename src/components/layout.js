import React from 'react'
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
    title: 'Projects',
    path: '/projects',
  },
  {
    title: 'Contact',
    path: '/contact',
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
        }
      }
    }
  `)

  const { title, description } = data.site.siteMetadata

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
      <footer className="py-3">
        <div className="container mx-auto">© {new Date().getFullYear()} • view on Github</div>
      </footer>
    </div>
  )
}

export default Layout
