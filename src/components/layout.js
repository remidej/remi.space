import React from 'react'
import { Link } from 'gatsby'
import '../layout.css'

const navLinks = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Articles',
    path: '/blog',
  },
  {
    title: 'Portfolio',
    path: '/folio',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
]

const Layout = ({ location, title, children, description }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPage = location.pathname === rootPath

  const header = (
    <nav className="container mx-auto py-4 flex flex-row justify-between">
      <Link to={`/`}>
        {isRootPage ? (
          // Site title is the main heading on homepage
          <h1 className="inline-block font-bold text-xl">{title}</h1>
        ) : (
          // Site title is a secondary heading on other pages
          <h3 className="inline-block font-bold text-xl">{title}</h3>
        )}
        <span className="text-gray-500 text-sm"> — {description}</span>
      </Link>
      <ul className="flex flex-row">
        {navLinks.map(_navLink => (
          <li
            key={_navLink.path}
            className={`mr-8 last:mr-0 font-medium hover:text-teal-800 ${
              _navLink.path === location.pathname ? 'text-teal-800 border-teal-800 border-b-2' : ''
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
        <header>{header}</header>
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <footer className="bg-green-200 text-green-900 py-3">
        <div className="container mx-auto">
          © {new Date().getFullYear()} • built with React & Tailwind CSS
        </div>
      </footer>
    </div>
  )
}

export default Layout
