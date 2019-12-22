import React from 'react'
import { Link } from 'gatsby'
import reset from 'styled-reset'
import styled, { createGlobalStyle } from 'styled-components'
import { palette } from '../utils/palette'

const GlobalStyles = createGlobalStyle`
  /* Reset all browser base stlyes */
  ${reset}

  /* Global stylings */
  html {
    background: ${palette.lightGreen};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${palette.black};
    font-size: 10px;
  }

  /* Set fonts relative to the html font-size above */
  body {
    font-size: 1.8rem;
    line-height: 2em;
  }

  /* Default */
`

const Styles = styled.div`
  margin-left: auto;
  margin-right: auto;
`

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
    <>
      <GlobalStyles />
      <Styles>
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </Styles>
    </>
  )
}

export default Layout
