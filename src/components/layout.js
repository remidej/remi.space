import React from 'react'
import { Link } from 'gatsby'
import '../layout.css'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1>
        <Link to={`/`}>{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    )
  }
  return (
    <div className="flex flex-col min-h-screen bg-teal-100 text-teal-900">
      {/* Top section */}
      <div className="flex-1">
        <header>{header}</header>
        <main>{children}</main>
      </div>
      {/* Bottom section */}
      <footer className="bg-teal-900 text-teal-100">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
