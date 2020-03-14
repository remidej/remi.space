import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'
import { FiArrowRight } from 'react-icons/fi'

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />
      <div className="container mx-auto">
        <h1 className="text-6xl font-bold">404</h1>
        <p>Looks like you got lost.</p>
        <Link
          to="/"
          className="mt-6 px-4 py-2 text-blog-800 bg-blog-200 text-lg font-semibold rounded-lg inline-block"
        >
          Go back home <FiArrowRight className="inline" size="1em" />
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage
